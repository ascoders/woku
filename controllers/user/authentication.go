package user

import (
	"github.com/ascoders/as"
	"github.com/martini-contrib/sessions"
	"math/rand"
	"net/http"
	"strconv"
	"time"
	"woku/models/user"
)

// 登陆（获取授权令牌）
// @router /users/authentication [get]
func (this *Controller) Authentication(req *http.Request, session sessions.Session) (int, []byte) {
	req.ParseForm()

	// 验证用户
	userData, err := user.ModelInstance.Authentication(req.Form.Get("account"), req.Form.Get("password"))
	if err != nil {
		return this.Error(err.Error())
	}

	// 更新最后登陆时间和登陆次数
	userData.LastLogTime = time.Now()
	userData.LogCount++
	// 更新密码错误次数
	userData.ErrorChance = 6
	if err := user.ModelInstance.Update(userData.Id.Hex(), map[string]interface{}{
		"la": userData.LastLogTime,
		"l":  userData.LogCount,
		"er": userData.ErrorChance,
	}); err != nil {
		return this.Error(err.Error())
	}

	// 生成session
	session.Set("id", userData.Id.Hex())

	return this.Success(AuthenticationInfo(userData))

}

// 预注册（创建授权令牌）
// 并不会注册用户，只会发邮件
// @router /users/authentication (captcha) [post]
func (this *Controller) AuthenticationCreate(req *http.Request) (int, []byte) {
	// url参数解析到结构体
	userData := &user.Data{}
	params := this.ReqFormToMap(req)
	if err := this.Parse(userData, params); err != nil {
		return this.Error(err.Error())
	}

	// 查询邮箱是否存在
	if err := user.ModelInstance.FindByEmail(params["email"].(string)); err == nil {
		return this.Error("邮箱已被注册")
	}

	// 获得安全令牌
	// 先生成随机数作为token
	token := strconv.Itoa(int(rand.New(rand.NewSource(time.Now().UnixNano())).Uint32()))
	expire := 30
	sign, expireUnix := CreateSign(token, expire, map[string]string{
		"email":    userData.Email,
		"nickname": userData.Nickname,
		"password": userData.Password,
	})

	// 保存有效令牌到缓存
	as.Redis.SetWithExpire(sign, []byte(token), int64(expire))

	// 发送邮件
	go as.Email.Send([]string{userData.Email}, "我酷游戏：激活账号", `<a href="`+
		"http://wokugame.com/register?"+
		"expire="+expireUnix+"&"+
		"sign="+sign+"&"+
		"email="+userData.Email+"&"+
		"nickname="+userData.Nickname+"&"+
		"password="+userData.Password+
		`">请点击此链接以激活帐号</a>`)

	return this.Success("请等待邮件")
}

// 真正注册
// 验证邮箱令牌，并注册用户
// @router /users/authentication/email [post]
func (this *Controller) CreateEmailAuthentication(req *http.Request, session sessions.Session) (int, []byte) {
	// 缓存是否存在此签名
	req.ParseForm()

	var token []byte
	var err error
	if token, err = as.Redis.Get(req.Form.Get("sign")); err != nil {
		// 没有通过邮箱注册生成的缓存
		return this.Error("签名已失效")
	}

	// 删除缓存
	as.Redis.Delete(req.Form.Get("sign"))

	// 验证签名
	if err := CheckSign(string(token), req); err != nil {
		return this.Error(err.Error())
	}

	// url参数解析到结构体
	userData := &user.Data{}
	params := this.ReqFormToMap(req, "email", "nickname", "password")
	if err := this.Parse(userData, params); err != nil {
		return this.Error(err.Error())
	}

	// 设置用户初始值
	user.ModelInstance.SetDefaults(userData)

	// 用户表新增用户
	if err := user.ModelInstance.Add(userData); err != nil {
		return this.Error(err.Error())
	}

	// 生成session
	session.Set("id", userData.Id.Hex())

	return this.Success(AuthenticationInfo(userData))
}

// 获得当前登录的用户
// @router /users/current [get]
func (this *Controller) Current(session sessions.Session) (int, []byte) {
	uid := session.Get("id")
	if uid == nil {
		return this.Success(false)
	}

	// 查询用户
	userData := &user.Data{}
	if err := user.ModelInstance.Get(uid.(string), userData); err != nil {
		return this.Error(err.Error())
	}

	return this.Success(AuthenticationInfo(userData))

}

// 删除登陆令牌（登出）
// 并不会删除用户表信息
// @router /users/authentication [delete]
func (this *Controller) AuthenticationDelete(req *http.Request, session sessions.Session) (int, []byte) {
	session.Delete("id")
	return this.Success("已清空用户session")
}

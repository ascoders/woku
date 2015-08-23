package user

import (
	"errors"
	"github.com/ascoders/as"
	"net/http"
	"strconv"
	"time"
	"woku/models/user"
)

// 生成签名
// @return sign
// @return expire
func CreateSign(token string, expire int, params map[string]string) (string, string) {
	params["expire"] = strconv.Itoa(int(time.Now().Unix()) + expire)
	params["token"] = token

	// 将参数排序
	opts := as.Lib.Sort.MapToSlice(params)

	var text string
	for k, _ := range opts {
		text += opts[k]
	}

	return as.Lib.Md5(text), params["expire"]
}

// 校验签名
func CheckSign(token string, req *http.Request) error {
	req.ParseForm()
	req.Form.Set("token", token)

	// 是否过期
	expire, _ := strconv.Atoi(req.Form.Get("expire"))
	if time.Unix(int64(expire), 0).Before(time.Now()) {
		return errors.New("请求已过期")
	}

	// 剔除sign参数后字母从小到大排序
	opts := as.Lib.Sort.FormToSlice(req, "sign")

	// 对比sign
	var text string
	for k, _ := range opts {
		text += opts[k]
	}
	if req.Form.Get("sign") != as.Lib.Md5(text) {
		return errors.New("签名校验失败")
	}

	return nil
}

// 用户注册&登陆 统一返回的信息格式（敏感信息）
func AuthenticationInfo(user *user.User) map[string]interface{} {
	return map[string]interface{}{
		"id":         user.Id,
		"email":      user.Email,
		"nickname":   user.Nickname,
		"money":      user.Money,
		"last_login": user.LastLogin,
		"portrait":   user.Portrait,
		"token":      user.Token,
	}
}

// 获取某用户信息 统一返回的信息格式（非敏感信息）
func NormalInfo(user *user.User) map[string]interface{} {
	return map[string]interface{}{
		"id":       user.Id,
		"nickname": user.Nickname,
		"portrait": user.Portrait,
	}
}

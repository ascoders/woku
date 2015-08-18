package app

import (
	"github.com/go-martini/martini"
	"net/http"
	"strconv"
)

// 获取某个app信息
// @router /apps/:path [get]
func (this *Controller) Get(param martini.Params) (int, []byte) {
	return this.Must(this.model.FindByPath(param["path"]))
}

// 新增app
// @router /apps (user) [post]
func (this *Controller) Add(req *http.Request) (int, []byte) {
	// 每位用户最多创建20个应用
	if this.model.UserAppCount(this.currentUser.Id) >= 20 {
		return this.Error("创建应用数量已达上限")
	}

	// 添加当前用户id到管理员参数中
	req.ParseForm()
	req.Form.Set("manager", strconv.Itoa(this.currentUser.Id))

	// 插入app
	if status, response := this.Restful.Add(req); status == 200 {
		return this.Success(string(response))
	} else {
		return this.Error(string(response))
	}

	return this.Error("创建失败，请稍后再试")
}

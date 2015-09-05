package app

import (
	"github.com/ascoders/as"
	"github.com/go-martini/martini"
	"net/http"
	"strconv"
	"woku/models/app"
)

// 获取
// @router /apps/:path [get]
func (this *Controller) Get(param martini.Params) (int, []byte) {
	return this.Must(this.model.GetByPath(param["path"]))
}

// 新增
// @router /apps (user) [post]
func (this *Controller) Add(req *http.Request) (int, []byte) {
	// path name必填
	if err := as.Lib.Http.Require(req, "path", "name"); err != nil {
		return this.Error(err.Error)
	}

	// 每位用户最多创建20个应用
	if this.model.UserAppCount(this.currentUser.Id) >= 20 {
		return this.Error("创建应用数量已达上限")
	}

	// 添加当前用户id到管理员参数中
	req.Form.Set("type", "other")
	req.Form.Set("owner", strconv.Itoa(this.currentUser.Id))

	// 插入app
	return this.Restful.Add(req)
}

// 修改
// @router /apps/:id (user) [patch]
func (this *Controller) Update(param martini.Params, req *http.Request) (int, []byte) {
	updateMap := this.ReqFormToMap(req, "name", "type", "logo", "icon", "gate")

	appData := &app.Data{}
	if err := as.Lib.Parse.Struct(appData, updateMap); err != nil {
		return this.Error(err.Error())
	}

	if err := this.model.UpdateMap(param["id"], updateMap); err != nil {
		return this.Error(err.Error())
	}

	return this.Success("ok")
}

// 删除（暂时不允许删除）

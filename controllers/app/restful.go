package app

import (
	//"github.com/ascoders/as"
	"github.com/go-martini/martini"
	"net/http"
	//"woku/models/user"
)

// 获取某个app信息
// @router /apps/:path [get]
func (this *Controller) Get(param martini.Params) (int, []byte) {
	return this.Must(this.model.FindByPath(param["path"]))
}

// 新增app
// @router /apps (user) [post]
func (this *Controller) Add(req *http.Request) (int, []byte) {
	/*
		// 每位用户最多创建20个应用
		if this.currentUser.AppCount >= 20 {
			return this.Error("创建应用数量已达上限")
		}

		// 添加当前用户id到管理员参数中
		req.ParseForm()
		req.Form.Set("manager", this.currentUser.Id.Hex())

		if status, response := this.Restful.Add(req); status == 200 {
			// 创建应用数+1
			this.currentUser.AppCount++
			if err, updateMap := as.Lib.Parse.StructToUpdateMap(this.currentUser, map[string]interface{}{
				"appCount": this.currentUser.AppCount,
			}, "appCount"); err == nil {
				if err := user.ModelInstance.Update(this.currentUser.Id.Hex(), updateMap); err != nil {
					return this.Error(err.Error())
				}
			} else {
				return this.Error(err.Error())
			}
			return this.Success(string(response))
		} else {
			return this.Error(string(response))
		}
	*/
	return this.Error("创建应用数量已达上限")
}

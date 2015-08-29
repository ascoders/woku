package category

import (
	"github.com/ascoders/as"
	"github.com/go-martini/martini"
	"net/http"
	"strconv"
)

// @router /apps/categorys/:id [get]
func (this *Controller) Get(param martini.Params) (int, []byte) {
	return this.Must(this.model.Get(param["id"]))
}

// @router /apps/categorys (app,owner) [post]
func (this *Controller) Add(req *http.Request) (int, []byte) {
	// name必填
	if err := as.Lib.Http.Require(req, "name"); err != nil {
		return this.Error(err.Error)
	}
	
	// 判断是否重名
	

	// 添加所属appid到参数中
	req.Form.Set("app_id", strconv.Itoa(this.app.Id))

	// 插入
	if status, response := this.Restful.Add(req); status == 200 {
		return this.Success("创建成功")
	} else {
		return this.Error(string(response))
	}

	return this.Error("创建失败，请稍后再试")
}

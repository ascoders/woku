package category

import (
	"github.com/ascoders/as"
	"github.com/go-martini/martini"
	"net/http"
	"strconv"
)

// @router /app/categorys/:id [get]
func (this *Controller) Get(param martini.Params) (int, []byte) {
	return this.Must(this.model.Get(param["id"]))
}

// @router /app/categorys [get]
func (this *Controller) Gets(req *http.Request) (int, []byte) {
	req.ParseForm()
	appDatas := this.model.SelectByApp(req.Form.Get("app"))
	return this.Success(appDatas)
}

// @router /app/categorys (app,owner) [post]
func (this *Controller) Add(req *http.Request) (int, []byte) {
	// name必填
	if err := as.Lib.Http.Require(req, "name"); err != nil {
		return this.Error(err.Error)
	}

	// 添加所属appid到参数中
	req.Form.Set("app_id", strconv.Itoa(this.app.Id))

	// 插入
	return this.Restful.Add(req)
}

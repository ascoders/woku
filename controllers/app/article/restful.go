package article

import (
	"github.com/ascoders/as"
	"github.com/go-martini/martini"
	"net/http"
)

// 获取
// @router /app/article/:id [get]
func (this *Controller) Get(param martini.Params) (int, []byte) {
	return this.Must(this.model.Get(param["id"]))
}

// 新增
// @router /app/article (user) [post]
func (this *Controller) Add(req *http.Request) (int, []byte) {
	// title content必填
	if err := as.Lib.Http.Require(req, "title", "content"); err != nil {
		return this.Error(err.Error)
	}

	/*
		// 添加当前用户id到管理员参数中
		req.Form.Set("type", "other")
		req.Form.Set("owner", strconv.Itoa(this.currentUser.Id))

		// 插入app
		if status, response := this.Restful.Add(req); status == 200 {
			return this.Success("创建成功")
		} else {
			return this.Error(string(response))
		}
	*/

	return this.Error("创建失败，请稍后再试")
}

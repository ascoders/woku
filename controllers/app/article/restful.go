package article

import (
	"github.com/ascoders/as"
	"github.com/go-martini/martini"
	"net/http"
	"strconv"
)

// 获取
// @router /app/articles/:id [get]
func (this *Controller) Get(param martini.Params) (int, []byte) {
	return this.Restful.Get(param)
}

// 分页获取
// @router /app/articles [get]
func (this *Controller) Gets(req *http.Request) (int, []byte) {
	req.ParseForm()
	return this.Restful.Gets(req, map[string]interface{}{
		"category": req.Form.Get("category"),
	}, []string{"id", "title", "created"})
}

// 发帖
// @router /app/articles (login,category,app) [post]
func (this *Controller) Add(req *http.Request) (int, []byte) {
	// 判断发布级别
	switch this.category.SubmitRule {
	case "owner":
		if this.user.Id != this.app.Owner {
			return this.Error("此分类被设定为只有拥有者可发布")
		}
	case "login": // pass
	}

	// title content必填
	if err := as.Lib.Http.Require(req, "title", "content"); err != nil {
		return this.Error(err.Error())
	}

	// 增加category参数
	req.Form.Set("category", strconv.Itoa(this.category.Id))
	
	// 增加发帖人参数
	req.Form.Set("author", strconv.Itoa(this.user.Id))

	return this.Restful.Add(req)
}

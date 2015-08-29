package app

import (
	"github.com/go-martini/martini"
	"net/http"
)

// 获取总分类信息
// @router /apps [get]
func (this *Controller) Gets(req *http.Request) (int, []byte) {
	return this.Restful.Gets(req, nil, []string{"name", "path", "created"})
}

// 获取各分类信息
// @router /apps/type/:type [get]
func (this *Controller) Type(req *http.Request, param martini.Params) (int, []byte) {
	return this.Must(this.model.SelectByType(param["type"]))
}

package app

import (
	"github.com/ascoders/as"
	"github.com/go-martini/martini"
	"net/http"
)

// 获取总分类信息
// @router /apps [get]
func (this *Controller) Gets(req *http.Request) (int, []byte) {
	return this.Restful.GetsCustom(req, nil, as.M{
		"_id": 1,
		"n":   1,
		"p":   1,
		"l":   1,
	})
}

// 获取各分类信息
// @router /apps/type/:id [get]
func (this *Controller) Type(req *http.Request, param martini.Params) (int, []byte) {
	return this.GetsCustom(req, as.M{
		"t": param["id"],
	}, as.M{
		"_id": 1,
		"n":   1,
		"p":   1,
		"l":   1,
	})
}

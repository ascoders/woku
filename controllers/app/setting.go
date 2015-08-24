package app

import (
	"net/http"
)

// 设置app是否可访问
// @router /apps/settings/gate [post]
func (this *Controller) gate(req *http.Request) (int, []byte) {
	req.ParseForm()
	req.Form.Get("")
	return this.Success("")
}

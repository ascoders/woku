package article

import (
	"github.com/martini-contrib/sessions"
	"net/http"
	"woku/models/app"
	"woku/models/app/category"
	"woku/models/user"
)

// 获取登录用户
func (this *Controller) Login(session sessions.Session, res http.ResponseWriter) {
	uid := session.Get("id")

	if uid == nil {
		res.Write([]byte("未登录"))
		return
	}

	// 查询用户
	var err error
	if this.user, err = user.ModelInstance.GetById(uid.(int)); err != nil {
		res.Write([]byte(err.Error()))
		return
	}
}

// 获取所属category的信息
// @param category
func (this *Controller) Category(req *http.Request, res http.ResponseWriter) {
	req.ParseForm()

	var err error
	if this.category, err = category.ModelInstance.GetById(req.Form.Get("category")); err != nil {
		res.Write([]byte("归属分类不存在"))
		return
	}
}

// 根据分类获取所属app的信息
func (this *Controller) App(req *http.Request, res http.ResponseWriter) {
	req.ParseForm()

	var err error
	if this.app, err = app.ModelInstance.GetById(this.category.App); err != nil {
		res.Write([]byte("归属应用不存在"))
		return
	}

	if this.app.Gate == false {
		res.Write([]byte("该应用处于关闭状态"))
		return
	}
}

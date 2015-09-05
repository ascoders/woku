package comment

import (
	"github.com/martini-contrib/sessions"
	"net/http"
	"woku/models/app"
	"woku/models/app/article"
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

// 获取文章信息
func (this *Controller) Article(req *http.Request, res http.ResponseWriter) {
	req.ParseForm()

	var err error

	if this.article, err = article.ModelInstance.GetById(req.Form.Get("article")); err != nil {
		res.Write([]byte(err.Error()))
		return
	}
}

// 根据文章查找所属分类
func (this *Controller) Category(req *http.Request, res http.ResponseWriter) {
	req.ParseForm()

	var err error

	if this.category, err = category.ModelInstance.GetById(this.article.Category); err != nil {
		res.Write([]byte(err.Error()))
		return
	}
}

// 根据分类查找所属应用
func (this *Controller) App(req *http.Request, res http.ResponseWriter) {
	req.ParseForm()

	var err error

	if this.app, err = app.ModelInstance.GetById(this.category.App); err != nil {
		res.Write([]byte(err.Error()))
		return
	}

	if this.app.Gate == false {
		res.Write([]byte("该应用处于关闭状态"))
		return
	}
}

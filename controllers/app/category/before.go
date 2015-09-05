package category

import (
	"github.com/martini-contrib/sessions"
	"net/http"
	"woku/models/app"
	"woku/models/user"
)

// 获取所属app信息
func (this *Controller) App(req *http.Request, res http.ResponseWriter) {
	req.ParseForm()

	var err error
	if this.app, err = app.ModelInstance.GetById(req.Form.Get("app")); err != nil {
		res.Write([]byte("归属应用不存在"))
		return
	}
}

// 必须是所有者
func (this *Controller) Owner(session sessions.Session, res http.ResponseWriter) {
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

	// 判断是否为所有者
	if this.user.Id != this.app.Owner {
		res.Write([]byte("您没有权限"))
		return
	}
}

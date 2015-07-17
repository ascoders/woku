package app

import (
	"github.com/martini-contrib/sessions"
	"net/http"
	"newWoku/models/user"
)

// 获取登陆用户信息
func (this *Controller) User(session sessions.Session, res http.ResponseWriter) {
	uid := session.Get("id")
	if uid == nil {
		res.Write([]byte("未登录"))
		return
	}

	// 查询用户
	userData := &user.Data{}
	if err := user.ModelInstance.Get(uid.(string), userData); err != nil {
		res.Write([]byte(err.Error()))
		return
	}

	this.currentUser = userData
}

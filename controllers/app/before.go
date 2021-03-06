package app

import (
	"github.com/martini-contrib/sessions"
	"net/http"
	"woku/models/user"
)

// 获取登陆用户信息
func (this *Controller) User(session sessions.Session, res http.ResponseWriter) {
	uid := session.Get("id")

	if uid == nil {
		res.Write([]byte("未登录"))
		return
	}

	// 查询用户
	userData, err := user.ModelInstance.GetById(uid.(int))

	if err != nil {
		res.Write([]byte(err.Error()))
		return
	}

	this.currentUser = userData
}

package article

import (
	"github.com/martini-contrib/sessions"
	"net/http"
	"woku/models/user"
)

// 获取用户
func (this *Controller) User(session sessions.Session, res http.ResponseWriter) {
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

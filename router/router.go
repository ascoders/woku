package router

import (
	"github.com/ascoders/as"
	"newWoku/controllers/app"
	"newWoku/controllers/article"
	"newWoku/controllers/user"
)

func init() {
	as.Router.Auto(
		app.Controller{},
		article.Controller{},
		user.Controller{},
	)
}

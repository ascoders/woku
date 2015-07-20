package router

import (
	"github.com/ascoders/as"
	"woku/controllers/app"
	"woku/controllers/article"
	"woku/controllers/user"
)

func init() {
	as.Router.Auto(
		app.Controller{},
		article.Controller{},
		user.Controller{},
	)
}

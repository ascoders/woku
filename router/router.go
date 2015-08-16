package router

import (
	"github.com/ascoders/as"
	"woku/controllers/app"
	"woku/controllers/article"
	"woku/controllers/category"
	"woku/controllers/user"
)

func init() {
	as.Router.Auto(
		app.Controller{},
		article.Controller{},
		user.Controller{},
		category.Controller{},
	)
}

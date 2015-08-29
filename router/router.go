package router

import (
	"github.com/ascoders/as"
	"woku/controllers/app"
	"woku/controllers/app/article"
	"woku/controllers/app/category"
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

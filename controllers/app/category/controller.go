package category

import (
	"github.com/ascoders/as"
	"woku/models/app"
	"woku/models/app/category"
	"woku/models/user"
)

type Controller struct {
	as.Controller
	model *category.Model
	app   *app.Data
	user  *user.Data
}

func New() *Controller {
	controller := &Controller{}
	controller.NewModel(category.ModelInstance)
	return controller
}

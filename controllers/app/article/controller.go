package article

import (
	"github.com/ascoders/as"
	"woku/models/app"
	"woku/models/app/article"
	"woku/models/app/category"
	"woku/models/user"
)

type Controller struct {
	as.Controller
	model    *article.Model
	category *category.Data
	app      *app.Data
	user     *user.Data
}

func New() *Controller {
	controllerInstance := &Controller{}
	controllerInstance.NewModel(article.ModelInstance)
	controllerInstance.model = article.ModelInstance
	return controllerInstance
}

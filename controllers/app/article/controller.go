package article

import (
	"github.com/ascoders/as"
	"woku/models/app/article"
	"woku/models/user"
)

type Controller struct {
	as.Controller
	model *article.Model
	user  *user.Data
}

func New() *Controller {
	controllerInstance := &Controller{}
	controllerInstance.NewModel(article.ModelInstance)
	controllerInstance.model = article.ModelInstance
	return controllerInstance
}

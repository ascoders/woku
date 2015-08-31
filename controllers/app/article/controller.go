package article

import (
	"github.com/ascoders/as"
	"woku/models/app/article"
)

type Controller struct {
	as.Controller
	model *article.Model
}

func New() *Controller {
	controllerInstance := &Controller{}
	controllerInstance.NewModel(article.ModelInstance)
	controllerInstance.model = article.ModelInstance
	return controllerInstance
}

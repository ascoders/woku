package category

import (
	"github.com/ascoders/as"
	"newWoku/models/category"
)

type Controller struct {
	as.Controller
	currentUser *category.Data
}

func New() *Controller {
	controllerInstance := &Controller{}
	controllerInstance.NewModel(category.ModelInstance)
	return controllerInstance
}

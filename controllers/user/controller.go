package user

import (
	"github.com/ascoders/as"
	"woku/models/user"
)

type Controller struct {
	as.Controller
	model *user.Model
}

func New() *Controller {
	controllerInstance := &Controller{}
	controllerInstance.NewModel(user.ModelInstance)
	controllerInstance.model = user.ModelInstance
	return controllerInstance
}

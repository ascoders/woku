package user

import (
	"github.com/ascoders/as"
	"woku/models/user"
)

type Controller struct {
	as.Controller
}

func New() *Controller {
	controllerInstance := &Controller{}
	controllerInstance.NewModel(user.ModelInstance)
	return controllerInstance
}

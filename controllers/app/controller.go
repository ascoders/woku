package app

import (
	"github.com/ascoders/as"
	"woku/models/app"
	"woku/models/user"
)

type Controller struct {
	as.Controller
	currentUser *user.Data
}

func New() *Controller {
	controllerInstance := &Controller{}
	controllerInstance.NewModel(app.ModelInstance)
	return controllerInstance
}

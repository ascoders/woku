package article

import (
	"github.com/ascoders/as"
	"newWoku/models/user"
)

type Controller struct {
	as.Controller
}

func New() *Controller {
	controller := &Controller{}
	controller.NewModel(user.ModelInstance)
	return controller
}

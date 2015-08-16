package category

import (
	"github.com/ascoders/as"
	"github.com/go-martini/martini"
	"woku/models/category"
)

type Controller struct {
	as.Controller
	model *category.Model
}

func New() *Controller {
	controllerInstance := &Controller{}
	controllerInstance.NewModel(category.ModelInstance)
	controllerInstance.model = category.ModelInstance
	return controllerInstance
}

// @router /categorys/:id [get]
func (this *Controller) Get(param martini.Params) (int, []byte) {
	return this.Must(this.model.Get(param["id"]))
}

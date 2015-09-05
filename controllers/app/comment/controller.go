package comment

import (
	"github.com/ascoders/as"
	"woku/models/app"
	"woku/models/app/article"
	"woku/models/app/category"
	"woku/models/app/comment"
	"woku/models/user"
)

type Controller struct {
	as.Controller
	model    *comment.Model
	user     *user.Data
	article  *article.Data
	category *category.Data
	app      *app.Data
}

func New() *Controller {
	controllerInstance := &Controller{}
	controllerInstance.NewModel(comment.ModelInstance)
	controllerInstance.model = comment.ModelInstance
	return controllerInstance
}

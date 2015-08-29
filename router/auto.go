package router

import (
	"github.com/ascoders/as"
	"woku/controllers/user"
	"woku/controllers/app/category"
	"woku/controllers/app"
	
)

func init() {
    
    user := user.New()
    as.Router.Routes.Get("/api/users/authentication", user.Authentication)
    as.Router.Routes.Post("/api/users/authentication", as.Lib.Captcha.Check, user.AuthenticationCreate)
    as.Router.Routes.Post("/api/users/authentication/email", user.CreateEmailAuthentication)
    as.Router.Routes.Get("/api/users/current", user.Current)
    as.Router.Routes.Delete("/api/users/authentication", user.AuthenticationDelete)
    as.Router.Routes.Get("/api/users/:account", user.Get)
		
    category := category.New()
    as.Router.Routes.Get("/api/apps/categorys/:id", category.Get)
    as.Router.Routes.Post("/api/apps/categorys", category.App, category.Owner, category.Add)
		
    app := app.New()
    as.Router.Routes.Get("/api/apps", app.Gets)
    as.Router.Routes.Get("/api/apps/type/:type", app.Type)
    as.Router.Routes.Get("/api/apps/:path", app.Get)
    as.Router.Routes.Post("/api/apps", app.User, app.Add)
    as.Router.Routes.Patch("/api/apps/:id", app.User, app.Update)
		
}

package router

import (
	"github.com/ascoders/as"
	"woku/controllers/app"
	"woku/controllers/user"
	"woku/controllers/category"
	
)

func init() {
    
    app := app.New()
    as.Router.Routes.Get("/api/apps/:path", app.Get)
    as.Router.Routes.Post("/api/apps", app.User, app.Add)
    as.Router.Routes.Get("/api/apps", app.Gets)
    as.Router.Routes.Get("/api/apps/type/:type", app.Type)
		
    user := user.New()
    as.Router.Routes.Get("/api/users/authentication", user.Authentication)
    as.Router.Routes.Post("/api/users/authentication", as.Lib.Captcha.Check, user.AuthenticationCreate)
    as.Router.Routes.Post("/api/users/authentication/email", user.CreateEmailAuthentication)
    as.Router.Routes.Get("/api/users/current", user.Current)
    as.Router.Routes.Delete("/api/users/authentication", user.AuthenticationDelete)
		
    category := category.New()
    as.Router.Routes.Get("/api/categorys/:id", category.Get)
		
}

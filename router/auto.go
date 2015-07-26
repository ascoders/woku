package router

import (
	"github.com/ascoders/as"
	"woku/controllers/user"
	"woku/controllers/app"
	
)

func init() {
    
    user := user.New()
    as.Router.Routes.Get("/api/users/authentication", user.Authentication)
    as.Router.Routes.Post("/api/users/authentication", as.Lib.Captcha.Check, user.AuthenticationCreate)
    as.Router.Routes.Post("/api/users/authentication/email", user.CreateEmailAuthentication)
    as.Router.Routes.Get("/api/users/current", user.Current)
    as.Router.Routes.Delete("/api/users/authentication", user.AuthenticationDelete)
		
    app := app.New()
    as.Router.Routes.Get("/api/apps", app.Gets)
    as.Router.Routes.Get("/api/apps/type/:id", app.Type)
    as.Router.Routes.Get("/api/apps/:path", app.Get)
    as.Router.Routes.Post("/api/apps", app.User, app.Add)
		
}

package user

import (
	"github.com/go-martini/martini"
)

// 根据帐户名获取用户信息（不能获取敏感信息）
// @router /users/:account [get]
func (this *Controller) Get(param martini.Params) (int, []byte) {
	userData, err := this.model.GetByAccount(param["account"])
	if err != nil {
		return this.Error("账号不存在")
	}

	return this.Success(NormalInfo(userData))
}

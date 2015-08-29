/*==================================================
	app表

	Copyright (c) 2015 翱翔大空 and other contributors
 ==================================================*/

package app

import (
	"github.com/ascoders/as"
)

type Model struct {
	as.Model
}

var (
	ModelInstance *Model
)

func init() {
	ModelInstance = &Model{}
	ModelInstance.Register(&Data{})
}

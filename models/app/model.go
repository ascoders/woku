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
}

func (this *Model) NewData() interface{} {
	//var r Data
	//return &r
	return nil
}

func (this *Model) NewDataWithId() interface{} {
	//var r Data
	//r.Id = bson.NewObjectId()
	//return &r
	return nil
}

func (this *Model) NewDatas() interface{} {
	//var r []*Data
	//return &r
	return nil
}

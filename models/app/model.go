/*==================================================
	app表

	Copyright (c) 2015 翱翔大空 and other contributors
 ==================================================*/

package app

import (
	"github.com/ascoders/as"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Model struct {
	as.Model
}

var (
	ModelInstance *Model
)

func init() {
	ModelInstance = &Model{}
	ModelInstance.Registe("apps", mgo.Index{
		Key:    []string{"n"},
		Unique: true,
	}, mgo.Index{
		Key:    []string{"p"},
		Unique: true,
	})
}

func (this *Model) NewData() interface{} {
	var r Data
	return &r
}

func (this *Model) NewDataWithId() interface{} {
	var r Data
	r.Id = bson.NewObjectId()
	return &r
}

func (this *Model) NewDatas() interface{} {
	var r []*Data
	return &r
}

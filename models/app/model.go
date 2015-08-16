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
	ModelInstance.Register(&App{})
}

// 通过路径查找
func (this *Model) FindByPath(path string) (*App, error) {
	appData := &App{}
	err := this.Db.First(appData, map[string]interface{}{
		"path": path,
	}).Error
	return appData, err
}

// 通过分类查找结果集
func (this *Model) SelectByType(_type string) ([]*App, error) {
	var appDatas []*App
	err := this.Db.Select([]string{"name", "path", "created"}).Find(appDatas, map[string]interface{}{
		"type": _type,
	}).Error
	return appDatas, err
}

package app

import (
	"github.com/ascoders/as"
)

// 通过路径查找
func (this *Model) FindByPath(path string) (*Data, error) {
	appData := &Data{}
	err := this.Db.First(appData, map[string]interface{}{
		"path": path,
	}).Error
	return appData, err
}

// 通过分类查找
func (this *Model) SelectByType(_type string) ([]*Data, error) {
	var appDatas []*Data
	err := this.Db.Select([]string{"name", "path", "created"}).Find(appDatas, map[string]interface{}{
		"type": _type,
	}).Error
	return appDatas, err
}

// 通过id查找
func (this *Model) FindById(id interface{}) (*Data, error) {
	appData := &Data{}
	err := this.Db.First(appData, map[string]interface{}{
		"id": as.Lib.Strings.ParseInt(id),
	}).Error
	return appData, err
}

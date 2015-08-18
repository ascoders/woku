package app

// 通过路径查找
func (this *Model) FindByPath(path string) (*App, error) {
	appData := &App{}
	err := this.Db.First(appData, map[string]interface{}{
		"path": path,
	}).Error
	return appData, err
}

// 通过分类查找
func (this *Model) SelectByType(_type string) ([]*App, error) {
	var appDatas []*App
	err := this.Db.Select([]string{"name", "path", "created"}).Find(appDatas, map[string]interface{}{
		"type": _type,
	}).Error
	return appDatas, err
}

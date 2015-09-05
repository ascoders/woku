package category

import (
	"github.com/ascoders/as"
)

// 根据app获取列表
func (this *Model) SelectByApp(app interface{}) []*Data {
	var datas []*Data
	this.Db.Find(&datas, map[string]interface{}{
		"app": as.Lib.Strings.ParseInt(app),
	})
	return datas
}

// 根据id获取
func (this *Model) GetById(id interface{}) (*Data, error) {
	data := &Data{}
	err := this.Db.First(data, as.Lib.Strings.ParseInt(id)).Error
	return data, err
}
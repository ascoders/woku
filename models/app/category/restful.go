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

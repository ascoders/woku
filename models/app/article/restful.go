package article

import(
	"github.com/ascoders/as"
)

// 根据id获取
func (this *Model) GetById(id interface{}) (*Data, error) {
	data := &Data{}
	err := this.Db.First(data, as.Lib.Strings.ParseInt(id)).Error
	return data, err
}
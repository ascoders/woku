package article

import (
	"github.com/ascoders/as"
)

type Data struct {
	as.Data

	// 标题
	Title string `json:"title" sql:"type:char(20)" valid:"minLength(3);maxLength(20)"`

	// 内容
	Content string `json:"content" sql:"varchar(10000)" valid:"minLength(15);maxLength(10000)"`

	// 所属app的id
	App int `json:"app" sql:"type:int unsigned"`

	// 所属category的id
	Category int `json:"category" sql:"type:int unsigned"`
}

func (this *Data) TableName() string {
	return "app_article"
}

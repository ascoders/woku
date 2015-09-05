package article

import (
	"time"
	"github.com/ascoders/as"
)

type Data struct {
	as.Data

	// 标题
	Title string `json:"title" sql:"type:char(20)" valid:"minLength(3);maxLength(20)"`

	// 内容
	Content string `json:"content" sql:"varchar();size:10000" valid:"minLength(15);maxLength(10000)"`
	
	// 创建人的id
	Author int `json:"author" sql:"type:int unsigned"`

	// 所属category的id
	Category int `json:"category" sql:"type:int unsigned"`
	
	// 创建时间
	Created time.Time `json:"created" sql:"type:timestamp;default:current_timestamp"`
}

func (this *Data) TableName() string {
	return "app_article"
}

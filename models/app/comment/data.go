package comment

import (
	"github.com/ascoders/as"
	"time"
)

type Data struct {
	as.Data

	// 内容
	Content string `json:"content" sql:"varchar(255)" valid:"minLength(3);maxLength(255)"`

	// 所属article的id
	Article int `json:"article" sql:"type:int unsigned"`

	// 创建人的id
	Author int `json:"author" sql:"type:int unsigned"`

	// 创建时间
	Created time.Time `json:"created" sql:"type:timestamp;default:current_timestamp"`
}

func (this *Data) TableName() string {
	return "app_comment"
}

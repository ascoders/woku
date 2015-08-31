package manager

import (
	"github.com/ascoders/as"
)

type Data struct {
	as.Data

	// app外键
	AppID int `json:"app_id" sql:"type:int unsigned;index"`

	// 用户id
	UserId int `json:"user_id" sql:"type:int unsigned"`
}

func (this *Data) TableName() string {
    return "app_manager"
}

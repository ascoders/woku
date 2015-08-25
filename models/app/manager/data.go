package manager

import (
	"github.com/ascoders/as"
)

type Manager struct {
	as.Data

	// app外键
	AppID int `json:"app_id" sql:"type:int unsigned;index"`

	// 用户id
	UserId int `json:"user_id" sql:"type:int unsigned"`
}

func (this *Manager) TableName() string {
    return "app_manager"
}
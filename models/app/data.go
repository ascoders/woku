package app

import (
	"github.com/ascoders/as"
	"time"
	"woku/models/app/manager"
)

type App struct {
	as.Data

	// 英文路径 唯一索引
	Path string `json:"path" sql:"type:char(10);unique_index" valid:"minLength(2);maxLength(10)"`

	// 名称 索引
	Name string `json:"name" sql:"type:char(10);unique" valid:"minLength(2);maxLength(10)"`

	// 所有者id 关联后无法修改
	Owner int `json:"owner" sql:"type:int unsigned"` // 管理员id

	// 管理员列表
	Managers []manager.Manager

	// 所属分类
	Type string `json:"type" sql:"type:char(10);index"`

	// logo地址
	Logo string `json:"logo" sql:"type:char(100)"`

	// icon地址
	Icon string `json:"icon" sql:"type:char(100)"`

	// 活跃度 0~255 * 2
	Hot int `json:"hot" sql:"type:tinyint unsigned"`

	// 创建时间
	Created time.Time `json:"created" sql:"type:timestamp"`

	// 网站开关闸门
	Gate bool `json:"gate" sql:"default:true"`
}

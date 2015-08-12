package app

import (
	"time"

	"github.com/ascoders/as"
)

type App struct {
	Path    string `json:"path" sql:"varchar(10)" gorm:"primary_key" valid:"required;minLength(2);maxLength(10)"` // 英文路径
	Name    string `json:"name" sql:"char(10);unique" valid:"required;minLength(1);maxLength(10)"`       // 讨论组名称
	Manager int    `json:"manager"`                                                                            // 管理员id
	// Managers  []string      `json:"managers"`             // 版主id列表（协助版主只能操作帖子，不能进管理台）
	Type    string    `json:"type" sql:"char(10)"` // 分类
	Logo    string    `json:"logo" sql:"char(50)"` // logo地址
	Icon    string    `json:"icon" sql:"char(50)"` // icon地址
	Hot     int       `json:"hot" sql:"tinyint"`   // 活跃度
	Created time.Time `json:"created"`             // 成立时间
}

func init() {
	// 初始化表
	as.Db.AutoMigrate(&App{})
}

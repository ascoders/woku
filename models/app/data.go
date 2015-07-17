package app

import (
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Data struct {
	Id        bson.ObjectId `bson:"_id" json:"id" valid:"-"`        // 主键
	Name      string        `bson:"n" json:"name" valid:"required"` // 讨论组名称
	Path      string        `bson:"p" json:"path" valid:"required"` // 英文路径
	Manager   string        `bson:"m" json:"manager"`               // 管理员id
	Managers  []string      `bson:"ms" json:"managers"`             // 版主id列表（协助版主只能操作帖子，不能进管理台）
	Type      string        `bson:"t" json:"type"`                  // 分类
	Logo      string        `bson:"l" json:"logo"`                  // logo地址 ! gi
	Icon      string        `bson:"i" json:"icon"`                  // icon地址
	Hot       int           `bson:"h" json:"hot"`                   // 活跃度
	Categorys int           `bson:"c" json:"categorys"`             // 分类数
	Created   time.Time     `bson:"ct" json:"created"`              // 成立时间 !tm
}

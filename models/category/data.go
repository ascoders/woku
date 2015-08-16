package category

import (
	"github.com/ascoders/as"
)

type Category struct {
	as.Data

	// 名称
	Name string `json:"name" sql:"type:char(10)" valid:"required;minLength(1);maxLength(10)"`

	// 所属app的id
	AppId string `json:"app" sql:"type:int unsigned"`

	// 路径 索引
	Path string `json:"path" sql:"type:char(10);index`

	// 图标
	Icon string `json:"icon" sql:"type:char(8)"`

	// 回复权限
	SubmitRule string `json:"submitRule" sql:"type:enum('admin','login')" valid:"enum(admin, login)`

	// 回帖策略 同发帖
	ReplyRule string `json:"replyRule" sql:"type:enum('admin','login')" valid:"enum(admin, login)`

	// 分类
	Type string `json:"type" sql:"type:enum('bbs','doc')" valid:"enum(bbs,doc)"`
}

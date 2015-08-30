package article

import (
	"github.com/ascoders/as"
)

type Data struct {
	as.Data

	// 名称
	Name string `json:"name" sql:"type:char(10);unique_index:idx_name_app" valid:"minLength(1);maxLength(10)"`

	// 所属app的id
	App string `json:"app" sql:"type:int unsigned;unique_index:idx_name_app;index"`

	// 回复权限
	SubmitRule string `json:"submitRule" sql:"type:enum('owner','login');default:'login'" valid:"enum(owner, login)`

	// 分类
	Type string `json:"type" sql:"type:enum('bbs','doc');default:'bbs'" valid:"enum(bbs,doc)"`
}

func (this *Data) TableName() string {
	return "app_category"
}

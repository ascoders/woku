/*==================================================
	用户表

	Copyright (c) 2015 翱翔大空 and other contributors
 ==================================================*/

package user

import (
	"github.com/ascoders/as"
	"time"
)

type User struct {
	as.Data

	// 昵称 唯一索引
	Nickname string `json:"nickname" sql:"type:varchar(10);unique_index" valid:"required;minLength(1);maxLength(10)"`

	// 电子邮箱 唯一索引
	Email string `json:"email" sql:"type:char(30);unique_index" valid:"required;email"`

	// 密码
	Password string `json:"password" sql:"type:char(32)" valid:"required;length(32)"`

	// 头像地址
	Portrait string `json:"portrait" sql:"type:char(30)"`

	// 账户余额
	Money float32 `json:"money" sql:"type:decimal(10,3)" valid:"-"`

	// 登陆次数
	LoginCount int `json:"login_count" sql:"type:mediumint unsigned" valid:"-"`

	// 最后登陆时间
	LastLogin time.Time `json:"last_login" sql:"type:timestamp" valid:"-"`

	// 账号输错机会次数
	ErrorChance int `json:"error_chance" sql:"type:tinyint unsigned" valid:"-"`

	// 账号封停截至时间
	StopTime time.Time `json:"stop_time" sql:"type:timestamp" valid:"-"`

	// 账号类型 admin member vip
	Type int `json:"type" sql:"type:enum('admin','member','vip')" valid:"-"`

	//Power []string `json:"power" valid:"-"` // 模块权限

	// 今天上传大小 kb
	UploadSize int `json:"upload_size" sql="type:mediumint unsigned" valid:"-"`

	// 密钥
	Token string `json:"token" sql:"type:char(32)" valid:"-"`
}

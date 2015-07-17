package category

import (
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Data struct {
	Id           bson.ObjectId `bson:"_id" json:"id" valid:"-"`                       // 主键
	Name         string        `bson:"n" json:"name"`                                 // 名称 !cn
	App          string        `bson:"a" json:"app"`                                  // 所属app的id !g
	Path         string        `bson:"p" json:"path"`                                 // 路径 !c
	Icon         string        `bson:"i" json:"icon"`                                 // fontawesome图标
	Recommend    int           `bson:"re" json:"recommend"`                           // 推荐数量
	RecommendPri int           `bson:"rp" json:"recommendPri"`                        // 推荐优先级
	SubmitRule   string        `bson:"s" json:"submitRule" valid:"enum(admin, login)` // 发帖策略 admin:只有管理员和协助管理员可以回帖 login:登陆用户可回帖 !a
	ReplyRule    string        `bson:"r" json:"replyRule" valid:"enum(admin, login)`  // 回帖策略 同发帖
	Type         string        `bson:"t" json:"type" valid:"enum(bbs, doc)"`          // 分类 bbs:论坛 doc:文档
}

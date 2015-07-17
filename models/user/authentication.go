package user

import (
	"errors"
	"gopkg.in/mgo.v2/bson"
	"math/rand"
	"strconv"
	"time"
)

// 授权令牌是否有效（用户登陆成功）
func (this *Model) Authentication(account string, password string) (*Data, error) {
	data := &Data{}

	// 根据邮箱查找用户
	if err := this.Collection.Find(bson.M{"e": account}).One(data); err != nil {
		return nil, errors.New("账号不存在")
	}
	// 账户锁定情况
	if bson.Now().Before(data.StopTime) {
		long := data.StopTime.Sub(bson.Now())
		return nil, errors.New("账号距离解锁还有 " + strconv.FormatFloat(long.Seconds(), 'f', 0, 64) + " 秒")
	}
	// 校验密码
	if data.Password != EncodePassword(password) {
		if data.ErrorChance == 1 {
			// 如果尽验证机会，账号锁定10分钟
			minute := time.Duration(10) * time.Minute
			this.Collection.UpdateId(data.Id, bson.M{"$set": bson.M{"er": 6, "st": bson.Now().Add(minute)}})
			return nil, errors.New("为保障安全，您的账号在10分钟后解除锁定状态")
		} else {
			if data.ErrorChance == 0 {
				// 默认错误机会为0，重新把错误机会设置为(6-1)
				this.Collection.UpdateId(data.Id, bson.M{"$set": bson.M{"er": 5}})
				data.ErrorChance = 5
			} else {
				// 验证机会减少1次
				this.Collection.UpdateId(data.Id, bson.M{"$inc": bson.M{"er": -1}})
				data.ErrorChance--
			}
			return nil, errors.New("密码错误，您还有 " + strconv.Itoa(int(data.ErrorChance)) + " 次机会")
		}
	}

	// 重置验证次数
	this.Collection.UpdateId(data.Id, bson.M{"$set": bson.M{"er": 6}})
	return data, nil
}

// 设置初始值（新增用户时）
func (this *Model) SetDefaults(data *Data) {
	data.Id = bson.NewObjectId()
	data.Password = EncodePassword(data.Password)
	data.Token = CreateToken()
	//随机分配头像
	data.Image = strconv.Itoa(rand.Intn(9))
}

// 根据邮箱查询用户信息
func (this *Model) FindByEmail(email string) error {
	// 根据邮箱查找用户
	data := &Data{}
	return this.Collection.Find(bson.M{"e": email}).One(data)
}

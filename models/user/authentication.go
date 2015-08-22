package user

import (
	"github.com/ascoders/as"
	"math/rand"
	"strconv"
	"errors"
	"time"
)

// 用户密码是否正确（以及账户状态判断）
func (this *Model) Authentication(account string, password string) (*User, error) {
	userData := &User{}

	if err := as.Lib.Valid.Email(account); err == nil {
		// 根据邮箱查找用户
		userData, err = this.GetByEmail(account)
		if err != nil {
			return nil, errors.New("账号不存在")
		}
	} else {
		// 根据用户名查找用户
		userData, err = this.GetByNickname(account)
		if err != nil {
			return nil, errors.New("帐号不存在")
		}
	}

	// 账户锁定情况
	if time.Now().Before(userData.StopTime) {
		long := userData.StopTime.Sub(time.Now())
		return nil, errors.New("账号距离解锁还有 " + strconv.FormatFloat(long.Seconds(), 'f', 0, 64) + " 秒")
	}
	// 校验密码
	if userData.Password != EncodePassword(password) {
		if userData.ErrorChance == 1 {
			// 如果尽验证机会，账号锁定10分钟
			minute := time.Duration(10) * time.Minute
			this.UpdateMap(userData.Id, map[string]interface{}{
				"error_chance": 6,
				"stop_time":    time.Now().Add(minute),
			})
			return nil, errors.New("为保障安全，您的账号在10分钟后解除锁定状态")
		} else {
			if userData.ErrorChance == 0 {
				// 默认错误机会为0，重新把错误机会设置为5
				userData.ErrorChance = 5
				this.UpdateMap(userData.Id, map[string]interface{}{
					"error_chance": userData.ErrorChance,
				})
			} else {
				// 验证机会减少1次
				userData.ErrorChance--
				this.UpdateMap(userData.Id, map[string]interface{}{
					"error_chance": userData.ErrorChance,
				})
			}
			return nil, errors.New("密码错误，您还有 " + strconv.Itoa(int(userData.ErrorChance)) + " 次机会")
		}
	}

	// 重置验证次数
	this.UpdateMap(userData.Id, map[string]interface{}{
		"error_chance": 6,
	})
	return userData, nil
}

// 设置初始值（新增用户时）
func (this *Model) SetDefaults(data *User) {
	data.Token = CreateToken()
	//随机分配头像
	data.Portrait = strconv.Itoa(rand.Intn(9))
}

package user

import (
	"errors"
	"github.com/ascoders/as"
)

// 通过账号名获取用户
func (this *Model) GetByAccount(account string) (*User, error) {
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

	return userData, nil
}

// 通过id获取用户
func (this *Model) GetById(id int) (*User, error) {
	data := &User{}
	err := this.Db.First(data, id).Error
	return data, err
}

// 通过邮箱获取用户
func (this *Model) GetByEmail(email string) (*User, error) {
	data := &User{}
	err := this.Db.First(data, map[string]interface{}{
		"email": email,
	}).Error
	return data, err
}

// 通过用户名获取用户
func (this *Model) GetByNickname(nickname string) (*User, error) {
	data := &User{}
	err := this.Db.First(data, map[string]interface{}{
		"nickname": nickname,
	}).Error
	return data, err
}

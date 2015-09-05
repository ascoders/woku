package user

import (
	"errors"
	"github.com/ascoders/as"
)

// 通过账号名获取用户
func (this *Model) GetByAccount(account string) (*Data, error) {
	userData := &Data{}

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
func (this *Model) GetById(id int) (*Data, error) {
	data := &Data{}
	err := this.Db.First(data, id).Error
	return data, err
}

// 通过id列表获取用户
func (this *Model) GetsById(ids []int, selector []string) ([]*Data, error) {
	if len(ids) == 0 {
		return nil, nil
	}
	
	var datas []*Data
	err := this.Db.Select(selector).Where("id in (?)", ids).Find(&datas).Error
	return datas, err
}

// 通过邮箱获取用户
func (this *Model) GetByEmail(email string) (*Data, error) {
	data := &Data{}
	err := this.Db.First(data, map[string]interface{}{
		"email": email,
	}).Error
	return data, err
}

// 通过用户名获取用户
func (this *Model) GetByNickname(nickname string) (*Data, error) {
	data := &Data{}
	err := this.Db.First(data, map[string]interface{}{
		"nickname": nickname,
	}).Error
	return data, err
}

package user

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

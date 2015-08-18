// 和用户有关

package app

// 查询某用户创建app总数
func (this *Model) UserAppCount(id int) int {
	var count int
	this.Db.Where(map[string]interface{}{
		"manager": id,
	}).Count(&count)
	return count
}

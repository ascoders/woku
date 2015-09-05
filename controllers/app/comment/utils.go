package comment

// 判断是否在int数组中
func inIntArray(number int, array []int) bool {
	for k, _ := range array {
		if number == array[k] {
			return true
		}
	}
	return false
}

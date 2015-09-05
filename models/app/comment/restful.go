package comment

import (
	"errors"
)

import (
	"github.com/ascoders/as"
)

// 通过文章id查找
func (this *Model) SelectByArticle(articleId interface{}, limit int) ([]*Data, error) {
	if limit <= 0 {
		limit = 10
	}

	if limit > 30 {
		return nil, errors.New("选择数量过多")
	}

	var appDatas []*Data
	err := this.Db.Limit(limit).Find(&appDatas, map[string]interface{}{
		"article": as.Lib.Strings.ParseInt(articleId),
	}).Error
	return appDatas, err
}

package comment

import (
	"net/http"
	"strconv"
	"woku/models/user"
)

// @router /app/comments [get]
func (this *Controller) Gets(req *http.Request) (int, []byte) {
	req.ParseForm()

	// 查询评论
	limit, _ := strconv.Atoi(req.Form.Get("limit"))
	datas, err := this.model.SelectByArticle(req.Form.Get("article"), limit)
	if err != nil {
		return this.Error(err.Error())
	}

	// 查询用户信息
	var userIds []int
	for k, _ := range datas {
		if inIntArray(datas[k].Author, userIds) {
			continue
		}
		userIds = append(userIds, datas[k].Author)
	}

	userDatas, err := user.ModelInstance.GetsById(userIds, []string{"id", "nickname", "portrait"})
	if err != nil {
		return this.Error(err.Error())
	}

	return this.Success(map[string]interface{}{
		"lists": datas,
		"users": userDatas,
	})
}

// @router /app/comments (login,article,category,app) [post]
func (this *Controller) Add(req *http.Request) (int, []byte) {
	// 判断发布级别
	switch this.category.SubmitRule {
	case "owner":
		if this.user.Id != this.app.Owner {
			return this.Error("此分类被设定为只有拥有者可发布")
		}
	case "login": // pass
	}

	// 添加当前用户到参数中
	req.Form.Set("author", strconv.Itoa(this.user.Id))

	// 添加所属文章id到参数中
	req.Form.Set("article", strconv.Itoa(this.article.Id))

	// 插入
	return this.Restful.Add(req)
}

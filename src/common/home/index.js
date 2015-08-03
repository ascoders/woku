ctrl.$onEnter = function (param, rs, rj) {
	document.title = '我酷游戏'

	//获取信息
	wk.get({
		url: '/api/home',
		success: function (data) {
			//最火游戏
			var key
			for (key in data.Games) {
				if (data.Games[key].GameImage === "") {
					data.Games[key].GameImage = "/static/img/app.png";
				} else {
					data.Games[key].GameImage = "http://img.wokugame.com/" + data.Games[key].GameImage
				}
			}
			vm.games = data.Games || []

			//最新资讯
			vm.tops = data.Tops || []

			//最新游戏
			for (key in data.NewGames) {
				if (data.NewGames[key].GameImage === "") {
					data.NewGames[key].GameImage = "/static/img/app.png";
				} else {
					data.NewGames[key].GameImage = "http://img.wokugame.com/" + data.NewGames[key].GameImage
				}
			}
			vm.newgames = data.NewGames || []

			//本周热帖
			for (key in data.HotTopics) {
				data.HotTopics[key].AuthorImage = userImage(data.HotTopics[key].AuthorImage)
			}
			vm.hots = data.HotTopics || []
		}
	})
}
ctrl.$onRendered = function () {}
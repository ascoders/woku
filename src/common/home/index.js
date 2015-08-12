ctrl.$onEnter = function (param, rs, rj) {
	document.title = '我酷游戏'
	avalon.vmodels.global.menu.current = ''
	avalon.vmodels.global.menu.dark = true

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

	$(window).scroll(function () {
		if ($(document).scrollTop() > $('#j-head').offset().top + $('#j-head').height()) {
			if (avalon.vmodels.global.menu.dark) {
				avalon.vmodels.global.menu.dark = false
			}
		} else {
			if (!avalon.vmodels.global.menu.dark) {
				avalon.vmodels.global.menu.dark = true
			}
		}
	})
}

ctrl.$onRendered = function () {
	$('select.dropdown').dropdown({
		onChange: function (value, text, $selectedItem) {
			console.log(value, text, $selectedItem)
		}
	})
}

ctrl.$onBeforeUnload = function () {
	// 菜单变白色
	avalon.vmodels.global.menu.dark = false
}
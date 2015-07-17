'use strict';

define("index", ['jquery'], function ($) {
	var vm = avalon.define({
		$id: "index",
		games: [],
		tops: [],
		news: [],
		newgames: [],
		hots: [],
		name: '', //新增名称
		path: '', //路径
		type: '', //类型
		submit: function () { //提交
			var teshu = /[`~!！@#$%^&*()_+<>?:"”{},.，。\/;；‘'[\]]/im;
			if (vm.name == "" || teshu.test(vm.name)) { //名称不能为空，不能包含特殊符号
				return wk.notice("名称不能或者含有特殊符号", 'red')
			}
			if (vm.name.length < 2 || vm.name.length > 20) {
				return wk.notice("名称长度2-20", 'red')
			}
			var xiaoxie = /^[a-z]*$/g;
			if (vm.path == "" || !xiaoxie.test(vm.path)) { //域名不能为空，必须为字母
				return wk.notice("域名只包括字母", 'red')
			}
			if (vm.path.length < 3 || vm.path.length > 20) {
				return wk.notice("域名长度3-20", 'red')
			}

			wk.post({
				url: '/api/apps',
				data: {
					name: vm.name,
					path: vm.path,
					type: vm.type
				},
				success: function () {
					wk.notice(vm.name + ' 已创建成功！', 'green')

					// 跳转到游戏首页
					avalon.router.navigate('/a/' + vm.path)
				}
			})
		}
	})

	return avalon.controller(function ($ctrl) {
		$ctrl.$onEnter = function (param, rs, rj) {
			document.title = '我酷游戏'
				//获取信息
			wk.get({
				url: '/api/home',
				success: function (data) {
					//最火游戏
					for (var key in data.Games) {
						if (data.Games[key].GameImage === "") {
							data.Games[key].GameImage = "/static/img/app.png";
						} else {
							data.Games[key].GameImage = "http://img.wokugame.com/" + data.Games[key].GameImage;
						}
					}
					vm.games = data.Games || [];

					//最新资讯
					vm.tops = data.Tops || [];

					//最新游戏
					for (var key in data.NewGames) {
						if (data.NewGames[key].GameImage === "") {
							data.NewGames[key].GameImage = "/static/img/app.png";
						} else {
							data.NewGames[key].GameImage = "http://img.wokugame.com/" + data.NewGames[key].GameImage;
						}
					}
					vm.newgames = data.NewGames || [];

					//本周热帖
					for (var key in data.HotTopics) {
						data.HotTopics[key].AuthorImage = userImage(data.HotTopics[key].AuthorImage);
					}
					vm.hots = data.HotTopics || [];
				}
			})
		}
		$ctrl.$onRendered = function () {}
	})
})
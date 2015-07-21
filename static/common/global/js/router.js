// router.js
// 状态路由

'use strict';

require(['jquery', 'mmState'], function ($) {
	//获取登陆用户信息
	global.$myDeferred = $.Deferred();
	wk.get({
		url: '/api/users/current',
		success: function success(data) {
			if (data === false) {
				return;
			}

			global.my.setInfo(data);
		},
		error: function error() {
			global.$myDeferred.resolve(); // 未登录
		}
	});

	//找不到的页面跳转到404
	avalon.router.error(function () {
		avalon.router.navigate('/404');
	});

	//模版无法加载跳转404
	avalon.state.config({
		onloadError: function onloadError() {
			avalon.router.navigate('/404');
		},
		onBeforeUnload: function onBeforeUnload() {
			// 清空所有jbox
			$('.jBox-wrapper').remove();
		}
	});

	//404
	avalon.state('404', {
		controller: 'global',
		url: '/404',
		views: {
			'container': {
				templateUrl: '/static/public/404.html',
				controllerUrl: ['public/404.js'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	//首页
	avalon.state('index', {
		controller: 'global',
		url: '/',
		views: {
			'container': {
				templateUrl: '/static/index/home.html',
				controllerUrl: ['index/index'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	//登陆
	avalon.state('login', {
		controller: 'global',
		url: '/login',
		views: {
			'container': {
				templateUrl: '/static/check/login.html',
				controllerUrl: ['check/login'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	//第三方平台登陆
	avalon.state('loginOauth', {
		controller: 'global',
		url: '/login/oauth',
		views: {
			'container': {
				templateUrl: '/static/check/loginOauth.html',
				controllerUrl: ['check/loginOauth'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	//注册
	avalon.state('register', {
		controller: 'global',
		url: '/register',
		views: {
			'container': {
				templateUrl: '/static/check/register.html',
				controllerUrl: ['check/register'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 自动验证
	avalon.state('auth', {
		controller: 'global',
		url: '/auth',
		views: {
			'container': {
				templateUrl: '/static/check/auth.html',
				controllerUrl: ['check/auth'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 创建网站
	avalon.state('create', {
		controller: 'global',
		url: '/create',
		views: {
			'container': {
				templateUrl: '/static/create/create.html',
				controllerUrl: ['create/create'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 总应用列表
	avalon.state('appList', {
		controller: 'global',
		url: '/app',
		views: {
			'container': {
				templateUrl: '/static/app/app.html',
				controllerUrl: ['app/app'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 各分类应用列表
	avalon.state('appListType', {
		controller: 'global',
		url: '/app/{type}',
		views: {
			'container': {
				templateUrl: '/static/app/app.html',
				controllerUrl: ['app/app'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 板块
	avalon.state('app', {
		controller: 'global',
		url: '/a/{app}',
		views: {
			'container': {
				templateUrl: '/static/app/base.html',
				controllerUrl: ['app/base'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		},
		abstract: true
	});

	//板块.首页
	avalon.state('app.home', {
		controller: 'appBase',
		url: '',
		views: {
			'appContainer': {
				templateUrl: '/static/app/home.html',
				controllerUrl: ['app/home'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 管理
	avalon.state('app.admin', {
		controller: 'appBase',
		url: '/admin',
		views: {
			'appContainer': {
				templateUrl: '/static/app/admin.html',
				controllerUrl: ['app/admin'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		},
		abstract: true
	});

	// 管理 首页
	avalon.state('app.admin.home', {
		controller: 'appAdmin',
		url: '',
		views: {
			'appAdminContainer': {
				templateUrl: '/static/app/adminHome.html',
				controllerUrl: ['app/adminHome'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 管理 具体项目
	avalon.state('app.admin.info', {
		controller: 'appAdmin',
		url: '/{info}',
		views: {
			'appAdminContainer': {
				templateUrl: function templateUrl(param) {
					return '/static/app/admin/' + param.info + '.html';
				},
				controllerUrl: function controllerUrl(param) {
					return ['app/admin/' + param.info];
				},
				cacheController: false
			}
		}
	});

	// 板块.标签
	avalon.state('app.tag', {
		controller: 'appBase',
		url: '/tag',
		views: {
			'appContainer': {
				templateUrl: '/static/app/list.html',
				controllerUrl: ['app/list'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	//板块.分类列表
	avalon.state('app.list', {
		controller: 'appBase',
		url: '/{category:[a-z]{1,10}}',
		views: {
			'appContainer': {
				templateUrl: '/static/app/list.html',
				controllerUrl: ['app/list'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	//板块.分类列表
	avalon.state('app.list', {
		controller: 'appBase',
		url: '/{category:[a-z]{1,10}}/doc',
		views: {
			'appContainer': {
				templateUrl: '/static/app/listDoc.html',
				controllerUrl: ['app/listDoc'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	//板块.文章信息
	avalon.state('app.page', {
		controller: 'appBase',
		url: '/{id:[0-9a-z]{24}}',
		views: {
			'appContainer': {
				templateUrl: '/static/app/page.html',
				controllerUrl: ['app/page'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	//板块.文档.文章信息
	avalon.state('app.list.doc', {
		controller: 'appListDoc',
		url: '/{id:[0-9a-z]{24}}',
		views: {
			'appListDocContainer': {
				templateUrl: '/static/app/pageDoc.html',
				controllerUrl: ['app/page'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 账号后台
	avalon.state('user', {
		controller: 'global',
		url: '/user',
		views: {
			'container': {
				templateUrl: '/static/user/base.html',
				controllerUrl: ['user/base'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		},
		abstract: true
	});

	// 账号后台 - 分类 - 页面
	avalon.state('user.page', {
		controller: 'userBase',
		url: '/{category}/{page}',
		views: {
			'userContainer': {
				templateUrl: function templateUrl(params) {
					console.log('templateUrl');
					return '/static/user/' + params.category + '/' + params.page + '.html';
				},
				controllerUrl: function controllerUrl(params) {
					//设置当前分类和页面
					avalon.vmodels.userBase.category = params.category;
					avalon.vmodels.userBase.page = params.page;

					//改变当前标题
					for (var key in avalon.vmodels.userBase.lists.$model) {
						if (avalon.vmodels.userBase.lists[key].url == params.category) {
							for (var _key in avalon.vmodels.userBase.lists[key].childs.$model) {
								if (avalon.vmodels.userBase.lists[key].childs[_key].url == params.page) {
									avalon.vmodels.userBase.title = '<i class="f-mr5 fa ' + avalon.vmodels.userBase.lists[key].childs[_key].icon + '"></i>' + avalon.vmodels.userBase.lists[key].childs[_key].name;
									document.title = '我的账号 - ' + avalon.vmodels.userBase.lists[key].childs[_key].name + ' - 我酷游戏';
								}
							}
						}
					}

					return ['user/' + params.category + '/' + params.page];
				},
				cacheController: false
			}
		}
	});

	// 更新/新增第三方平台
	avalon.state('oauth', {
		controller: 'global',
		url: '/oauth',
		views: {
			'container': {
				templateUrl: '/static/check/oauth.html',
				controllerUrl: ['check/oauth'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 第三方平台二跳地址
	avalon.router.get('/oauth/jump', function () {
		location.href = 'https://openapi.baidu.com/social/oauth/2.0/receiver' + location.search;
	});

	// 舆情分析
	avalon.state('yuqing', {
		controller: 'global',
		url: '/yuqing',
		views: {
			'container': {
				templateUrl: '/static/yuqing/yuqing.html',
				controllerUrl: ['yuqing/yuqing'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 舆情分析详细列表
	avalon.state('yuqingList', {
		controller: 'global',
		url: '/yuqing/{category}',
		views: {
			'container': {
				templateUrl: '/static/yuqing/list.html',
				controllerUrl: ['yuqing/list'],
				ignoreChange: function ignoreChange(changeType) {
					if (changeType) return true;
				}
			}
		}
	});

	// 启动路由
	avalon.history.start({
		basepath: '/',
		html5Mode: true,
		hashPrefix: '!',
		routeElementJudger: function routeElementJudger(element) {
			return typeof $(element).attr('router') !== 'undefined';
		}
	});

	// 扫描
	avalon.scan();
});
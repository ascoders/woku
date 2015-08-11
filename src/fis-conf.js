// 依赖
// npm install jshint
// npm install lesslint
// npm install fis-parser-babelcore

// 升级fis3
// npm install -g fis3

// 开发模式编译
// fis3 release -d ../static -w -l

// 上线模式编译
// fis3 release dest -d ../static -w -l

// 说明
// _root 根节点id

var jshint = require('jshint').JSHINT

// 排除指定目录
fis
  .set('project.files', [
    '**'
  ])

// js代码检查
fis.match('*.js', {
  lint: function (content, file, settings) {
    jshint(content, {
      asi: true // 不强求末尾加逗号
    })
    for (var val of jshint.errors) {
      console.log(file + ', line:' + val.line + ', character:' + val.character + ', ' + val.raw)
    }
  }
})

// js typescript => es5
fis.match('*.js', {
  parser: fis.plugin('babelcore')
})
fis.match('common/global/**/*.js', {
  parser: null
})
fis.match('plugin/**/*.js', {
  parser: null
})
fis.match('plugin_extend/**/*.js', {
  parser: null
})

// less解析
fis.match('*.less', {
  // css文件外套一层其路径相关的id
  // fis-parser-less 插件进行解析
  parser: [function (content, file, settings) {
    var moduleName = 'c' + file.subdirname.replace(/\//g, '-')
    return '#' + moduleName + '{' + content + '}'
  }, fis.plugin('less')],
  // .less 文件后缀构建后被改成 .css 文件
  rExt: '.css'
})

// common/global/*.less、plugin、plugin_extend只进行less解析
fis.match('common/global/{*,less/*}.less', {
  parser: fis.plugin('less')
})
fis.match('plugin/**/*.less', {
  parser: fis.plugin('less')
})
fis.match('plugin_extend/**/*.less', {
  parser: fis.plugin('less')
})

// html文件外套一层其路径相关的id
fis.match('*.html', {
  preprocessor: function (content, file, settings) {
    var moduleName = file.subdirname.substr(1)
    return '<div id="c-' + moduleName.replace(/\//g, '-') + '" ms-controller="' + moduleName + '">' + content + '</div>'
  }
})

// js文件分析
// 不产出vm
fis.match('*/*/vm.js', {
  release: false
})

// 聚合vm文件
fis.match('*/*/index.js', {
  preprocessor: function (content, file, settings) {
    var moduleName = file.subdirname.substr(1)
    return 'define("' + moduleName + '", ["css!' + moduleName + '/index.css"__DEPEND__], function (css__OUTPUT__) {\n' +
      'var _root = \'#c-' + moduleName.replace(/\//g, '-') + '\'\n' +
      '__inline("vm.js")' +
      '\nreturn avalon.controller(function (ctrl) {\n' + content +
      '})})'
  }
})

// js分析依赖
// 添加avalon $id
fis.match('*/*/index.js', {
  postprocessor: function (content, file, settings) {
    var moduleName = file.subdirname.substr(1)

    var depend = ''
    var output = ''

    var avalonPlug = ['page', 'table']
    for (var val of avalonPlug) {
      if (content.indexOf('$' + val + 'Opts') > -1) {
        depend += ', "avalon.' + val + '"'
        output += ', ' + val
      }
    }

    // 添加$id
    content = content.replace(/avalon.define\(\{/g, 'avalon.define({\n$id: \'' + moduleName + '\',')

    content = content.replace(/__DEPEND__/g, depend)
    content = content.replace(/__OUTPUT__/g, output)
    return content
  }
})

// common/global、plugin、plugin_extend例外
fis.match('common/global/**', {
  preprocessor: null,
  postprocessor: null,
  lint: null
})
fis.match('plugin/**', {
  preprocessor: null,
  postprocessor: null,
  lint: null
})
fis.match('plugin_extend/**', {
  preprocessor: null,
  postprocessor: null,
  lint: null
})

/////////////////////// 优化阶段
// 文件压缩
fis
  .media('dest')
  .match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
  })
  .match('*.less', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
  })
  .match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
  })
  .match('*.html', {
    //invoke fis-optimizer-html-minifier
    optimizer: fis.plugin('html-minifier')
  })
  .match('*.png', {
    optimizer: fis.plugin('png-compressor', {
      type: 'pngquant'
    })
  });


// 替换url路径修正
fis.match('*', {
  url: '/static$0'
})
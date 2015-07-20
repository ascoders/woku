// 增强的对象字面量
// 对象字面量被增强了，写法更加简洁与灵活，同时在定义对象的时候能够做的事情更多了。具体表现在：
// 可以在对象字面量里面定义原型
// 定义方法可以不用function关键字
// 直接调用父类方法
// 这样一来，对象字面量与前面提到的类概念更加吻合，在编写面向对象的JavaScript时更加轻松方便了。

// 通过对象字面量创建对象
var human = {
	breathe() {
		console.log('breathing...');
	}
}

human.breathe()
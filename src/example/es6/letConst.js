// let与const 关键字
// 可以把let看成var，只是它定义的变量被限定在了特定范围内才能使用，
// 而离开这个范围则无效。const则很直观，用来定义常量，即无法被更改值的变量。

for (let i = 0; i < 2; i++) {
	console.log(i)
} //输出: 0,1

// console.log(i) //输出：undefined,严格模式下会报错
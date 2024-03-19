// async 在chrome 70和73的解析方式不同
// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
//
// async function async2() {
// }
//
// async1();
// new Promise(function (resolve) {
//     resolve();
// }).then(function () {
//     console.log('promise2')
// }).then(function () {
//     console.log('promise3')
// }).then(function () {
//     console.log('promise4')
// })


//
// // 73
// async function f1() {
//     f2().then(() => {
//         console.log('f1 end')
//     })
// }
//
// // 70
// async function f1() {
//     return new Promise((res) => {
//         Promise.resolve().then(() => {
//             f2().then(res)
//         })
//     }).then(() => {
//         console.log('f1 end')
//     })
// }


// setTimeout(()=> console.log(1))
//
// new Promise(resolve => {
//     resolve()
//     console.log(2)
// }).then(_ => {
//     console.log(3)
//     Promise.resolve().then(_ => {
//         console.log(4)
//     }).then(_ => {
//         Promise.resolve().then(_ => {
//             console.log(5)
//         })
//     })
// })
//
// console.log(6)
// 2 6 3 4  5 1

// setTimeout(() => console.log(1), 0);
//
// new Promise(resolve => {
//     console.log(2);
//     resolve();
// }).then(() => {
//     console.log(3);
// });
//
// console.log(4);
// 2 4 3 1


// const p = new Promise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//         console.log(2);
//     })
//     resolve(1);
// }).then(res => {
//     console.log(3);
// })
//
// setTimeout(() => {
//     console.log(4);
// })
//
// console.log(5);
// 1 5 3 2 4

// async function async1() {
//     console.log('async1 start')
//     await async2()
//     console.log('async1 end')
// }
//
// async function async2() {
//     console.log('async2')
// }
//
// console.log('script start')
//
// setTimeout(function () {
//     console.log('setTimeout')
// }, 0)
//
// async1()
//
// new Promise(function (resolve) {
//     console.log('promise1');
//     resolve()
// }).then(function () {
//     console.log('promise2')
// })
//
// console.log('script end')


// script start
// async1 start
// promise1
// script end
// async2
// async1 end
// promise2
// setTimeout


// async function async1() {
//     console.log('async1 start')
//     await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2')
// }
// console.log('script start')
// setTimeout(function () {
//     console.log('settimeout')
// })
// async1()
// new Promise(function (resolve) {
//     console.log('promise1')
//     resolve()
// }).then(function () {
//     console.log('promise2')
// })
// console.log('script end')


// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// settimeout


// console.log('1');
//
// setTimeout(function () {
//     console.log('2');
//     process.nextTick(function () {
//         console.log('3');
//     })
//     new Promise(function (resolve) {
//         console.log('4');
//         resolve();
//     }).then(function () {
//         console.log('5')
//     })
// })
//
// process.nextTick(function () {
//     console.log('6');
// })
//
// new Promise(function (resolve) {
//     console.log('7');
//     resolve();
// }).then(function () {
//
//     console.log('8')
// })
//
// setTimeout(function () {
//     console.log('9');
//     process.nextTick(function () {
//         console.log('10');
//     })
//     new Promise(function (resolve) {
//         console.log('11');
//         resolve();
//     }).then(function () {
//         console.log('12')
//     })
// })

//1
// 7
//6
//8
//2 4 3 5
// 9 11 10 12


// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
//
// async function async2() {
// }
//
// async1();
// new Promise(function (resolve) {
//     resolve();
// }).then(function () {
//     console.log('promise2')
// }).then(function () {
//     console.log('promise3')
// }).then(function () {
//     console.log('promise4')
// })
// async1 end
// promise2/3/4


// console.log('begin')
// setTimeout(() => {
//     console.log('setTimeout 1')
//     Promise.resolve().then(() => {
//         console.log('promise 1')
//         setTimeout(() => {
//             console.log('setTimeout2 between promise1&2')
//         })
//     }).then(() => {
//         console.log('promise 2')
//     })
// }, 0)
// console.log('end')

// begin
// end
// setTimeout 1
// promise 1
// promise 2'
// setTimeout2 between promise1&2


// function arr(){
//     setTimeout(function(){
//         console.log('1');
//     },0)
//     async function async1(){
//         console.log('4');
//         await async2();
//         console.log('6');
//     }
//     async function async2(){
//         console.log('5');
//     }
//     async1();
//     new Promise(function(resolve,reject){
//         console.log('2');
//         resolve();
//     }).then(function(e2){
//         console.log('h');
//     })
//     console.log('3');
// }
// arr()
// 4 5 2 3 6 h 1


// setTimeout(_ => console.log(1))
// new Promise(resolve => {
//     resolve()
//     console.log(2)
// }).then(_ => {
//     setTimeout(_ => console.log(3))
//     console.log(4)
//     Promise.resolve().then(_ => {
//         console.log(5)
//     }).then(_ => {
//         Promise.resolve().then(_ => {
//             console.log(6)
//         })
//     })
// })
// console.log(7)

// 错4  7 2 5 6 1 3
// 2 7 45    613


// console.log(1);
// setTimeout(() => {
//     console.log(2);
//     Promise.resolve().then(() => {
//         console.log(3)
//     });
// });
// new Promise((resolve, reject) => {
//     console.log(4)
//     resolve()
// }).then(() => {
//     console.log(5);
// })
// setTimeout(() => {
//     console.log(6);
// })
// console.log(7);
// 1 4 7 5 2 3 6


// setTimeout(() => {
//     console.log(1)
// }, 0);
// new Promise((res)=>{
//     console.log(2);res()
// }).then(()=>{
//     console.log(4)
// })
// console.log(3)
// 2 3 4 1


// const a = () => {
//     new Promise((resolve) => {
//         resolve(1)
//         console.log('a')
//     }).then(() => {
//         console.log('b')
//     })
// }
// a()
// console.log('c')
// a c b


// new Promise((resolve, reject) => {
//     reject(1)
// }).catch(() => {
//     console.log(2);
// }).then(() => {
//     console.log(3)
// }, (v) => {
//     console.log(v)
// })
// console.log(4)
// 4 2 3


// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
// }
// async function async2() {
//     console.log('async2 start');
//     return new Promise((resolve, reject) => {
//         resolve();
//         console.log('async2 promise');
//     })
// }
// console.log('script start');
// setTimeout(function() {
//     console.log('setTimeout');
// }, 0);
// async1();
// new Promise(function(resolve) {
//     console.log('promise1');
//     resolve();
// }).then(function() {
//     console.log('promise2');
// }).then(function() {
//     console.log('promise3');
// });
// console.log('script end')

// script start
// async1 start
// async2 start
// async2 promise
// promise1
// script end

// promise2
// promise3
// async1 end 记住
// setTimeout


function app() {
    setTimeout(() => {
        console.log("1-1");
        Promise.resolve().then(() => {
            console.log("2-1");
        });
    });
    console.log("1-2");
    Promise.resolve().then(() => {
        console.log("1-3");
        setTimeout(() => {
            console.log("3-1");
        });
    });
}

app();

// 1-2
// 1-3
// 1-1
// 2-1
// 3-1
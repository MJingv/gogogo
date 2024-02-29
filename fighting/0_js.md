js原始数据类型

- 7个:null/undefined/boolean/string/number/symbol/bigint

js引用数据类型

- 6个object:object/array/date/regexp/function/math

0.1+0.2!==0.3

- 0.1和0.2转成二进制都会无限循环，所有语言都如此，它们有double/float
- 因为浮点数限制，截断了二进制数字，出现了精度丢失s
- 最大是2^53-1,最小是-(2^53-1),超过用bigint，10n代表10倍的最大数

typeof

- 检测基本类型
- typeof null===‘object’ 这个是错误的

instanceof

- 判断是否为类的实例
- 判断引用类型，也可以判断包装object的基本类型
- 
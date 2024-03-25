type vs interface
type：

- 主要是复杂类型
- 对象类型、联合类型、交叉类型。
- 不可继承。

interface：

- 主要是定义对象的结构和行为
- 对象类型。
- 可继承

工具类型（Utility Types）

- Partial<T>：将类型 T 中的所有属性变为可选属性，创建一个新的类型。
- Required<T>：将类型 T 中的所有属性变为必选属性，创建一个新的类型。
- Readonly<T>：将类型 T 中的所有属性变为只读属性，创建一个新的类型。
- Record<K, T>：创建一个类型，其中属性名为类型 K 中的值，属性值为类型 T 中的值。
- Exclude<T, U>：从类型 T 中排除可以赋值给类型 U 的属性，创建一个新的类型。
- Omit<T, K>：从类型 T 中排除指定的属性 K，创建一个新的类型。
- Pick<T, K>：从类型 T 中选择指定的属性 K，创建一个新的类型。
- ReturnType<T>：获取函数类型 T 的返回类型。
- Parameters<T>：获取函数类型 T 的参数类型。
- NonNullable<T>：从类型 T 中排除 null 和 undefined，创建一个新的类型。
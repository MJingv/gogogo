React hooks
---

- 16.8+
- not a class ,but a function
- lots of useCallback,you can create your own hooks

useCallback
---

- useCallback(fn,dependencies)
- useCallback is a hook lets you *cache* a function definition between re-renders
- function(){} diff from ()=>{},{} diff from object
- [best practice] handles,events,props change,,(in small part)
- *useMemo* caches the result of calling your function,*useCallback* caches the function itself

useContext
---

- useContext is a hook lets you read and subscribe to context form your component
- useContext(someContext)

useEffect
---

- useEffect is a hook lets you synchronize a component with an external system
- ustEffect(setup,dependencies?)
- 


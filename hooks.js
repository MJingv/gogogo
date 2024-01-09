// react hooks
// https://reactjs.org/docs/hooks-intro.html

// Hooks allow you to reuse stateful logic without changing your component hierarchy.

// why？
// - Complex components become hard to understand
// Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data)
// - Classes confuse both people and machines
// Hooks let you use more of React’s features without classes


import React, {useEffect, useState} from "react";

const App = () => {
    const [value, setValue] = useState('')
    useEffect(() => {
        setValue('initValue')
    }, []);

    const handleChange = (e) => {
        setValue(e.target.value + '111')
    }
    return <input ref={'input'} onChange={handleChange} value={value}/>
}
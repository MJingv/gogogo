import './App.css';
import {useState, useEffect, useRef, useReducer} from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREASE':
            return {count: state.count + 1}
        case 'DECREASE':
            return {count: state.count - 1}
        case 'CLEAR':
            return {count: -999}
        default:
            return state
    }
}

const Counter = ({count, dispatch}) => {
    return <>
        <p>{count}</p>
        <button onClick={() => dispatch({type: 'INCREASE'})}>+</button>
        <button onClick={() => dispatch({type: 'DECREASE'})}>-</button>
    </>
}

export default function App() {
    const [val, setVal] = useState('init')
    const myInput = useRef(null);
    const [state, dispatch] = useReducer(reducer, {count: 0})


    useEffect(() => {
        setVal('start')
        myInput.current.focus()
    }, [])
    const handleInput = (e) => {
        setVal(e.target.value)
    }
    const handleClick = () => {
        setVal('')
        myInput.current.value = ''
        dispatch({type: 'CLEAR'})
    }
    return (<div className="App">
            <header className="App-header">
                <input ref={myInput} onChange={handleInput}></input>
                <button onClick={handleClick}>clean all</button>
                <p>{val}</p>
                <p>---------------------------------------------------</p>
                <Counter count={state.count} dispatch={dispatch}/>
                <p>{state.count}</p>
            </header>
        </div>);
}


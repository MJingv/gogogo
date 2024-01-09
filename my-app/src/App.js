import './App.css';
import {useState, useEffect, useRef} from "react";

export default function App() {
    const [val, setVal] = useState<String>('init')
    const myInput = useRef<HTMLInputElement>(null);

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
    }
    return (
        <div className="App">
            <header className="App-header">
                <input ref={myInput} onChange={handleInput}></input>
                <button onClick={handleClick}>clean all</button>
                <p>{val}</p>
            </header>
        </div>
    );
}


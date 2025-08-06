import { useReducer, useMemo, useState } from "react";

const initialState = {
  count: 0,
  color: "blue",
  history: []
};



function reducer(state, action) {
  switch (action.type) {
    case "increment": {
      const newCount = state.count + 1;
      const newHistory = [newCount, ...state.history].slice(0, 5);
      return { ...state, count: newCount, history: newHistory };
    }
    case "decrement": {
      const newCount = state.count - 1;
      const newHistory = [newCount, ...state.history].slice(0, 5);
      return { ...state, count: newCount, history: newHistory };
    }
    case "reset":
      return { ...initialState };
    case "resetCount":
      return { ...state, count: 0 };
    case "toggleColor":
      return { ...state, color: state.color === "blue" ? "red" : "blue" };
    case "addCustom": {
      const newCount = state.count + action.payload;
      const newHistory = [newCount, ...state.history].slice(0, 5);
      return { ...state, count: newCount, history: newHistory };
    }
    default:
      return state;
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [customValue, setCustomValue] = useState("");

  const colorClass = useMemo(() => state.color, [state.color]);
  const buttonClass = useMemo(() => `${state.color}-bg`, [state.color]);

  const historyList = useMemo(() => {
    if (state.history.length === 0) return <li>History is empty</li>;
    return state.history.map((num, index) => <li key={index}>: {num}</li>);
  }, [state.history]);

  const handleCustomAdd = () => {
    const value = parseInt(customValue, 10);
    if (!isNaN(value)) {
      dispatch({ type: "addCustom", payload: value });
      setCustomValue("");
    }
  };


  return (
    <div className="counter">
      <h2 className="counter-title">Colourful Counter</h2>

      <div className={`counter-value ${colorClass}`}>{state.count}</div>

      <div className="counter-controls">
        <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
        <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      </div>

      <div className="counter-controls">
        <button onClick={() => dispatch({ type: "reset" })}>Reset All</button>
        <button onClick={() => dispatch({ type: "resetCount" })}>Reset Count Only</button>
        <button className={buttonClass} onClick={() => dispatch({ type: "toggleColor" })}>
          Change the colour
        </button>
      </div>

      <div className="counter-controls">
        <input
          type="number"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          placeholder="Enter a number"
        />
        
       <button onClick={handleCustomAdd}>Add to Count</button>
      </div>

      <span className={`color-label blue ${colorClass}`}>
        Current color: {state.color}
      </span>
  

      <div className="history">
        <h3>Last 5 numbers:</h3>
        <ul className="history-list">{historyList}</ul>
      </div>
    </div>
  );
}

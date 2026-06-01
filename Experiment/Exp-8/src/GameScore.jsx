import { useState } from "react";
function GameScore() {
  const [count, setCount] = useState(0);
  // incrememnt
  const increment = () => {
    setCount(count + 1);
  }
  // decrement
  const decrement = () => {
    setCount(count - 1);
  }
  // reset
  const reset = () => {
    setCount(0);
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Count </h1>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment +</button>
      <button onClick={decrement}>Decrement-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
export default GameScore;
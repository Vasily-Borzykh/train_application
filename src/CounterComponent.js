import React from 'react';
import { observer } from 'mobx-react';
import counterStore from './store';

const CounterComponent = observer(() => {
  const { count, increment, decrement } = counterStore;

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <p>Count: {count}</p>
    </div>
  );
});

export default CounterComponent;

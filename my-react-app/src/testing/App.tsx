import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Testing</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          test is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        We are Testing
      </p>
    </>
  )
}

export default App
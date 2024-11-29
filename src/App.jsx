import { useState } from 'react'
import Navbar from './Navbar/Navbar'
import Contents from './Contents/Contents'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
      <Contents />
    </div>
  )
}

export default App

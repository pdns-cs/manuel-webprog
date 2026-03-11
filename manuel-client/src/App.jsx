import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
         <h1>Welcome to My React App!</h1>
        <p>
          Name: Princess Denese Manuel <br />
          Email: manuelpm@students.national-u<br />
          Section: INF 231 MWA
        </p>
        <a href="https://github.com/pdns-cs/manuel-webprog.git" target="_blank" rel="noopener noreferrer">
          GitHub Repository
        </a>
      </div>

    </>
  )
}

export default App

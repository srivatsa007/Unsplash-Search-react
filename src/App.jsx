import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SearchImg from "./components/Search"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='App relative'>
      <SearchImg/>
      <footer className= 'flex sticky z-20 bottom-0 w-screen py-2 bg-slate-300 text-center align-middle justify-between px-8'>
        Made by Vatsa
        <button className='right-8px px-1 mr-0 font-extrabold '> <a href="#"> 🢁 </a> </button>
      </footer>
    </div>
  )
}

export default App

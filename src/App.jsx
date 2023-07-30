import React from 'react'
import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Layout from "./Components/Layout"
import NotFound from './Components/NotFound'
import './App.css'
import Race from './Pages/Race'
import Compete from './Components/Compete'
// import Lobby from './Components/Lobby'
import Error from './Components/Error'

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} errorElement={<Error />} />
      <Route path='race' element={<Race />} errorElement={<Error />} />
      <Route path='compete' element={<Compete />} errorElement={<Error />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  ))
  return (
    <div className='main_div'>
      <RouterProvider router={router} />
    </div>
  )
}

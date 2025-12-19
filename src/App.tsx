import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Layout from './layout'
import Redux from './pages/all/redux'
import Zustand from './pages/all/zustand'
import Jotai from './pages/all/jotai'
import MobX from './pages/all/mobX'
import Context from './pages/all/context'
import ReactQuery from './pages/all/reactQuery'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Redux/>} />
            <Route path='/redux' element={<Redux/>} />
            <Route path='zustand' element={<Zustand/>} />
            <Route path='/jotai' element={<Jotai/>} />
            <Route path='/mobX' element={<MobX/>} />
            <Route path='/contextApi' element={<Context/>} />
            <Route path='/queryReact' element={<ReactQuery/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

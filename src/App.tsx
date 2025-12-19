import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Layout from './layout'
import Redux from './pages/allPages/redux'
import Zustand from './pages/allPages/zustand'
import Jotai from './pages/allPages/jotai'
import MobX from './pages/allPages/mobX'
import Context from './pages/allPages/context'
import ReactQuery from './pages/allPages/reactQuery'
import AsyncRedux from './pages/reduxPages/asyncRedux'
import SyncRedux from './pages/reduxPages/syncRedux'
import InfoSyncRedux from './pages/reduxPages/infoSyncRedux'
import InfoAsyncRedux from './pages/reduxPages/infoAsyncRedux'
import AsyncRTK from './pages/reduxPages/rtkQuery/asyncRTK'
import InfoAsyncRTK from './pages/reduxPages/rtkQuery/infoAsyncRTK'

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

            <Route path='/asyncRedux' element={<AsyncRedux/>} />
            <Route path='/syncRedux' element={<SyncRedux/>} />
            <Route path='/infoSyncRedux/:id' element={<InfoSyncRedux/>} />
            <Route path='/infoAsyncRedux/:id' element={<InfoAsyncRedux/>} />
            <Route path='/asyncRTK' element={<AsyncRTK/>} />
            <Route path='/infoAsyncRTK/:id' element={<InfoAsyncRTK/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

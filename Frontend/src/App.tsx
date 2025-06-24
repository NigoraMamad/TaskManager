import './App.css'
import AppHeader from './components/AppHeader/AppHeader'
import { Board } from './components/Board'
import UserInfo from './components/UserInfo/UserInfo'
 
function App() {

  return (
    <>
      <AppHeader />
      <UserInfo/>
          <div>
      <div style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
        <h1 style={{ fontSize: '24px', color: '#5f5fc4' }}>Board view</h1>
      </div>
      <Board />
    </div>
    </>
  )
}

export default App

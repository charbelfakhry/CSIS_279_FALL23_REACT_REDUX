import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import SigninPage from './pages/SignInPage'
import RegisterPage from './pages/RegisterPage'
import { useAppSelector } from './store'
import NewsFeedPage from './pages/NewsFeedPage';

function App() {

  const isLoggedin = useAppSelector(state => state.auth.isAuthenticated);
  console.log('isLoggedin', isLoggedin);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoggedin? <NewsFeedPage/> : <Navigate to='/signin'/>}/>
        <Route path='/signin' element={<SigninPage />}/>
        <Route path='/register' element={<RegisterPage />}/>

        {isLoggedin && (
          <Route path='/' element={<NewsFeedPage/>} />
          // other protected pages
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App

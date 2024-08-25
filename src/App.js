import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register';
import Home from './components/home'
import DetailedPost from './components/detailedView';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/login' Component={Login} />
      <Route exact path='/register' Component={Register}/>
      <Route exact path='/' Component={Login}/>
      <Route exact path='/posts' Component={Home}/>
      <Route exact path='/posts/:id' Component={DetailedPost}/>
    </Routes>
  </BrowserRouter>
)

export default App;

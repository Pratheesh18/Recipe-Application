import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Login from './components/Login';
import Register from "./components/Register";
import Home from './components/Home';
import FavoriteMeals from './components/FavoriteMeals';
import NavBar from './components/NavBar';


const App = () => {
  return(
    <>
      <Router>
        {/* <NavBar /> */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/favorites' element={<FavoriteMeals />} />
        </Routes>
      </Router>
    </>
  )
};

export default App;
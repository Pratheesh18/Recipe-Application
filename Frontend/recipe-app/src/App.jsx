import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Login from './components/Login';
import Register from "./components/Register";
import Home from './components/Home';
import FavoriteMeals from './components/FavoriteMeals';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  return(
    <>
      <Router>
        {/* <NavBar /> */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
               path='/home'
               element={<ProtectedRoute>
                <Home />
               </ProtectedRoute>} 
          />
           <Route
                 path='/favorites'
                 element={<ProtectedRoute>
                  <FavoriteMeals />
                 </ProtectedRoute>}
            />
        </Routes>
      </Router>
    </>
  )
};

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProtectedPage from './components/ProtectedPage';
import Spinner from "./components/Spinner";
import {useSelector} from 'react-redux'
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import SingleProduct from "./pages/ProductInfo/SingleProduct";
import AllRoutes from "./pages/AllRoutes";


function App() {
  const {loading} =useSelector(state=>state.loaders)
  return (
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
       <AllRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;

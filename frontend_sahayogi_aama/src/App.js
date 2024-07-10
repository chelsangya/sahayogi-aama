import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AamaList from "./pages/Admin/AamaList";
import AddAama from "./pages/Admin/AddAama";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AvailableAama from "./pages/AvailableAama";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRoutes from "./pages/protected/AdminRoutes";
import UserRoutes from "./pages/protected/UserRoutes";
import VerificationList from "./pages/Admin/VerificationList";
import AamaDetails from "./pages/AamaDetails";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import FavouriteList from "./pages/FavouriteList";
import EditAamaDetail from "./pages/Admin/EditAamaDetail";


function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>

        <Route path='/signup' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route element={<UserRoutes/>}>
          <Route path='/home' element={<Homepage/>}/>
          <Route path="/availableAama" element={<AvailableAama/>}/>
          <Route path="/aamaDetails/:id" element={<AamaDetails/>}/>
          <Route path="/myBookings" element={<MyBookings/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route path="/favourite-list" element={<FavouriteList/>}/>
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/addAama" element={<AddAama/>} />
          <Route path="/aamaList" element={<AamaList/>} />
          <Route path="/aamaVerification" element={<VerificationList/>} />
          <Route path="/editAama/:id" element={<EditAamaDetail/>} />
        </Route>  
      </Routes>
    </Router>
  
  );
}

export default App;

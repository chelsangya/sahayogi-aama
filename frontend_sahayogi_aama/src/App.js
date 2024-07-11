import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AamaDetails from "./pages/AamaDetails";
import AamaList from "./pages/Admin/AamaList";
import AddAama from "./pages/Admin/AddAama";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import BookingList from "./pages/Admin/BookingList";
import ContactList from "./pages/Admin/ContactList";
import EditAamaDetail from "./pages/Admin/EditAamaDetail";
import VerificationList from "./pages/Admin/VerificationList";
import AvailableAama from "./pages/AvailableAama";
import ChangePassword from "./pages/ChangePassword";
import Contact from "./pages/Contact";
import FavouriteList from "./pages/FavouriteList";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Register from './pages/Register';
import AdminRoutes from "./pages/protected/AdminRoutes";
import UserRoutes from "./pages/protected/UserRoutes";
import RequestOTP from "./pages/RequestOTP";
import ResetPassword from "./pages/ResetPassword";



function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>

        <Route path='/signup' element={<Register/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/request-otp' element={<RequestOTP/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>


        <Route element={<UserRoutes/>}>
          <Route path='/home' element={<Homepage/>}/>
          <Route path="/availableAama" element={<AvailableAama/>}/>
          <Route path="/aamaDetails/:id" element={<AamaDetails/>}/>
          <Route path="/myBookings" element={<MyBookings/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route path="/favourite-list" element={<FavouriteList/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/addAama" element={<AddAama/>} />
          <Route path="/aamaList" element={<AamaList/>} />
          <Route path="/aamaVerification" element={<VerificationList/>} />
          <Route path="/editAama/:id" element={<EditAamaDetail/>} />
          <Route path="/contactList" element={<ContactList/>}/>
          <Route path="/bookingList" element={<BookingList/>}/>
        </Route>  
      </Routes>
    </Router>
  
  );
}

export default App;

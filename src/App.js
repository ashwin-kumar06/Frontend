import { useEffect } from 'react';
import Login from './components/Login'
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgetPassword';
import CardPayment from './components/CardPayment';
import Homepage from './components/Homepage';
import AddProducts from './components/AddProduct';
import ProductListing from './components/ProductListing';
import PersonalDetails from './components/PersonalDetails';
import UserDashboard from './components/UserDashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/" element={<Homepage />}/>
        <Route path="/homepage" element={<Homepage />}/>
        <Route path="/addproducts" element={<AddProducts />}/>
        <Route path="/productlisting" element={<ProductListing />}/>
        <Route path='/cardpayment' element={<CardPayment />} />
        <Route path='/personaldetails' element={<PersonalDetails />} />
        <Route path='/userdashboard' element={<UserDashboard />} />
      </Routes>
    </div>
  );
}
export default App;

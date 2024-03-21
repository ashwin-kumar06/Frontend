import Login from './components/Login'
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgetPassword';
import CardPayment from './components/CardPayment';
import Homepage from './components/Homepage';
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage />}/>
        <Route path='/cardpayment' element={<CardPayment />} />
      </Routes>
    </div>
  );
}
export default App;

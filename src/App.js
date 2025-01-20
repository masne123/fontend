
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
 import LoginForm from '../src/component/Login/LoginForm';
 import RegisterForm from '../src/component/Register/RegisterForm';
import Dashboard from './component/Dashbord/Dashboard';
import '../src/App.css';
import Footer from './component/Dashbord/Footer';

function App() {
  return (
    <div>
      <Router>
      <Routes>
        {/* Route for Login page */}
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/Footer" element={<Footer/>}/>
        {/* Example: <Route path="/home" element={<Home />} /> */}
      </Routes>
      </Router>
    </div>
  
    
  );
}

export default App;

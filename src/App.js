import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginForm from './component/Login/LoginForm';
import RegisterForm from './component/Register/RegisterForm';
import Dashboard from './component/Dashbord/Dashboard';
import Footer from './component/Dashbord/Footer';
import Sidebar from './component/Dashbord/Sidebar';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Route for Login page */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/footer" element={<Footer />} />
          {/* Other routes can be added here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

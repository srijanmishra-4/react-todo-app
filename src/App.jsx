import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/SignIn/signin';
import Signup from './pages/SignUp/signup';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"; 
import Home from "./pages/Home/home"

function ProtectedRoute({ children }) {
    const token = Cookies.get('token');

    if (!token) {
        return <Navigate to="/signin" />;
    }

    try {
        jwtDecode(token);
        return children;
    } catch (error) {
        return <Navigate to="/signin" />;
    }
}

function NavigateToCorrectPage() {
    const token = Cookies.get('token');

    if (!token) {
        return <Navigate to="/signin" />;
    }

    try {
        const decoded = jwtDecode(token);
        return <Navigate to={`/home/${decoded.uid}`} replace />;
    } catch {
        return <Navigate to="/signin" />;
    }
}

function App() {
    return (
        <Router basename="/react-todo-app">  {/* ✅ Add basename */}
            <Routes>
                <Route path="/" element={<NavigateToCorrectPage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home/:uid" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";




const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();  // Hook for navigation

    const validateEmail = (value) => {
        setEmail(value);
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    };

    const isFormValid = isEmailValid && password;

    const handleSignIn = async (e) => {
        e.preventDefault();
        console.log("Inside the HandleSignIN function");
    
        const response = await fetch('http://192.168.29.244:3000/auth', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        console.log("Auth Complete");
    
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
    
            if (token) {
                console.log("Authenticated");
                Cookies.set("token", token, { expires: 1 }); // Store token in cookie
    
                const decodedToken = jwtDecode(token);
                const uid = decodedToken.uid;
                console.log("JWT Decoded, UID:", uid);
    
                console.log("Before navigating");
                navigate(`/home/${uid}`);
                console.log("After navigating");
            }
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col-reverse md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Don't have an account?
                        <Link to="/signup" className="text-indigo-600 font-medium"> Sign up here</Link>
                    </p>
                    <form className="mt-6" onSubmit={handleSignIn}>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => validateEmail(e.target.value)}
                                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your email"
                            />
                            {isEmailValid && <FontAwesomeIcon icon={faCheck} className="text-green-500 absolute right-10 top-4" />}
                        </div>
                        <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your password"
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="absolute right-3 top-4 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        <button onClick={handleSignIn}
                            className={`w-full mt-10 py-3 rounded-lg font-medium transition ${isFormValid ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                            disabled={!isFormValid}
                        >
                            Sign in
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Illustration"
                        className="max-w-full max-h-80 object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default SigninForm;

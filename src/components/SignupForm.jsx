import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate(); // For redirection

    const validateName = (value) => {
        setName(value.replace(/[^a-zA-Z ]/g, ""));
    };

    const validateEmail = (value) => {
        setEmail(value);
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    };

    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);
        setIsPasswordMatch(password === value && value !== "");
    };

    const isFormValid = name && isEmailValid && password && isPasswordMatch;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = { uname: name, email, password };

        try {
            const response = await fetch("https://react-todo-server-x59m.onrender.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate("/signin"); // Redirect on success
            } else {
                const data = await response.json();
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Illustration"
                        className="max-w-full max-h-80 object-contain"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Already have an account?
                        <Link to="/signin" className="text-indigo-600 font-medium"> Sign in here</Link>
                    </p>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => validateName(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Enter your full name"
                            required
                        />
                        <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => validateEmail(e.target.value)}
                                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your email"
                                required
                            />
                            {isEmailValid && <FontAwesomeIcon icon={faCheck} className="text-green-500 absolute right-3 top-4" />}
                        </div>
                        <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your password"
                                required
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="absolute right-3 top-4 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => validateConfirmPassword(e.target.value)}
                                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Confirm your password"
                                required
                            />
                            {isPasswordMatch && <FontAwesomeIcon icon={faCheck} className="text-green-500 absolute right-10 top-4" />}
                            <FontAwesomeIcon
                                icon={showConfirmPassword ? faEyeSlash : faEye}
                                className="absolute right-3 top-4 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full mt-6 py-3 rounded-lg font-medium transition ${isFormValid ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                            disabled={!isFormValid}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;

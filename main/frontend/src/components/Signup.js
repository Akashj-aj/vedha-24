import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaUniversity } from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush } from 'react-icons/gi';
import { registerUser } from '../services/api';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', email: '', password: '', general: '' });
    const navigate = useNavigate();

    const BackgroundPattern = () => {
        const backgroundIcons = [
            FaUser, FaLock, GiBookshelf, GiPencilBrush, 
            FaUniversity, FaEnvelope, FaLock
        ];

        const elements = Array.from({ length: 100 }).map((_, index) => {
            const isBig = index < 10;
            return {
                id: index,
                Icon: backgroundIcons[index % backgroundIcons.length],
                x: Math.random() * 100,
                y: Math.random() * 100,
                rotation: Math.random() * 360,
                scale: isBig ? (0.8 + Math.random() * 0.4) : (0.3 + Math.random() * 0.5)
            };
        });

        return (
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {elements.map((element) => (
                    <element.Icon
                        key={element.id}
                        style={{
                            position: 'absolute',
                            left: `${element.x}%`,
                            top: `${element.y}%`,
                            transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
                            color: 'rgb(64,81,59)',
                            opacity: 0.15
                        }}
                        className="text-4xl"
                    />
                ))}
            </div>
        );
    };

    const validateInputs = () => {
        const newErrors = {};

        if (!username) newErrors.username = 'Username is required.';
        else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters long.';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) newErrors.email = 'Email is required.';
        else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format.';

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        } else if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({ username: '', email: '', password: '', general: '' });

        if (!validateInputs()) {
            return;
        }

        try {
            await registerUser({ username, email, password });
            navigate('/login');
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data.error;
                const newErrors = { username: '', email: '', password: '', general: '' };

                if (errorData.includes('username')) {
                    newErrors.username = 'Username already exists.';
                }
                if (errorData.includes('email')) {
                    newErrors.email = 'Email already exists.';
                }
                if (!newErrors.username && !newErrors.email) {
                    newErrors.general = 'An unexpected error occurred. Please try again.';
                }

                setErrors(newErrors);
            } else {
                setErrors({ username: '', email: '', password: '', general: 'Network error. Please check your connection.' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] flex items-center justify-center p-6 overflow-hidden relative">
            <BackgroundPattern />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden relative z-10"
            >
                <div className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] p-6 text-center relative">
                    <FaUser className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl" />
                    <h1 className="text-3xl font-bold text-white tracking-wider">
                        Sign Up
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Username Input */}
                    <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* General Error */}
                    {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] text-white font-semibold text-lg rounded-lg hover:bg-green-600 focus:outline-none"
                    >
                        Sign Up
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;

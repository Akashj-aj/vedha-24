import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBook, FaSignInAlt, FaUserPlus, FaUniversity, FaUsers, FaQuestionCircle, FaChalkboardTeacher, FaLeaf } from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush, GiMortar, GiOpenBook } from 'react-icons/gi';

const Home = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const motivationalQuotes = [
        "Learning together is the fastest way to grow.",
        "Every expert was once a beginner who never gave up.",
        "Knowledge shared is knowledge multiplied.",
        "Alone we are smart. Together we are brilliant.",
        "Great things in life are never done by one person; they're done by a team of people.",
    ];

    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const BackgroundPattern = () => {
        const backgroundIcons = [
            FaBook, FaLeaf, GiBookshelf, GiPencilBrush, GiMortar, 
            FaUniversity, GiOpenBook, FaUsers
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

    return (
        <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] relative overflow-hidden">
            <BackgroundPattern />

            <nav className="bg-white/90 backdrop-blur-sm shadow-md fixed top-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <img src="/college-logo.png" alt="College Logo" className="h-10 w-10 mr-3" />
                        <span className="text-xl font-bold text-[rgb(64,81,59)]">Peer Learning</span>
                    </div>
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/" className="text-[rgb(64,81,59)] hover:text-[rgb(96,153,102)] flex items-center">
                            <FaChalkboardTeacher className="mr-2" /> Home
                        </Link>
                        <Link to="/about" className="text-[rgb(64,81,59)] hover:text-[rgb(96,153,102)] flex items-center">
                            <FaQuestionCircle className="mr-2" /> About
                        </Link>
                        <Link to="/signup" className="text-white bg-[rgb(96,153,102)] px-4 py-2 rounded-md hover:bg-[rgb(64,81,59)] flex items-center">
                            <FaUserPlus className="mr-2" /> Sign Up
                        </Link>
                        <Link to="/login" className="text-white bg-[rgb(64,81,59)] px-4 py-2 rounded-md hover:opacity-90 flex items-center">
                            <FaSignInAlt className="mr-2" /> Login
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleNav} className="text-[rgb(64,81,59)] focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                {isNavOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white/90 backdrop-blur-sm shadow-md">
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            <Link to="/" className="block py-2 text-[rgb(64,81,59)] hover:bg-gray-100 flex items-center">
                                <FaChalkboardTeacher className="mr-3" /> Home
                            </Link>
                            <Link to="/about" className="block py-2 text-[rgb(64,81,59)] hover:bg-gray-100 flex items-center">
                                <FaQuestionCircle className="mr-3" /> About
                            </Link>
                            <Link to="/signup" className="block py-2 bg-[rgb(96,153,102)] text-white rounded-md text-center">
                                Sign Up
                            </Link>
                            <Link to="/login" className="block py-2 bg-[rgb(64,81,59)] text-white rounded-md text-center">
                                Login
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            <div className="container mx-auto mt-20 px-4 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-[rgb(64,81,59)]">
                            Welcome to Peer Learning Platform
                        </h1>
                        <p className="text-xl text-gray-700 mb-6">
                            A collaborative learning environment designed to connect students, share knowledge, and boost academic performance through peer-to-peer tutoring.
                        </p>
                        
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg mb-6">
                            <h2 className="text-2xl font-semibold mb-3 text-[rgb(64,81,59)]">
                                Why Peer Learning?
                            </h2>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <FaBook className="mr-3 text-[rgb(96,153,102)]" />
                                    Personalized Learning Experiences
                                </li>
                                <li className="flex items-center">
                                    <FaUsers className="mr-3 text-[rgb(96,153,102)]" />
                                    Collaborative Knowledge Sharing
                                </li>
                                <li className="flex items-center">
                                    <FaUniversity className="mr-3 text-[rgb(96,153,102)]" />
                                    Multi-College Network
                                </li>
                            </ul>
                        </div>

                        <blockquote className="italic text-lg text-[rgb(64,81,59)] border-l-4 border-[rgb(96,153,102)] pl-4 mb-6">
                            "{randomQuote}"
                        </blockquote>

                        <div className="flex space-x-4">
                            <Link 
                                to="/signup" 
                                className="bg-[rgb(96,153,102)] text-white px-6 py-3 rounded-md hover:bg-[rgb(64,81,59)] transition flex items-center"
                            >
                                <FaUserPlus className="mr-2" /> Sign Up
                            </Link>
                            <Link 
                                to="/login" 
                                className="bg-white/90 backdrop-blur-sm text-[rgb(64,81,59)] px-6 py-3 rounded-md hover:bg-gray-200 transition flex items-center"
                            >
                                <FaSignInAlt className="mr-2" /> Login
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-8 text-center"
                        >
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-[rgb(237,241,214)] p-4 rounded-lg">
                                    <FaUsers className="mx-auto text-3xl text-[rgb(64,81,59)] mb-2" />
                                    <h3 className="font-bold text-xl">500+</h3>
                                    <p>Active Learners</p>
                                </div>
                                <div className="bg-[rgb(237,241,214)] p-4 rounded-lg">
                                    <FaBook className="mx-auto text-3xl text-[rgb(64,81,59)] mb-2" />
                                    <h3 className="font-bold text-xl">50+</h3>
                                    <p>Subject Areas</p>
                                </div>
                                <div className="bg-[rgb(237,241,214)] p-4 rounded-lg">
                                    <FaUniversity className="mx-auto text-3xl text-[rgb(64,81,59)] mb-2" />
                                    <h3 className="font-bold text-xl">10+</h3>
                                    <p>Colleges</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
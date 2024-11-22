import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaChalkboardTeacher, 
    FaBook, 
    FaUsers, 
    FaSearch,
    FaBars,
    FaTimes,
    FaComments,
    FaChalkboard,
    FaBookOpen
} from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush, GiMortar, GiOpenBook } from 'react-icons/gi';

// NavLink component from HomePage
const NavLink = ({ Icon, text, to, isActive }) => (
    <Link to={to}>
        <motion.div
            whileHover={{ scale: 1.05, x: 10 }}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-r-xl transition-all ${
                isActive 
                    ? 'bg-white text-[rgb(64,81,59)]' 
                    : 'text-white hover:bg-white/10'
            }`}
        >
            <Icon className="text-xl" />
            <span className="font-medium text-sm">{text}</span>
        </motion.div>
    </Link>
);

// Sample data for created and joined groups (Replace this with actual API calls)
const mockCreatedGroups = [
    { id: 1, name: 'Math Study Group', subject: 'Math', topic: 'Calculus' },
    { id: 2, name: 'History Study Group', subject: 'History', topic: 'World War II' },
];

const mockJoinedGroups = [
    { id: 3, name: 'Physics Study Group', subject: 'Physics', topic: 'Quantum Mechanics' },
    { id: 4, name: 'Literature Study Group', subject: 'Literature', topic: 'Shakespeare' },
];

const ViewYourGroups = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [createdGroups, setCreatedGroups] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [activeNav, setActiveNav] = useState('view-your-groups');
    const navRef = useRef(null);

    useEffect(() => {
        setCreatedGroups(mockCreatedGroups);
        setJoinedGroups(mockJoinedGroups);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target) && 
                !event.target.classList.contains('nav-toggle')) {
                setIsNavOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleGroupClick = (group) => {
        navigate('/study-group-details', {
            state: {
                name: group.name,
                subject: group.subject,
                topic: group.topic
            }
        });
    };

    const BackgroundPattern = () => {
        const backgroundIcons = [
            FaBook, FaUsers, GiBookshelf, GiPencilBrush, GiMortar, 
            FaChalkboardTeacher, GiOpenBook, FaBookOpen
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
        <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] flex items-center justify-center p-6 overflow-hidden relative">
            <BackgroundPattern />

            {/* Navigation Bar */}
            <AnimatePresence>
                {isNavOpen && (
                    <motion.div 
                        ref={navRef}
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="fixed left-4 top-0 h-full w-64 bg-gradient-to-b from-[rgb(96,153,102)] to-[rgb(64,81,59)] shadow-xl z-40 flex flex-col py-6 overflow-y-auto"
                    >
                        <div className="space-y-1">
                            <NavLink Icon={FaBook} text="Home" to="/home" isActive={activeNav === 'home'} />
                            <NavLink Icon={FaChalkboardTeacher} text="Become a Tutor" to="/become-tutor" isActive={activeNav === 'become-tutor'} />
                            <NavLink Icon={FaSearch} text="Find Tutor" to="/find-tutor" isActive={activeNav === 'find-tutor'} />
                            <NavLink Icon={FaUsers} text="Create Study Group" to="/create-study-group" isActive={activeNav === 'create-study-group'} />
                            <NavLink Icon={FaUsers} text="Study Groups" to="/study-groups" isActive={activeNav === 'study-groups'} />
                            <NavLink Icon={FaUsers} text="View Your Groups" to="/view-your-groups" isActive={activeNav === 'view-your-groups'} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                initial={{ x: isNavOpen ? 256 : 0 }}
                animate={{ x: isNavOpen ? 256 : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="fixed left-4 top-6 z-50 bg-white w-12 h-12 rounded-full text-[rgb(64,81,59)] shadow-lg nav-toggle hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center drop-shadow-xl"
            >
                {isNavOpen ? (
                    <FaTimes className="text-xl" />
                ) : (
                    <FaBars className="text-xl" />
                )}
            </motion.button>

            {/* Main Content */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`w-full max-w-4xl bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden relative z-10 ${isNavOpen ? 'ml-64' : 'ml-0'} transition-all duration-500`}
            >
                <div className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] p-6 text-center relative">
                    <FaBook className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl" />
                    <h1 className="text-3xl font-bold text-white tracking-wider">
                        Your Study Groups
                    </h1>
                </div>

                <div className="p-8">
                    {/* Created Groups */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-[rgb(96,153,102)]">Groups You Created</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
                            {createdGroups.map(group => (
                                <motion.div 
                                    key={group.id} 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between space-y-4 cursor-pointer transition-all hover:shadow-xl"
                                    onClick={() => handleGroupClick(group)}
                                >
                                    <div className="text-[rgb(96,153,102)] text-xl font-semibold">
                                        {group.name}
                                    </div>
                                    <div className="text-[rgb(64,81,59)] text-sm">
                                        <strong>Subject:</strong> {group.subject}
                                    </div>
                                    <div className="text-[rgb(64,81,59)] text-sm">
                                        <strong>Topic:</strong> {group.topic}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Joined Groups */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-[rgb(96,153,102)]">Groups You Joined</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
                            {joinedGroups.map(group => (
                                <motion.div 
                                    key={group.id} 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between space-y-4 cursor-pointer transition-all hover:shadow-xl"
                                    onClick={() => handleGroupClick(group)}
                                >
                                    <div className="text-[rgb(96,153,102)] text-xl font-semibold">
                                        {group.name}
                                    </div>
                                    <div className="text-[rgb(64,81,59)] text-sm">
                                        <strong>Subject:</strong> {group.subject}
                                    </div>
                                    <div className="text-[rgb(64,81,59)] text-sm">
                                        <strong>Topic:</strong> {group.topic}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ViewYourGroups;
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
    FaChalkboardTeacher, 
    FaBook, 
    FaUsers, 
    FaSearch,
    FaBars,
    FaTimes,
    FaComments,
    FaChalkboard,
    FaBookOpen,
    FaFileAlt,
    FaClipboardCheck
} from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush, GiMortar, GiOpenBook } from 'react-icons/gi';

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

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeNav, setActiveNav] = useState('home');
    const [isNavOpen, setIsNavOpen] = useState(true);
    const navRef = useRef(null);

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

    const features = [
        {
            name: 'Find Study Group',
            icon: FaBook,
            description: 'Connect with peers studying similar subjects',
            route: '/study-groups'
        },
        {
            name: 'Create Study Group',
            icon: FaComments,
            description: 'Start your own collaborative learning space',
            route: '/create-study-group'
        },
        {
            name: 'View Your Groups',
            icon: FaChalkboard,
            description: 'Manage and track your ongoing study groups',
            route: '/view-your-groups'
        },
        {
            name: 'Find a Tutor',
            icon: FaChalkboardTeacher,
            description: 'Get personalized academic support',
            route: '/find-tutor'
        },
        {
            name: 'Become a Tutor',
            icon: GiPencilBrush,
            description: 'Share your knowledge and help others learn',
            route: '/become-tutor'
        },
        {
            name: 'Career Resources',
            icon: FaFileAlt,
            description: 'Get resume help and career guidance from experts',
            route: '/career-resources'
        },
        {
            name: 'Assignment Feedback',
            icon: FaClipboardCheck,
            description: 'Submit your work and receive detailed feedback',
            route: '/assignment-feedback'
        }
    ];

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
                            <NavLink Icon={FaFileAlt} text="Career Resources" to="/career-resources" isActive={activeNav === 'career-resources'} />
                            <NavLink Icon={FaClipboardCheck} text="Assignment Feedback" to="/assignment-feedback" isActive={activeNav === 'assignment-feedback'} />
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
                    <FaBookOpen className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl" />
                    <h1 className="text-3xl font-bold text-white tracking-wider">
                        Peer Tutoring Platform
                    </h1>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <motion.div
                                key={feature.name}
                                onClick={() => navigate(feature.route)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[rgb(237,241,214)] rounded-2xl p-6 text-center cursor-pointer shadow-md hover:shadow-xl transition-all"
                            >
                                <feature.icon className="mx-auto text-6xl text-[rgb(64,81,59)] mb-4" />
                                <h3 className="text-xl font-semibold text-[rgb(96,153,102)] mb-2">
                                    {feature.name}
                                </h3>
                                <p className="text-[rgb(64,81,59)] text-sm">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HomePage;
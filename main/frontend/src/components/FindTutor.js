import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    FaChalkboardTeacher, 
    FaBook, 
    FaGraduationCap, 
    FaLeaf, 
    FaUniversity, 
    FaHome, 
    FaUsers, 
    FaSearch,
    FaBars,
    FaTimes,
    FaMapMarkerAlt,
    FaBookOpen
} from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush, GiMortar, GiOpenBook } from 'react-icons/gi';
import { Link } from 'react-router-dom';

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

const FindTutor = () => {
    const [subject, setSubject] = useState('');
    const [location, setLocation] = useState('');
    const [availableTutors, setAvailableTutors] = useState([]);
    const [activeNav, setActiveNav] = useState('find-tutor');
    const [isNavOpen, setIsNavOpen] = useState(true);
    const navRef = useRef(null);
    const navigate = useNavigate();

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
            FaBook, FaLeaf, GiBookshelf, GiPencilBrush, GiMortar, 
            FaUniversity, GiOpenBook, FaBookOpen
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

    const handleSearch = (e) => {
        e.preventDefault();

        const tutors = [
            { name: 'John Doe', subject: 'Mathematics', location: 'Room 101' },
            { name: 'Jane Smith', subject: 'Physics', location: 'Room 202' },
            { name: 'Alex Johnson', subject: 'Chemistry', location: 'Room 103' },
        ];

        const filteredTutors = tutors.filter(
            (tutor) =>
                tutor.subject.toLowerCase().includes(subject.toLowerCase()) &&
                tutor.location.toLowerCase().includes(location.toLowerCase())
        );

        setAvailableTutors(filteredTutors);
    };

    return (
        <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] flex items-center justify-center p-6 overflow-hidden relative">
            <BackgroundPattern />

            {/* Left Navigation Bar */}
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
                            <NavLink Icon={FaHome} text="Home" to="/home" isActive={activeNav === 'home'} />
                            <NavLink Icon={FaChalkboardTeacher} text="Become a Tutor" to="/become-tutor" isActive={activeNav === 'become-tutor'} />
                            <NavLink Icon={FaSearch} text="Find Tutor" to="/find-tutor" isActive={activeNav === 'find-tutor'} />
                            <NavLink Icon={FaUsers} text="Create Study Group" to="/create-study-group" isActive={activeNav === 'create-study-group'} />
                            <NavLink Icon={FaUsers} text="Study Groups" to="/study-groups" isActive={activeNav === 'study-groups'} />
                            <NavLink Icon={FaUsers} text="View Your Groups" to="/view-your-groups" isActive={activeNav === 'view-your-groups'} />
                            <NavLink Icon={FaUsers} text="Group Details" to="/group-details" isActive={activeNav === 'group-details'} />
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

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`w-full max-w-2xl bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden relative z-10 font-['Tiempos'] ${isNavOpen ? 'ml-64' : 'ml-0'} transition-all duration-500`}
            >
                <div className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] p-6 text-center relative">
                    <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl" />
                    <h1 className="text-3xl font-bold text-white tracking-wider">Find a Tutor</h1>
                </div>

                <form onSubmit={handleSearch} className="p-8 space-y-6">
                    <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(96,153,102)]">
                            <FaBook className="text-2xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[rgb(157,192,139)] focus:border-[rgb(96,153,102)] focus:ring-2 focus:ring-[rgb(64,81,59)] transition-all text-base"
                        />
                    </motion.div>

                    <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(96,153,102)]">
                            <FaMapMarkerAlt className="text-2xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[rgb(157,192,139)] focus:border-[rgb(96,153,102)] focus:ring-2 focus:ring-[rgb(64,81,59)] transition-all text-base"
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] text-white py-4 rounded-xl hover:opacity-90 transition-all shadow-lg"
                    >
                        Search Tutors
                    </motion.button>

                    {availableTutors.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4 text-[rgb(64,81,59)]">Available Tutors</h2>
                            {availableTutors.map((tutor, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[rgb(237,241,214)] p-4 rounded-xl mb-3 shadow-md"
                                >
                                    <h3 className="font-bold text-[rgb(96,153,102)]">{tutor.name}</h3>
                                    <p className="text-[rgb(64,81,59)]">{tutor.subject} - {tutor.location}</p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default FindTutor;
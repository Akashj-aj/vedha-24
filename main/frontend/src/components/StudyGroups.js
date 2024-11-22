import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaUsers, 
    FaBook, 
    FaBookOpen, 
    FaChalkboardTeacher,
    FaBars,
    FaTimes,
    FaComments,
    FaChalkboard,
    FaSearch
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

const StudyGroups = () => {
    const [studyGroups, setStudyGroups] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
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

    useEffect(() => {
        const fetchStudyGroups = async () => {
            const response = await fetch('http://localhost:5000/study_groups');
            const data = await response.json();
            setStudyGroups(data.study_groups);
        };

        fetchStudyGroups();
    }, []);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
    };

    const handleJoinGroup = async (groupId, groupName, subject, topic) => {
        const response = await fetch(`http://localhost:5000/join_group/${groupId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            navigate('/study-group-details', { 
                state: { 
                    name: groupName, 
                    subject: subject, 
                    topic: topic 
                }
            });
        } else {
            console.error('Failed to join the group');
        }
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
        <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] p-6 flex flex-col items-center relative">
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
                            <NavLink Icon={FaBook} text="Home" to="/home" isActive={location.pathname === '/home'} />
                            <NavLink Icon={FaChalkboardTeacher} text="Become a Tutor" to="/become-tutor" isActive={location.pathname === '/become-tutor'} />
                            <NavLink Icon={FaSearch} text="Find Tutor" to="/find-tutor" isActive={location.pathname === '/find-tutor'} />
                            <NavLink Icon={FaUsers} text="Create Study Group" to="/create-study-group" isActive={location.pathname === '/create-study-group'} />
                            <NavLink Icon={FaUsers} text="Study Groups" to="/study-groups" isActive={location.pathname === '/study-groups'} />
                            <NavLink Icon={FaUsers} text="View Your Groups" to="/view-your-groups" isActive={location.pathname === '/view-your-groups'} />
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
                        Study Groups
                    </h1>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {studyGroups.map(group => (
                            <motion.div 
                                key={group.id} 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between space-y-4 cursor-pointer transition-all hover:shadow-xl"
                                onClick={() => handleJoinGroup(group.id, group.name, group.subject, group.topic)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-xl font-semibold text-[rgb(96,153,102)]">{group.name}</div>
                                    <FaUsers className="text-[rgb(64,81,59)] text-3xl" />
                                </div>
                                <div className="text-[rgb(64,81,59)] text-sm">
                                    <strong>Description:</strong> {group.description}
                                </div>
                                <div className="text-[rgb(64,81,59)] text-sm">
                                    <strong>Subject:</strong> {group.subject}
                                </div>
                                <div className="text-[rgb(64,81,59)] text-sm">
                                    <strong>Topic:</strong> {group.topic}
                                </div>
                                <div className="text-[rgb(64,81,59)] text-sm">
                                    <strong>Scheduled Time:</strong> {formatDateTime(group.scheduled_time)}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] text-white py-2 px-6 rounded-lg shadow-lg mt-4"
                                >
                                    Join
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8 mb-8">
                    <Link to="/create-study-group">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] text-white py-3 px-6 rounded-lg shadow-lg max-w-xs w-full"
                    >
                    Create a New Study Group
                    </motion.button>
                    </Link>
                </div>

            </motion.div>
        </div>
    );
};

export default StudyGroups;
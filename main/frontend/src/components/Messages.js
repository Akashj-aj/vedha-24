import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { io } from 'socket.io-client';
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
    FaComments,
    FaChalkboard,
    FaBookOpen,
    FaPaperPlane
} from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush, GiMortar, GiOpenBook } from 'react-icons/gi';

const socket = io('http://localhost:5000');

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

const Messages = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { groupName } = location.state || {};
    const [activeNav, setActiveNav] = useState('messages');
    const [isNavOpen, setIsNavOpen] = useState(true);
    const navRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
        socket.on('message', (data) => {
            if (data.groupName === groupName) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        });

        return () => {
            socket.off('message');
        };
    }, [groupName]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            const messageData = {
                groupName,
                content: newMessage,
                sender: 'User',
                timestamp: new Date().toISOString(),
            };
            socket.emit('message', messageData);
            setMessages((prevMessages) => [...prevMessages, messageData]);
            setNewMessage('');
        }
    };

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

    if (!groupName) {
        return (
            <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl text-center"
                >
                    <FaComments className="text-4xl text-[rgb(64,81,59)] mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-[rgb(64,81,59)] mb-2">No Group Selected</h1>
                    <p className="text-[rgb(96,153,102)]">Please select a group to start chatting.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] flex items-center justify-center p-6 overflow-hidden relative">
            <BackgroundPattern />

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
                    <FaComments className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl" />
                    <h1 className="text-3xl font-bold text-white tracking-wider">{groupName} Chat</h1>
                </div>

                <div className="p-6 flex flex-col h-[600px]">
                    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] p-4 rounded-2xl shadow-md ${
                                    msg.sender === 'User'
                                        ? 'bg-[rgb(96,153,102)] text-white'
                                        : 'bg-[rgb(237,241,214)] text-[rgb(64,81,59)]'
                                }`}>
                                    <p className="mb-1">{msg.content}</p>
                                    <p className="text-xs opacity-70">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 rounded-xl bg-[rgb(237,241,214)] text-[rgb(64,81,59)] placeholder-[rgb(64,81,59)]/50 focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)]"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={sendMessage}
                            className="px-6 py-3 bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] text-white rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <FaPaperPlane /> Send
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Messages;
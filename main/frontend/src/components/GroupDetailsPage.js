import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBook, FaComments, FaChalkboard, FaBookOpen, FaLeaf, FaUniversity } from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush, GiMortar, GiOpenBook } from 'react-icons/gi';

const GroupDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name, subject, topic } = location.state || {};

    if (!name) {
        return <div>Group not found.</div>;
    }

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

    const handleWhiteboard = () => {
        navigate('/whiteboard', { state: { groupName: name } });
    };

    const handleSendMessage = () => {
        navigate('/messages', { state: { groupName: name } });
    };

    return (
        <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] flex items-center justify-center p-6 overflow-hidden relative">
            <BackgroundPattern />
            
            <div className="absolute top-5 left-5 z-20">
                <img 
                    src="/college-logo.png" 
                    alt="College Logo" 
                    className="w-24 h-auto opacity-90" 
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden relative z-10 font-['Tiempos']"
            >
                <div className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] p-6 text-center relative">
                    <FaBookOpen className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl" />
                    <h1 className="text-3xl font-bold text-white tracking-wider">Study Group Details</h1>
                </div>

                <div className="p-8 space-y-6">
                    <div className="bg-[rgb(237,241,214)] p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold text-[rgb(96,153,102)] mb-4 flex items-center">
                            <FaBook className="mr-3 text-[rgb(64,81,59)]" />
                            {name}
                        </h2>
                        <div className="space-y-2">
                            <p className="text-[rgb(64,81,59)]">
                                <strong>Subject:</strong> {subject}
                            </p>
                            <p className="text-[rgb(64,81,59)]">
                                <strong>Topic:</strong> {topic}
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <motion.button
                            onClick={handleSendMessage}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] text-white py-4 rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center justify-center"
                        >
                            <FaComments className="mr-2" /> Send Message
                        </motion.button>

                        <motion.button
                            onClick={handleWhiteboard}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] text-white py-4 rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center justify-center"
                        >
                            <FaChalkboard className="mr-2" /> Whiteboard
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GroupDetailsPage;
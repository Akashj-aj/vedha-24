import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaBook, FaBookOpen, FaChalkboardTeacher } from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush, GiMortar, GiOpenBook } from 'react-icons/gi';

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
    const [createdGroups, setCreatedGroups] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);

    // Fetch user groups (Replace this with API calls)
    useEffect(() => {
        // In real-world, use an API to fetch created and joined groups
        setCreatedGroups(mockCreatedGroups);
        setJoinedGroups(mockJoinedGroups);
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
        <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] p-6 flex flex-col items-center relative">
            {/* Background Pattern */}
            <BackgroundPattern />

            {/* College Logo Outside Padding (Top Left) */}
            <div className="absolute top-0 left-0 p-4 z-20">
                <img 
                    src={`${process.env.PUBLIC_URL}/college-logo.png`} 
                    alt="College Logo"
                    className="w-20 h-20"
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden relative z-10 p-6"
            >
                <div className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] p-6 text-center relative">
                    <FaBook className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl" />
                    <h1 className="text-3xl font-bold text-white tracking-wider">
                        Your Study Groups
                    </h1>
                </div>

                <div className="p-8">
                    {/* Created Groups */}
                    <div style={{ marginBottom: '30px' }}>
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
                    <div style={{ marginBottom: '30px' }}>
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

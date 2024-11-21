import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaBook, FaBookOpen, FaChalkboardTeacher } from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush, GiMortar, GiOpenBook } from 'react-icons/gi';

const StudyGroups = () => {
    const [studyGroups, setStudyGroups] = useState([]);
    const navigate = useNavigate();

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
            hour12: true, // Use 12-hour format
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
            {/* Background Pattern */}
            <BackgroundPattern />

            {/* College Logo */}
            <div className="absolute top-0 left-0 z-20 p-4">
                <img 
                    src={`${process.env.PUBLIC_URL}/college-logo.png`}  // Use the correct path to your logo
                    alt="College Logo"
                    className="w-20 h-20"  // Adjust the size as needed
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

                <div className="text-center mt-8">
                    <Link to="/create-study-group">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] text-white py-3 px-6 rounded-lg shadow-lg"
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

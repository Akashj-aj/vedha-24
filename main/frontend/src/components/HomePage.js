import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaComments, FaChalkboard, FaBookOpen, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush, GiMortar, GiOpenBook } from 'react-icons/gi';

const HomePage = () => {
    const navigate = useNavigate();

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
        }
    ];

    return (
        <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] flex items-center justify-center p-6 overflow-hidden relative">
            <BackgroundPattern />
            
            {/* Add the college logo in the top left */}
            <div className="absolute top-0 left-0 m-6 z-50">
                <img 
                    src="/college-logo.png"  // Path to the logo image in the public folder
                    alt="College Logo" 
                    className="w-24 h-auto opacity-90" 
                />
            </div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden relative z-10"
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

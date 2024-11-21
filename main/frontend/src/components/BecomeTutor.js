import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaBook, FaGraduationCap, FaLeaf, FaUniversity } from 'react-icons/fa';
import { GiBookshelf, GiPencilBrush, GiMortar, GiOpenBook } from 'react-icons/gi';

const BecomeTutor = () => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`You are now a tutor for ${subject} with the description: ${description}`);
    };

    const BackgroundPattern = () => {
        const backgroundIcons = [
            FaBook, FaLeaf, GiBookshelf, GiPencilBrush, GiMortar, 
            FaUniversity, GiOpenBook, FaGraduationCap
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
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 font-['Tiempos']">
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
            
            <div className="absolute top-5 left-5 z-20 font-['Tiempos']">
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
                className="w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden relative z-10 font-['Tiempos']"
            >
                <div className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] p-6 text-center relative font-['Tiempos']">
                    <FaGraduationCap className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl" />
                    <h1 className="text-3xl font-bold text-white tracking-wider font-['Tiempos']">Become a Tutor</h1>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 font-['Tiempos']">
                    <motion.div 
                        whileFocus={{ scale: 1.02 }}
                        className="relative font-['Tiempos']"
                    >
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(96,153,102)]">
                            <FaChalkboardTeacher className="text-2xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[rgb(157,192,139)] focus:border-[rgb(96,153,102)] focus:ring-2 focus:ring-[rgb(64,81,59)] transition-all font-['Tiempos']"
                        />
                    </motion.div>

                    <motion.div 
                        whileFocus={{ scale: 1.02 }}
                        className="relative font-['Tiempos']"
                    >
                        <div className="absolute left-3 top-4 text-[rgb(96,153,102)]">
                            <FaBook className="text-2xl" />
                        </div>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[rgb(157,192,139)] focus:border-[rgb(96,153,102)] focus:ring-2 focus:ring-[rgb(64,81,59)] transition-all min-h-[150px] resize-y font-['Tiempos']"
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] text-white py-4 rounded-xl hover:opacity-90 transition-all shadow-lg font-['Tiempos']"
                    >
                        Become a Tutor
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default BecomeTutor;
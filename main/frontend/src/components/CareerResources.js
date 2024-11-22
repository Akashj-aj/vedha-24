import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaBriefcase, FaGraduationCap, FaFileUpload } from 'react-icons/fa';

const BackgroundPattern = () => {
    const backgroundIcons = [
        FaFileAlt, FaBriefcase, FaGraduationCap, FaFileUpload
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

const CareerResources = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        career: '',
        message: ''
    });

    const services = [
        { id: 'resume', title: 'Resume Review', icon: FaFileAlt, description: 'Get expert feedback on your resume from industry professionals' },
        { id: 'career', title: 'Career Guidance', icon: FaBriefcase, description: 'One-on-one career counseling sessions with experienced advisors' },
    ];

    const handleServiceSelect = (serviceId) => setSelectedService(serviceId);
    const handleFileUpload = (e) => setFile(e.target.files[0]);
    const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { formData, file, selectedService });
    };

    return (
        <div className="min-h-screen bg-[rgb(237,241,214)] p-6 relative font-['Tiempos']">
            <BackgroundPattern />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden relative z-10"
            >
                <div className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] p-6 text-center">
                    <h1 className="text-3xl font-bold text-white tracking-wider">Career Resources</h1>
                    <p className="text-white/90 mt-2">Get professional guidance for your career journey</p>
                </div>

                <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-8 justify-center">
                {services.map((service) => (
                            <motion.div
                                key={service.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleServiceSelect(service.id)}
                                className={`p-6 rounded-xl cursor-pointer transition-all ${
                                    selectedService === service.id
                                        ? 'bg-[rgb(64,81,59)] text-white'
                                        : 'bg-[rgb(237,241,214)] hover:bg-[rgb(64,81,59)] hover:text-white'
                                }`}
                            >
                                <service.icon className="text-4xl mb-4 mx-auto" />
                                <h3 className="text-xl font-semibold mb-2 text-center">{service.title}</h3>
                                <p className="text-sm text-center">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {selectedService && (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6 bg-[rgb(237,241,214)] p-6 rounded-xl"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)]"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">Current/Desired Career Field</label>
                                <input
                                    type="text"
                                    name="career"
                                    value={formData.career}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)]"
                                />
                            </div>

                            {selectedService === 'resume' && (
                                <div>
                                    <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">Upload Resume (PDF or Word)</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-gray-300 cursor-pointer hover:bg-gray-50">
                                            <FaFileUpload className="text-2xl text-[rgb(96,153,102)]" />
                                            <span className="mt-2 text-sm text-gray-600">
                                                {file ? file.name : 'Select your file'}
                                            </span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">Additional Information</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)]"
                                    placeholder="Tell us more about what you're looking for..."
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-[rgb(96,153,102)] text-white py-3 rounded-lg font-medium hover:bg-[rgb(64,81,59)] transition-colors"
                            >
                                Submit Request
                            </motion.button>
                        </motion.form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default CareerResources;

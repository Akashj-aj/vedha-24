import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { FaPaperPlane, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Connect to the backend
const socket = io('http://localhost:5000');

const Messages = () => {
    const location = useLocation();
    const { groupName } = location.state || {};
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const messageEndRef = useRef(null);
    const textareaRef = useRef(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'inherit';
            const computed = window.getComputedStyle(textarea);
            const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                        + parseInt(computed.getPropertyValue('padding-top'), 10)
                        + textarea.scrollHeight
                        + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                        + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
            
            textarea.style.height = `${Math.min(Math.max(height, 48), 200)}px`;
        }
    };

    useEffect(() => {
        if (!groupName) return;

        socket.emit('join', { group_id: groupName });

        socket.on('message', (data) => {
            if (data.group_id === groupName) {
                setMessages((prev) => [...prev, { 
                    sender: data.sender, 
                    text: data.message, 
                    time: data.time 
                }]);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [groupName]);

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (!message.trim()) return;

        const timestamp = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        socket.emit('message', {
            group_id: groupName,
            message,
            sender: 'You',
            time: timestamp,
        });

        setMessages((prev) => [...prev, { 
            sender: 'You', 
            text: message, 
            time: timestamp 
        }]);
        setMessage('');
        
        if (textareaRef.current) {
            textareaRef.current.style.height = '48px';
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!groupName) {
        return (
            <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos'] flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl text-[rgb(64,81,59)] mb-4">No group selected</h2>
                    <Link 
                        to="/study-groups" 
                        className="text-[rgb(96,153,102)] hover:text-[rgb(64,81,59)] flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Return to Study Groups
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[rgb(237,241,214)] font-['Tiempos']">
            <nav className="bg-white/90 backdrop-blur-sm shadow-md fixed top-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <span className="text-xl font-bold text-[rgb(64,81,59)]">
                        {groupName}
                    </span>
                    <Link 
                        to="/study-groups" 
                        className="text-[rgb(64,81,59)] hover:text-[rgb(96,153,102)] flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto pt-20 px-4 lg:px-8 flex flex-col h-screen">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-grow bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 mb-4 overflow-y-auto"
                >
                    <div className="space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-md px-4 py-2 rounded-lg ${
                                        msg.sender === 'You'
                                            ? 'bg-[rgb(96,153,102)] text-white'
                                            : 'bg-[rgb(237,241,214)] text-[rgb(64,81,59)]'
                                    }`}
                                >
                                    <div className="font-semibold mb-1">{msg.sender}</div>
                                    <div className="break-words">{msg.text}</div>
                                    <div className={`text-xs mt-1 ${
                                        msg.sender === 'You' ? 'text-white/70' : 'text-[rgb(64,81,59)]/70'
                                    }`}>
                                        {msg.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </div>
                </motion.div>

                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 mb-4">
                    <div className="flex flex-col space-y-2">
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={handleMessageChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            className="w-full px-4 py-3 bg-[rgb(237,241,214)]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)] resize-none overflow-hidden"
                            style={{
                                minHeight: '100px',
                                maxHeight: '200px',
                                height: '100px'
                            }}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-[rgb(96,153,102)] text-white py-3 rounded-lg hover:bg-[rgb(64,81,59)] transition flex items-center justify-center gap-2 font-semibold"
                        >
                            <FaPaperPlane /> Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
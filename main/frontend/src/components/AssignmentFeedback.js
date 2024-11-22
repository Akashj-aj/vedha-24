import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FaFileUpload, 
    FaCheckCircle, 
    FaClock, 
    FaHistory,
    FaFileAlt
} from 'react-icons/fa';

const AssignmentFeedback = () => {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        subject: '',
        assignmentType: '',
        dueDate: '',
        instructions: '',
        additionalNotes: ''
    });

    const [previousSubmissions] = useState([
        {
            id: 1,
            subject: 'Mathematics',
            type: 'Problem Set',
            status: 'Reviewed',
            feedback: 'Great work on the calculus problems! Consider showing more steps.',
            submittedDate: '2024-03-15',
            reviewedDate: '2024-03-17'
        },
        {
            id: 2,
            subject: 'Physics',
            type: 'Lab Report',
            status: 'Pending',
            submittedDate: '2024-03-20'
        }
    ]);

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', { formData, file });
    };

    return (
        <div className="min-h-screen bg-[rgb(237,241,214)] p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
            >
                <div className="bg-gradient-to-r from-[rgb(96,153,102)] to-[rgb(64,81,59)] p-6 text-center">
                    <h1 className="text-3xl font-bold text-white tracking-wider">Assignment Feedback</h1>
                    <p className="text-white/90 mt-2">Submit your work and receive detailed feedback from experts</p>
                </div>

                <div className="p-8">
                    {/* New Submission Form */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-[rgb(64,81,59)] mb-6">New Submission</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">
                                        Subject
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)]"
                                        required
                                    >
                                        <option value="">Select Subject</option>
                                        <option value="mathematics">Mathematics</option>
                                        <option value="physics">Physics</option>
                                        <option value="chemistry">Chemistry</option>
                                        <option value="biology">Biology</option>
                                        <option value="english">English</option>
                                        <option value="history">History</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">
                                        Assignment Type
                                    </label>
                                    <select
                                        name="assignmentType"
                                        value={formData.assignmentType}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)]"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="essay">Essay</option>
                                        <option value="problem-set">Problem Set</option>
                                        <option value="lab-report">Lab Report</option>
                                        <option value="presentation">Presentation</option>
                                        <option value="research-paper">Research Paper</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">
                                    Due Date (Optional)
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">
                                    Assignment Instructions
                                </label>
                                <textarea
                                    name="instructions"
                                    value={formData.instructions}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)]"
                                    placeholder="Paste your assignment instructions here..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">
                                    Upload Assignment
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-[rgb(237,241,214)] rounded-lg tracking-wide border border-dashed border-[rgb(96,153,102)] cursor-pointer hover:bg-[rgb(237,241,214)]/80">
                                        <FaFileUpload className="text-3xl text-[rgb(96,153,102)]" />
                                        <span className="text-sm text-[rgb(96,153,102)] mt-2">Click or drag to upload</span>
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            onChange={handleFileUpload} 
                                        />
                                    </label>
                                </div>
                                {file && (
                                    <div className="mt-2 text-[rgb(96,153,102)]">
                                        <FaFileAlt className="inline-block mr-2" />
                                        <span>{file.name}</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[rgb(64,81,59)] mb-2">
                                    Additional Notes (Optional)
                                </label>
                                <textarea
                                    name="additionalNotes"
                                    value={formData.additionalNotes}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(96,153,102)]"
                                    placeholder="Add any additional notes here..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end">
                                <button 
                                    type="submit" 
                                    className="px-6 py-2 bg-[rgb(96,153,102)] text-white rounded-lg hover:bg-[rgb(64,81,59)] transition duration-200"
                                >
                                    Submit Assignment
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Previous Submissions Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[rgb(64,81,59)] mb-6">Previous Submissions</h2>
                        <div className="space-y-4">
                            {previousSubmissions.map(submission => (
                                <div key={submission.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md border border-gray-200">
                                    <div>
                                        <h3 className="text-xl font-semibold">{submission.subject}</h3>
                                        <p className="text-sm text-gray-500">{submission.type} - {submission.status}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        {submission.status === 'Reviewed' ? (
                                            <FaCheckCircle className="text-green-500" />
                                        ) : (
                                            <FaClock className="text-yellow-500" />
                                        )}
                                        <span className="text-sm text-gray-500">{submission.status === 'Reviewed' ? `Reviewed on ${submission.reviewedDate}` : `Submitted on ${submission.submittedDate}`}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AssignmentFeedback;

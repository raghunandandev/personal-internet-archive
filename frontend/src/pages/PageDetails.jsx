import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FaArrowLeft, FaExternalLinkAlt, FaCopy, FaSave, FaTrash } from 'react-icons/fa';

const PageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    // Edit State
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ title: '', notes: '', category: '' });

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const { data } = await api.get(`/pages/${id}`);
                setPage(data);
                setFormData({ title: data.title, notes: data.notes || '', category: data.category });
            } catch (err) {
                console.error("Error fetching page", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await api.put(`/pages/${id}`, formData);
            setPage({ ...page, ...formData });
            setEditMode(false);
            alert("Page updated!");
        } catch (err) {
            alert("Failed to update.");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure?")) return;
        await api.delete(`/pages/${id}`);
        navigate('/dashboard');
    };

    if (loading) return <div className="text-center mt-20">Loading...</div>;
    if (!page) return <div className="text-center mt-20">Page not found.</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

                {/* Toolbar */}
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-black">
                        <FaArrowLeft /> Back
                    </button>
                    <div className="flex gap-3">
                        <button onClick={() => navigator.clipboard.writeText(page.url)} className="text-gray-500 hover:text-blue-600 p-2"><FaCopy size={18} title="Copy Link" /></button>
                        <button onClick={handleDelete} className="text-gray-500 hover:text-red-600 p-2"><FaTrash size={18} title="Delete" /></button>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Screenshot */}
                    <div className="space-y-4">
                        <div className="border rounded-lg overflow-hidden shadow-sm">
                            <img src={page.screenshot} alt="Preview" className="w-full object-contain" />
                        </div>
                        <a href={page.url} target="_blank" rel="noreferrer" className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold flex items-center justify-center gap-2">
                            <FaExternalLinkAlt /> Open Original Page
                        </a>
                    </div>

                    {/* Right: Details & Editing */}
                    <div className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Title</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded font-bold text-lg"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            ) : (
                                <h1 className="text-2xl font-bold text-gray-800 leading-tight">{page.title}</h1>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                />
                            ) : (
                                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 font-medium">{page.category}</span>
                            )}
                        </div>

                        {/* Notes */}
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 h-64 flex flex-col">
                            <label className="block text-xs font-bold text-yellow-600 uppercase mb-2">My Notes</label>
                            {editMode ? (
                                <textarea
                                    className="w-full flex-1 p-2 bg-white border border-yellow-300 rounded resize-none focus:outline-none"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                ></textarea>
                            ) : (
                                <p className="text-gray-700 whitespace-pre-wrap flex-1 overflow-y-auto">
                                    {page.notes || <span className="text-gray-400 italic">No notes added...</span>}
                                </p>
                            )}
                        </div>

                        {/* Edit/Save Buttons */}
                        <div>
                            {editMode ? (
                                <div className="flex gap-2">
                                    <button onClick={handleUpdate} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2">
                                        <FaSave /> Save Changes
                                    </button>
                                    <button onClick={() => setEditMode(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => setEditMode(true)} className="w-full border border-gray-300 py-2 rounded text-gray-600 hover:bg-gray-50 font-medium">
                                    Edit Details
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageDetails;
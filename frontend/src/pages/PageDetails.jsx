// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../api/axios';
// import { FaArrowLeft, FaExternalLinkAlt, FaCopy, FaSave, FaTrash } from 'react-icons/fa';

// const PageDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [page, setPage] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Edit State
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState({ title: '', notes: '', category: '' });

//     useEffect(() => {
//         const fetchPage = async () => {
//             try {
//                 const { data } = await api.get(`/pages/${id}`);
//                 setPage(data);
//                 setFormData({ title: data.title, notes: data.notes || '', category: data.category });
//             } catch (err) {
//                 console.error("Error fetching page", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPage();
//     }, [id]);

//     const handleUpdate = async () => {
//         try {
//             await api.put(`/pages/${id}`, formData);
//             setPage({ ...page, ...formData });
//             setEditMode(false);
//             alert("Page updated!");
//         } catch (err) {
//             alert("Failed to update.");
//         }
//     };

//     const handleDelete = async () => {
//         if (!confirm("Are you sure?")) return;
//         await api.delete(`/pages/${id}`);
//         navigate('/dashboard');
//     };

//     if (loading) return <div className="text-center mt-20">Loading...</div>;
//     if (!page) return <div className="text-center mt-20">Loading...</div>;

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
//             <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

//                 {/* Toolbar */}
//                 <div className="p-4 border-b flex justify-between items-center bg-gray-50">
//                     <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-black">
//                         <FaArrowLeft /> Back
//                     </button>
//                     <div className="flex gap-3">
//                         <button onClick={() => navigator.clipboard.writeText(page.url)} className="text-gray-500 hover:text-blue-600 p-2"><FaCopy size={18} title="Copy Link" /></button>
//                         <button onClick={handleDelete} className="text-gray-500 hover:text-red-600 p-2"><FaTrash size={18} title="Delete" /></button>
//                     </div>
//                 </div>

//                 <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     {/* Left: Screenshot */}
//                     <div className="space-y-4">
//                         <div className="border rounded-lg overflow-hidden shadow-sm">
//                             <img src={page.screenshot} alt="Preview" className="w-full object-contain" />
//                         </div>
//                         <a href={page.url} target="_blank" rel="noreferrer" className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold flex items-center justify-center gap-2">
//                             <FaExternalLinkAlt /> Open Original Page
//                         </a>
//                     </div>

//                     {/* Right: Details & Editing */}
//                     <div className="space-y-6">

//                         {/* Title */}
//                         <div>
//                             <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Title</label>
//                             {editMode ? (
//                                 <input
//                                     type="text"
//                                     className="w-full p-2 border rounded font-bold text-lg"
//                                     value={formData.title}
//                                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                                 />
//                             ) : (
//                                 <h1 className="text-2xl font-bold text-gray-800 leading-tight">{page.title}</h1>
//                             )}
//                         </div>

//                         {/* Category */}
//                         <div>
//                             <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
//                             {editMode ? (
//                                 <input
//                                     type="text"
//                                     className="w-full p-2 border rounded"
//                                     value={formData.category}
//                                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                                 />
//                             ) : (
//                                 <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 font-medium">{page.category}</span>
//                             )}
//                         </div>

//                         {/* Notes */}
//                         <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 h-64 flex flex-col">
//                             <label className="block text-xs font-bold text-yellow-600 uppercase mb-2">My Notes</label>
//                             {editMode ? (
//                                 <textarea
//                                     className="w-full flex-1 p-2 bg-white border border-yellow-300 rounded resize-none focus:outline-none"
//                                     value={formData.notes}
//                                     onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                                 ></textarea>
//                             ) : (
//                                 <p className="text-gray-700 whitespace-pre-wrap flex-1 overflow-y-auto">
//                                     {page.notes || <span className="text-gray-400 italic">No notes added...</span>}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Edit/Save Buttons */}
//                         <div>
//                             {editMode ? (
//                                 <div className="flex gap-2">
//                                     <button onClick={handleUpdate} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2">
//                                         <FaSave /> Save Changes
//                                     </button>
//                                     <button onClick={() => setEditMode(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">
//                                         Cancel
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <button onClick={() => setEditMode(true)} className="w-full border border-gray-300 py-2 rounded text-gray-600 hover:bg-gray-50 font-medium">
//                                     Edit Details
//                                 </button>
//                             )}
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PageDetails;

//-------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FaArrowLeft, FaExternalLinkAlt, FaCopy, FaSave, FaTrash, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const PageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    // Edit State
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ title: '', notes: '', category: '' });

    // Toast Notification State
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const { data } = await api.get(`/pages/${id}`);
                setPage(data);
                setFormData({ title: data.title, notes: data.notes || '', category: data.category });
            } catch (err) {
                console.error("Error fetching page", err);
                showToast("Failed to load page details", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [id]);

    // Helper: Show Toast
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ ...toast, show: false }), 3000);
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/pages/${id}`, formData);
            setPage({ ...page, ...formData });
            setEditMode(false);
            showToast("Page details updated successfully!");
        } catch (err) {
            showToast("Failed to update page.", "error");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this page?")) return;
        try {
            await api.delete(`/pages/${id}`);
            navigate('/dashboard');
        } catch (err) {
            showToast("Failed to delete page.", "error");
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(page.url);
        showToast("Link copied to clipboard!");
    };

    // --- Loading View ---
    if (loading || !page) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
            <p className="text-gray-500 font-medium">Loading details...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8 relative">
            {/* --- Toast Notification Component --- */}
            {toast.show && (
                <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300 animate-fade-in-up ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'
                    }`}>
                    {toast.type === 'error' ? <FaExclamationCircle /> : <FaCheckCircle className="text-green-400" />}
                    <span className="font-medium">{toast.message}</span>
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

                {/* Toolbar */}
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-black font-medium transition-colors">
                        <FaArrowLeft /> Back
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={handleCopyLink}
                            className="text-gray-500 hover:text-blue-600 p-2 transition-colors rounded-full hover:bg-blue-50"
                            title="Copy Link"
                        >
                            <FaCopy size={18} />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-gray-500 hover:text-red-600 p-2 transition-colors rounded-full hover:bg-red-50"
                            title="Delete"
                        >
                            <FaTrash size={18} />
                        </button>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Screenshot */}
                    <div className="space-y-4">
                        <div className="border rounded-lg overflow-hidden shadow-sm bg-gray-100 min-h-[200px] flex items-center justify-center">
                            {page.screenshot ? (
                                <img src={page.screenshot} alt="Preview" className="w-full h-auto object-contain" />
                            ) : (
                                <span className="text-gray-400">No Preview Available</span>
                            )}
                        </div>
                        <a
                            href={page.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-0.5 shadow-md"
                        >
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
                                    className="w-full p-2 border border-blue-300 rounded font-bold text-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                                    className="w-full p-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                />
                            ) : (
                                <span className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 font-medium">
                                    {page.category}
                                </span>
                            )}
                        </div>

                        {/* Notes */}
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 h-64 flex flex-col relative">
                            <label className="block text-xs font-bold text-yellow-600 uppercase mb-2">My Notes</label>
                            {editMode ? (
                                <textarea
                                    className="w-full flex-1 p-2 bg-white border border-yellow-300 rounded resize-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder="Add your thoughts here..."
                                ></textarea>
                            ) : (
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {page.notes || <span className="text-gray-400 italic">No notes added yet...</span>}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Edit/Save Buttons */}
                        <div>
                            {editMode ? (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleUpdate}
                                        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2 transition-colors font-medium shadow-sm"
                                    >
                                        <FaSave /> Save Changes
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="px-6 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="w-full border border-gray-300 py-2 rounded text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all font-medium"
                                >
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
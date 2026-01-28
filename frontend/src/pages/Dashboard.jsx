// import { useEffect, useState, useContext } from 'react';
// import api from '../api/axios';
// import { AuthContext } from '../context/AuthContext';
// import { FaTrash, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';

// const Dashboard = () => {
//     const [pages, setPages] = useState([]);
//     const [search, setSearch] = useState('');
//     const { logout } = useContext(AuthContext);

//     const fetchPages = async () => {
//         try {
//             const { data } = await api.get(`/pages?search=${search}`);
//             setPages(data);
//         } catch (err) {
//             console.error("Failed to fetch pages", err);
//         }
//     };

//     useEffect(() => {
//         fetchPages();
//     }, [search]);

//     const handleDelete = async (id) => {
//         if (!confirm("Are you sure?")) return;
//         await api.delete(`/pages/${id}`);
//         setPages(pages.filter(p => p._id !== id));
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* Header */}
//             <nav className="bg-white shadow p-4 flex justify-between items-center">
//                 <h1 className="text-xl font-bold text-gray-800">My Archive</h1>
//                 <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
//             </nav>

//             <div className="max-w-6xl mx-auto p-6">
//                 {/* Search Bar */}
//                 <div className="mb-8 relative">
//                     <FaSearch className="absolute left-3 top-3 text-gray-400" />
//                     <input
//                         type="text"
//                         placeholder="Search by title or content..."
//                         className="w-full pl-10 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                 </div>

//                 {/* Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {pages.map((page) => (
//                         <div key={page._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
//                             {page.screenshot && (
//                                 <img src={page.screenshot} alt={page.title} className="w-full h-48 object-cover object-top" />
//                             )}
//                             <div className="p-4">
//                                 <h3 className="font-bold text-gray-800 truncate mb-1" title={page.title}>{page.title}</h3>
//                                 <p className="text-xs text-gray-500 mb-4">{new Date(page.savedAt).toLocaleDateString()}</p>

//                                 <div className="flex justify-between mt-4">
//                                     <a href={page.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
//                                         <FaExternalLinkAlt size={12} /> Visit
//                                     </a>
//                                     <button onClick={() => handleDelete(page._id)} className="text-gray-400 hover:text-red-500">
//                                         <FaTrash />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {pages.length === 0 && (
//                     <div className="text-center text-gray-500 mt-10">No pages found. Install the extension to start saving!</div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


import { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { FaTrash, FaExternalLinkAlt, FaSearch, FaCopy } from 'react-icons/fa';

const Dashboard = () => {
    const [pages, setPages] = useState([]);
    const [search, setSearch] = useState('');
    const { logout } = useContext(AuthContext);

    const fetchPages = async () => {
        try {
            const { data } = await api.get(`/pages?search=${search}`);
            setPages(data);
        } catch (err) {
            console.error("Failed to fetch pages", err);
        }
    };

    useEffect(() => {
        fetchPages();
    }, [search]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this page?")) return;
        try {
            await api.delete(`/pages/${id}`);
            setPages(pages.filter(p => p._id !== id));
        } catch (err) {
            alert("Failed to delete page.");
        }
    };

    const handleCopy = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!"); // Simple feedback
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    🗂️ Personal Archive
                </h1>
                <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 font-semibold border border-red-100 px-3 py-1 rounded hover:bg-red-50">
                    Logout
                </button>
            </nav>

            <div className="max-w-6xl mx-auto p-6">
                {/* Search Bar */}
                <div className="mb-8 relative">
                    <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search your saved pages..."
                        className="w-full pl-10 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pages.map((page) => (
                        <div key={page._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">

                            {/* Screenshot Area */}
                            {/* <div className="relative h-48 bg-gray-200 group">
                                {page.screenshot ? (
                                    <img src={page.screenshot} alt={page.title} className="w-full h-full object-cover object-top" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Preview</div>
                                )}
                                
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
                            </div> */}
                            {/* Screenshot Area */}
                            <div className="relative h-48 bg-gray-200 group">
                                {page.screenshot ? (
                                    <img
                                        src={page.screenshot}
                                        alt={page.title}
                                        className="w-full h-full object-cover object-top"
                                        onError={(e) => { e.target.style.display = 'none'; }} // Hide if broken
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Preview
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="font-bold text-gray-800 truncate mb-1 text-lg" title={page.title}>
                                    {page.title || "Untitled Page"}
                                </h3>
                                <p className="text-xs text-gray-500 mb-4">
                                    Saved on {new Date(page.savedAt).toLocaleDateString()}
                                </p>

                                {/* Action Buttons */}
                                <div className="mt-auto flex justify-between items-center border-t pt-4">

                                    {/* Left Group: Visit & Copy */}
                                    <div className="flex gap-3">
                                        <a
                                            href={page.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
                                            title="Open Original URL"
                                        >
                                            <FaExternalLinkAlt size={12} /> Open
                                        </a>

                                        <button
                                            onClick={() => handleCopy(page.url)}
                                            className="text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium"
                                            title="Copy URL"
                                        >
                                            <FaCopy size={12} /> Copy
                                        </button>
                                    </div>

                                    {/* Right Group: Delete */}
                                    <button
                                        onClick={() => handleDelete(page._id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        title="Delete Page"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {pages.length === 0 && (
                    <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
                        <p className="text-xl font-semibold">No pages saved yet.</p>
                        <p className="text-sm mt-2">Install the extension and click "Save" to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
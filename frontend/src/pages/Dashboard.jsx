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


// import { useEffect, useState, useContext } from 'react';
// import api from '../api/axios';
// import { AuthContext } from '../context/AuthContext';
// import { FaTrash, FaExternalLinkAlt, FaSearch, FaCopy } from 'react-icons/fa';

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
//         if (!confirm("Are you sure you want to delete this page?")) return;
//         try {
//             await api.delete(`/pages/${id}`);
//             setPages(pages.filter(p => p._id !== id));
//         } catch (err) {
//             alert("Failed to delete page.");
//         }
//     };

//     const handleCopy = async (url) => {
//         try {
//             await navigator.clipboard.writeText(url);
//             alert("Link copied to clipboard!"); // Simple feedback
//         } catch (err) {
//             console.error("Failed to copy: ", err);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* Header */}
//             <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
//                 <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                     🗂️ Personal Archive
//                 </h1>
//                 <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 font-semibold border border-red-100 px-3 py-1 rounded hover:bg-red-50">
//                     Logout
//                 </button>
//             </nav>

//             <div className="max-w-6xl mx-auto p-6">
//                 {/* Search Bar */}
//                 <div className="mb-8 relative">
//                     <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
//                     <input
//                         type="text"
//                         placeholder="Search your saved pages..."
//                         className="w-full pl-10 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                 </div>

//                 {/* Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {pages.map((page) => (
//                         <div key={page._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">

//                             {/* Screenshot Area */}
//                             {/* <div className="relative h-48 bg-gray-200 group">
//                                 {page.screenshot ? (
//                                     <img src={page.screenshot} alt={page.title} className="w-full h-full object-cover object-top" />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center text-gray-400">No Preview</div>
//                                 )}
                                
//                                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
//                             </div> */}
//                             {/* Screenshot Area */}
//                             <div className="relative h-48 bg-gray-200 group">
//                                 {page.screenshot ? (
//                                     <img
//                                         src={page.screenshot}
//                                         alt={page.title}
//                                         className="w-full h-full object-cover object-top"
//                                         onError={(e) => { e.target.style.display = 'none'; }} // Hide if broken
//                                     />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center text-gray-400">
//                                         No Preview
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Content Area */}
//                             <div className="p-4 flex-1 flex flex-col">
//                                 <h3 className="font-bold text-gray-800 truncate mb-1 text-lg" title={page.title}>
//                                     {page.title || "Untitled Page"}
//                                 </h3>
//                                 <p className="text-xs text-gray-500 mb-4">
//                                     Saved on {new Date(page.savedAt).toLocaleDateString()}
//                                 </p>

//                                 {/* Action Buttons */}
//                                 <div className="mt-auto flex justify-between items-center border-t pt-4">

//                                     {/* Left Group: Visit & Copy */}
//                                     <div className="flex gap-3">
//                                         <a
//                                             href={page.url}
//                                             target="_blank"
//                                             rel="noreferrer"
//                                             className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
//                                             title="Open Original URL"
//                                         >
//                                             <FaExternalLinkAlt size={12} /> Open
//                                         </a>

//                                         <button
//                                             onClick={() => handleCopy(page.url)}
//                                             className="text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium"
//                                             title="Copy URL"
//                                         >
//                                             <FaCopy size={12} /> Copy
//                                         </button>
//                                     </div>

//                                     {/* Right Group: Delete */}
//                                     <button
//                                         onClick={() => handleDelete(page._id)}
//                                         className="text-gray-400 hover:text-red-500 transition-colors p-1"
//                                         title="Delete Page"
//                                     >
//                                         <FaTrash size={14} />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {pages.length === 0 && (
//                     <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
//                         <p className="text-xl font-semibold">No pages saved yet.</p>
//                         <p className="text-sm mt-2">Install the extension and click "Save" to get started!</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


// import { useEffect, useState, useContext } from 'react';
// import api from '../api/axios';
// import { AuthContext } from '../context/AuthContext';
// import { FaTrash, FaExternalLinkAlt, FaSearch, FaCopy, FaFolder, FaArrowLeft } from 'react-icons/fa';

// const Dashboard = () => {
//     const [pages, setPages] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null); // Null = Show Categories, String = Show Pages
//     const [search, setSearch] = useState('');
//     const { logout } = useContext(AuthContext);

//     // 1. Fetch Categories on Load
//     const fetchCategories = async () => {
//         try {
//             const { data } = await api.get('/pages/categories');
//             setCategories(data.length > 0 ? data : ['General']);
//         } catch (err) {
//             console.error("Failed to fetch categories");
//         }
//     };

//     // 2. Fetch Pages (Filtered by Category if selected)
//     const fetchPages = async () => {
//         try {
//             // If we are searching, we ignore category folders and search everything
//             // If a category is selected, we filter by it
//             let url = `/pages?search=${search}`;
//             const { data } = await api.get(url);

//             if (selectedCategory) {
//                 setPages(data.filter(p => p.category === selectedCategory));
//             } else {
//                 setPages(data);
//             }
//         } catch (err) {
//             console.error("Failed to fetch pages");
//         }
//     };

//     useEffect(() => { fetchCategories(); }, []);
//     useEffect(() => { fetchPages(); }, [search, selectedCategory]);

//     // Handle Search: If user types, switch to "All Pages" view automatically
//     const handleSearch = (e) => {
//         setSearch(e.target.value);
//         if (e.target.value) setSelectedCategory(null);
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
//                 <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">🗂️ Personal Archive</h1>
//                 <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 font-semibold px-3 py-1 border border-red-100 rounded">Logout</button>
//             </nav>

//             <div className="max-w-6xl mx-auto p-6">
//                 {/* Controls */}
//                 <div className="mb-8 flex gap-4">
//                     {/* Back Button (Only visible inside a category) */}
//                     {selectedCategory && (
//                         <button
//                             onClick={() => setSelectedCategory(null)}
//                             className="flex items-center gap-2 px-4 py-2 bg-white border rounded hover:bg-gray-50 text-gray-700"
//                         >
//                             <FaArrowLeft /> Back to Folders
//                         </button>
//                     )}

//                     {/* Search Bar */}
//                     <div className="relative flex-1">
//                         <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search across all categories..."
//                             className="w-full pl-10 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
//                             value={search}
//                             onChange={handleSearch}
//                         />
//                     </div>
//                 </div>

//                 {/* VIEW 1: CATEGORY CARDS (Show if no search & no category selected) */}
//                 {!selectedCategory && !search && (
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                         {categories.map((cat) => (
//                             <div
//                                 key={cat}
//                                 onClick={() => setSelectedCategory(cat)}
//                                 className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col items-center justify-center border border-gray-100 group"
//                             >
//                                 <FaFolder className="text-6xl text-blue-200 group-hover:text-blue-400 transition mb-3" />
//                                 <h3 className="font-bold text-lg text-gray-700">{cat}</h3>
//                                 <span className="text-xs text-gray-400 mt-1">Click to view pages</span>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* VIEW 2: PAGE GRID (Show if searching OR category selected) */}
//                 {(selectedCategory || search) && (
//                     <div>
//                         {selectedCategory && <h2 className="text-2xl font-bold mb-6 text-gray-800">📂 {selectedCategory}</h2>}

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {pages.map((page) => (
//                                 <div key={page._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
//                                     {/* Screenshot */}
//                                     <div className="relative h-48 bg-gray-200">
//                                         {page.screenshot ? (
//                                             <img src={page.screenshot} alt={page.title} className="w-full h-full object-cover object-top" />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center text-gray-400">No Preview</div>
//                                         )}
//                                         <span className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
//                                             {page.category}
//                                         </span>
//                                     </div>

//                                     {/* Content */}
//                                     <div className="p-4 flex-1 flex flex-col">
//                                         <h3 className="font-bold text-gray-800 truncate mb-1 text-lg">{page.title}</h3>
//                                         <p className="text-xs text-gray-500 mb-4">{new Date(page.savedAt).toLocaleDateString()}</p>
//                                         <div className="mt-auto flex justify-between items-center border-t pt-4">
//                                             <div className="flex gap-3">
//                                                 <a href={page.url} target="_blank" rel="noreferrer" className="text-blue-600 flex items-center gap-1 text-sm font-medium"><FaExternalLinkAlt size={12} /> Open</a>
//                                                 <button onClick={() => navigator.clipboard.writeText(page.url)} className="text-gray-500 flex items-center gap-1 text-sm font-medium"><FaCopy size={12} /> Copy</button>
//                                             </div>
//                                             <button onClick={async () => {
//                                                 if (!confirm("Delete?")) return;
//                                                 await api.delete(`/pages/${page._id}`);
//                                                 setPages(pages.filter(p => p._id !== page._id));
//                                             }} className="text-gray-400 hover:text-red-500"><FaTrash size={14} /></button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         {pages.length === 0 && <p className="text-center text-gray-500 mt-10">No pages found in this category.</p>}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

//-----------------------------------------------------------------------...............>>>>>>>>>>>>>>>
// import { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom'; // <--- Import useNavigate
// import api from '../api/axios';
// import { AuthContext } from '../context/AuthContext';
// import { FaTrash, FaExternalLinkAlt, FaSearch, FaCopy, FaFolder, FaArrowLeft } from 'react-icons/fa';

// const Dashboard = () => {
//     const [pages, setPages] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null); // Null = Show Categories, String = Show Pages
//     const [search, setSearch] = useState('');
    
//     const { logout } = useContext(AuthContext);
//     const navigate = useNavigate(); // <--- Initialize Hook

//     // 1. Fetch Categories on Load
//     const fetchCategories = async () => {
//         try {
//             const { data } = await api.get('/pages/categories');
//             setCategories(data.length > 0 ? data : ['General']);
//         } catch (err) {
//             console.error("Failed to fetch categories");
//         }
//     };

//     // 2. Fetch Pages (Filtered by Category if selected)
//     const fetchPages = async () => {
//         try {
//             let url = `/pages?search=${search}`;
//             const { data } = await api.get(url);

//             if (selectedCategory) {
//                 setPages(data.filter(p => p.category === selectedCategory));
//             } else {
//                 //setPages(data);
//             }
//         } catch (err) {
//             console.error("Failed to fetch pages");
//         }
//     };

//     const handleLogout = () => {
//         logout();       // Clear the user state
//         navigate('/');  // Force redirect to Home Page
//     };

//     useEffect(() => { fetchCategories(); }, []);
//     useEffect(() => { fetchPages(); }, [search, selectedCategory]);

//     // Handle Search: If user types, switch to "All Pages" view automatically
//     const handleSearch = (e) => {
//         setSearch(e.target.value);
//         if (e.target.value) setSelectedCategory(null);
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
//                 <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">🗂️ Personal Archive</h1>
//                 <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-semibold px-3 py-1 border border-red-100 rounded">Logout</button>
//             </nav>

//             <div className="max-w-6xl mx-auto p-6">
//                 {/* Controls */}
//                 <div className="mb-8 flex gap-4">
//                     {/* Back Button (Only visible inside a category) */}
//                     {selectedCategory && (
//                         <button
//                             onClick={() => {
//                                 setSelectedCategory(null);
//                                 setPages([]);
//                             }
//                                  // Clear pages to show categories view
//                             } 
//                             className="flex items-center gap-2 px-4 py-2 bg-white border rounded hover:bg-gray-50 text-gray-700"
//                         >
//                             <FaArrowLeft /> Back to Folders
//                         </button>
//                     )}

//                     {/* Search Bar */}
//                     <div className="relative flex-1">
//                         <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search across all categories..."
//                             className="w-full pl-10 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
//                             value={search}
//                             onChange={handleSearch}
//                         />
//                     </div>
//                 </div>

//                 {/* VIEW 1: CATEGORY CARDS (Show if no search & no category selected) */}
//                 {!selectedCategory && !search && (
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                         {categories.map((cat) => (
//                             <div
//                                 key={cat}
//                                 onClick={() => setSelectedCategory(cat)}
//                                 className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col items-center justify-center border border-gray-100 group"
//                             >
//                                 <FaFolder className="text-6xl text-blue-200 group-hover:text-blue-400 transition mb-3" />
//                                 <h3 className="font-bold text-lg text-gray-700">{cat}</h3>
//                                 <span className="text-xs text-gray-400 mt-1">Click to view pages</span>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* VIEW 2: PAGE GRID (Show if searching OR category selected) */}
//                 {(selectedCategory || search) && (
//                     <div>
//                         {selectedCategory && <h2 className="text-2xl font-bold mb-6 text-gray-800">📂 {selectedCategory}</h2>}

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {pages.map((page) => (
//                                 <div key={page._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group">

//                                     {/* --- UPDATED: Screenshot Area (Clickable) --- */}
//                                     <div
//                                         onClick={() => navigate(`/pages/${page._id}`)} // Navigate on click
//                                         className="relative h-48 bg-gray-200 cursor-pointer"
//                                     >
//                                         {page.screenshot ? (
//                                             <img src={page.screenshot} alt={page.title} className="w-full h-full object-cover object-top" />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center text-gray-400">No Preview</div>
//                                         )}
//                                         <span className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded pointer-events-none">
//                                             {page.category}
//                                         </span>
//                                         {/* Hover Overlay */}
//                                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
//                                             <span className="opacity-0 group-hover:opacity-100 bg-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition">View Details</span>
//                                         </div>
//                                     </div>

//                                     {/* Content */}
//                                     <div className="p-4 flex-1 flex flex-col">
//                                         {/* --- UPDATED: Title (Clickable) --- */}
//                                         <h3
//                                             onClick={() => navigate(`/pages/${page._id}`)}
//                                             className="font-bold text-gray-800 truncate mb-1 text-lg cursor-pointer hover:text-blue-600 transition-colors"
//                                             title={page.title}
//                                         >
//                                             {page.title}
//                                         </h3>

//                                         <p className="text-xs text-gray-500 mb-4">{new Date(page.savedAt).toLocaleDateString()}</p>

//                                         <div className="mt-auto flex justify-between items-center border-t pt-4">
//                                             <div className="flex gap-3">
//                                                 <a href={page.url} target="_blank" rel="noreferrer" className="text-blue-600 flex items-center gap-1 text-sm font-medium"><FaExternalLinkAlt size={12} /> Open</a>
//                                                 <button onClick={() => navigator.clipboard.writeText(page.url)} className="text-gray-500 flex items-center gap-1 text-sm font-medium hover:text-gray-800"><FaCopy size={12} /> Copy</button>
//                                             </div>
//                                             <button onClick={async (e) => {
//                                                 e.stopPropagation(); // Prevent card click
//                                                 if (!confirm("Delete this page?")) return;
//                                                 await api.delete(`/pages/${page._id}`);
//                                                 setPages(pages.filter(p => p._id !== page._id));
//                                             }} className="text-gray-400 hover:text-red-500"><FaTrash size={14} /></button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         {pages.length === 0 && <p className="text-center text-gray-500 mt-10">No pages saved yet.</p>}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

//----------------------------- FINAL VERSION with Details Page Navigation ----------------------------->>>>>>>>>>>>>>>>

import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { FaTrash, FaExternalLinkAlt, FaSearch, FaCopy, FaFolder, FaArrowLeft, FaSpinner } from 'react-icons/fa';

const Dashboard = () => {
    const [pages, setPages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true); // <--- FIX 1: Loading State

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // 1. Fetch Categories on Load
    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/pages/categories');
            // Ensure unique categories
            const uniqueCats = [...new Set(data)];
            setCategories(uniqueCats.length > 0 ? uniqueCats : ['General']);
        } catch (err) {
            console.error("Failed to fetch categories");
        }
    };

    // 2. Fetch Pages (Filtered by Category if selected)
    const fetchPages = async () => {
        setLoading(true); // Start loading
        try {
            let url = `/pages?search=${search}`;
            const { data } = await api.get(url);

            if (selectedCategory) {
                setPages(data.filter(p => p.category === selectedCategory));
            } else {
                setPages(data); // <--- FIX 2: Critical Fix (Uncommented)
            }
        } catch (err) {
            console.error("Failed to fetch pages");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Stop card click event
        if (!confirm("Delete this page?")) return;

        // Optimistic UI Update (Remove immediately for speed)
        setPages(prev => prev.filter(p => p._id !== id));

        try {
            await api.delete(`/pages/${id}`);
        } catch (err) {
            alert("Failed to delete.");
            fetchPages(); // Revert if failed
        }
    };

    const handleCopy = (e, url) => {
        e.stopPropagation(); // Stop card click event
        navigator.clipboard.writeText(url);
        // You could add a toast notification here
    };

    useEffect(() => { fetchCategories(); }, []);
    useEffect(() => { fetchPages(); }, [search, selectedCategory]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value) setSelectedCategory(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 pb-10">
            {/* Header */}
            <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-20">
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    🗂️ Personal Archive
                </h1>
                <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-semibold px-3 py-1 border border-red-100 rounded transition-colors">
                    Logout
                </button>
            </nav>

            <div className="max-w-7xl mx-auto p-6">
                {/* Controls Bar */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Back Button */}
                    {selectedCategory && (
                        <button
                            onClick={() => {
                                setSelectedCategory(null);
                                setSearch(''); // Optional: Clear search when going back
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                        >
                            <FaArrowLeft /> Back to Folders
                        </button>
                    )}

                    {/* Search Input */}
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title, content, or notes..."
                            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                {/* --- CONTENT AREA --- */}

                {/* 1. Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center mt-20">
                        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
                        <p className="text-gray-500">Loading your archive...</p>
                    </div>
                ) : (
                    <>
                        {/* 2. Folder View (Show if no search & no category selected) */}
                        {!selectedCategory && !search && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Collections</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col items-center justify-center border border-gray-200 group"
                                        >
                                            <FaFolder className="text-5xl text-blue-200 group-hover:text-blue-400 transition mb-3" />
                                            <h3 className="font-bold text-gray-700 text-center truncate w-full">{cat}</h3>
                                            <span className="text-xs text-gray-400 mt-1">Open Folder</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 3. Page Grid View (Show if searching OR category selected) */}
                        {(selectedCategory || search) && (
                            <div className="animate-fade-in">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {selectedCategory ? `📂 ${selectedCategory}` : `🔍 Search Results: "${search}"`}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {pages.map((page) => (
                                        <div
                                            key={page._id}
                                            onClick={() => navigate(`/pages/${page._id}`)}
                                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer h-[320px]"
                                        >
                                            {/* Screenshot */}
                                            <div className="relative h-40 bg-gray-100 border-b border-gray-100">
                                                {page.screenshot ? (
                                                    <img
                                                        src={page.screenshot}
                                                        alt={page.title}
                                                        className="w-full h-full object-cover object-top"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                                        <span className="text-4xl">📄</span>
                                                        <span className="text-xs mt-2">No Preview</span>
                                                    </div>
                                                )}

                                                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-semibold">
                                                    {page.category}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-bold text-gray-800 text-lg leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors" title={page.title}>
                                                        {page.title || "Untitled Page"}
                                                    </h3>
                                                    <p className="text-xs text-gray-400 mb-2">
                                                        Saved {new Date(page.savedAt).toLocaleDateString()}
                                                    </p>
                                                </div>

                                                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                                                    <div className="flex gap-2">
                                                        <a
                                                            href={page.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-gray-500 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded transition"
                                                            title="Open Link"
                                                        >
                                                            <FaExternalLinkAlt size={14} />
                                                        </a>
                                                        <button
                                                            onClick={(e) => handleCopy(e, page.url)}
                                                            className="text-gray-500 hover:text-green-600 p-1.5 hover:bg-green-50 rounded transition"
                                                            title="Copy Link"
                                                        >
                                                            <FaCopy size={14} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={(e) => handleDelete(e, page._id)}
                                                        className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded transition"
                                                        title="Delete"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Empty State (Only shows if NOT loading and NO pages) */}
                                {pages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                                        <FaFolder className="text-6xl mb-4 text-gray-200" />
                                        <p className="text-xl">No pages found.</p>
                                        <button
                                            onClick={() => { setSearch(''); setSelectedCategory(null) }}
                                            className="mt-4 text-blue-500 hover:underline font-medium"
                                        >
                                            Clear filters & View All
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
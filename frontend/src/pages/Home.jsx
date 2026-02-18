import { useNavigate } from 'react-router-dom';
import { FaBolt, FaSearch, FaImage, FaTags, FaShieldAlt, FaCloud } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* --- Navbar --- */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            A
                        </div>
                        <span className="font-bold text-xl text-gray-800 tracking-tight">Personal Archive</span>
                    </div>
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <header className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                        v1.0 Now Available
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                        Stop losing useful <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            web pages to broken links.
                        </span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto mb-10">
                        Save articles, tutorials, and inspiration with one click. We archive the text, screenshot, and metadata so you have it forever, even if the original site goes down.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
                        >
                            Get Started for Free
                        </button>
                        <a
                            href="https://chrome.google.com/webstore"
                            target="_blank"
                            rel="noreferrer"
                            className="px-8 py-4 text-lg font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                        >
                            <img src="/logo.svg" className="w-5 h-5" alt="" onError={(e) => e.target.style.display = 'none'} />
                            Get Extension
                        </a>
                    </div>
                </div>

                {/* Decorative Background Blur */}
                <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </header>

            {/* --- Features Grid --- */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to remember the web.</h2>
                        <p className="text-gray-500">Powerful tools built for researchers, developers, and collectors.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                <FaImage />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Visual Snapshots</h3>
                            <p className="text-gray-500 leading-relaxed">
                                We take a high-res screenshot of every page you save. Even if the content changes or disappears, you'll see exactly what you saw.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                <FaSearch />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Full-Text Search</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Stop bookmarking and forgetting. We index the text content of every saved page so you can find it instantly later.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                <FaTags />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Organization</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Organize with Categories and Notes. Keep your research projects, job applications, and reading lists perfectly sorted.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="font-bold text-white text-lg">Personal Archive</span>
                        <p className="text-sm text-gray-500 mt-1">© 2026. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition">Privacy</a>
                        <a href="#" className="hover:text-white transition">Terms</a>
                        <a href="#" className="hover:text-white transition">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
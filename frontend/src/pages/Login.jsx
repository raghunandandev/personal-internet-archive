import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const handleGoogleLogin = () => {
        // Redirect browser to Backend Auth Endpoint
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-10 rounded-xl shadow-2xl text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Personal Archive</h1>
                <p className="text-gray-400 mb-8">Save the web forever.</p>

                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition w-full"
                >
                    <FaGoogle />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
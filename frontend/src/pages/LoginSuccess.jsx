// import { useEffect, useContext } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const LoginSuccess = () => {
//     const [searchParams] = useSearchParams();
//     const { setUser } = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = searchParams.get('token');
//         if (token) {
//             localStorage.setItem('token', token); // Save for API calls
//             setUser({ token });
//             navigate('/dashboard');
//         } else {
//             navigate('/login');
//         }
//     }, []);

//     return <div className="text-center mt-20 text-xl">Logging you in...</div>;
// };

// export default LoginSuccess;

import { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginSuccess = () => {
    const [searchParams] = useSearchParams();
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // 1. Save to React LocalStorage (for the Dashboard)
            localStorage.setItem('token', token);
            setUser({ token });

            // 2. WAIT before navigating! 
            // This gives the Chrome Extension time to read the URL.
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // 2 second delay
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Login Successful!</h2>
                <p className="text-gray-600">Syncing with extension...</p>
                <p className="text-sm text-gray-400 mt-4">(Redirecting in 2 seconds)</p>
            </div>
        </div>
    );
};

export default LoginSuccess;
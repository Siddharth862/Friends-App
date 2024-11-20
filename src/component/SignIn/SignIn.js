import React, { useEffect } from 'react';
import { useSignInWithGoogle, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase'; // Ensure this path is correct
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './WhatsApp.svg.png';

const SignIn = () => {
  const [user] = useAuthState(auth);
  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth); // Add error/loader handling
  const location = useLocation();
  const navigate = useNavigate();
  const dest = location.state?.from || '/';

  useEffect(() => {
    if (user) {
      navigate(dest);
    }
  }, [user, navigate, dest]);

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100">
      <div>
        <img src={logo} alt="WhatsApp Logo" className="w-40 h-40" />
      </div>
      <div>
        <button
          onClick={async () => {
            try {
              await signInWithGoogle();
            } catch (err) {
              console.error('Error during sign-in:', err);
            }
          }}
          className="mx-auto px-8 py-2 border-2 border-gray-800 rounded-lg mt-10 
            hover:bg-orange-500 hover:text-white transition-colors duration-200"
        >
          Sign in with Google
        </button>
        {loading && <p className="mt-2 text-sm text-gray-600">Signing in...</p>}
        {error && <p className="mt-2 text-sm text-red-500">Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default SignIn;

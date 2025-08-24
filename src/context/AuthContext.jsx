import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { trackUserSignup, trackUserLogin } from '../utils/analytics';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsub;
    try {
      unsub = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });
    } catch (e) {
      console.error('Auth state listener error', e);
      setError(e);
      setLoading(false);
    }
    return () => { if (unsub) unsub(); };
  }, []);

  const signup = async (email, password, displayName) => {
    setError(null);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      try {
        await updateProfile(cred.user, { displayName });
      } catch {
        // ignore profile update errors
      }
    }
    // Track successful signup
    trackUserSignup();
    return cred.user;
  };

  const login = async (email, password) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      // Track successful login
      trackUserLogin();
      return cred;
    } catch (err) {
      setError(err);
      throw err;
    }
  };
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const value = { user, loading, error, signup, login, logout, resetPassword };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading...</p>
            {error && <p className="text-xs text-red-500">{error.message}</p>}
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('')

    const socialAuth = async (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => {
            unSubscribe()
        }
    }, [])

    const authData = {
        socialAuth,
        createUser,
        signInUser,
        logoutUser,
        updateUserProfile,
        resetPassword,
        setUser,
        setEmail,
        user,
        loading,
        email
    }

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.array.isRequired
}

export default AuthProvider;
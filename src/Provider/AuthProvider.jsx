import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState()
    const [topMovies, setTopMovies] = useState()

    useEffect(() => {
        fetch('https://film-fusion-0.vercel.app/movies')
            .then(res => res.json())
            .then(data => {
                setMovies(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://film-fusion-0.vercel.app/topMovies')
            .then(res => res.json())
            .then(result => {
                setTopMovies(result)
            })
    }, [])


    const socialAuth = async (provider) => {
        setLoading(true)
        try {
            await signInWithPopup(auth, provider);
            Navigate(location.state ? location.state : '/')
            toast.success("Login Successful.");
        } catch (error) {
            if (error.code === "auth/account-exists-with-different-credential") {
                toast.error("User already exists!");
            }
        }
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
        setLoading(true)
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
        setMovies,
        setTopMovies,
        topMovies,
        user,
        loading,
        movies
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
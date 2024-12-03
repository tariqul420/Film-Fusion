import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase";
import { toast } from "react-toastify";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const socialAuth = async (provider) => {
        setLoading(true)
        try {
            await signInWithPopup(auth, provider);
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

    const updateProfile = (updatedData) => {
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
        updateProfile,
        resetPassword,
        setUser,
        user,
        loading
    }

    return (
        <AuthProvider.prototype value={authData}>
            {children}
        </AuthProvider.prototype>
    );
};

export default AuthProvider;
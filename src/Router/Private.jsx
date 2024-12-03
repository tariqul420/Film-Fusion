import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ScaleLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const Private = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <div className="min-w-screen flex items-center justify-center my-12">
                <ScaleLoader
                    height={60}
                    margin={2}
                    width={5}
                />
            </div>
        )
    }

    if (user) {
        return children
    }

    return (
        <div>
            <Navigate state={location.pathname} to='/login' />
        </div>
    );
};

Private.propTypes = {
    children: PropTypes.array.isRequired
}

export default Private;
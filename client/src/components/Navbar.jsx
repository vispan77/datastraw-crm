import React from 'react'
import { motion } from "motion/react";
import { signInWithPopup, signOut } from 'firebase/auth'; // Import signOut for logout functionality
import { auth, provider } from '../../utils/firebase';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/slice/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';







function Navbar() {

    const navigate = useNavigate();

    const { userData } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const googleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            const response = await api.post("/auth/google-auth", {
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            })

            dispatch(setUserData(response.data.user))

        } catch (error) {
            console.log(`error in the google auth ${error}`)
        }
    }

    const handleLogout = async () => {
        try {
            await api.get("/auth/logout");
            dispatch(setUserData(null))
        } catch (error) {
            console.log(`error in logout: ${error}`);
        }
    }

    return (
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gray-900">
                DATASTRAW
            </div>

            <div className="flex items-center space-x-4">
                {userData ? (
                    <>
                        <img
                            src={userData.avatar}
                            alt={userData.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="text-gray-800 font-medium hidden md:block">
                            {userData.name}
                        </span>
                        <motion.button
                            onClick={handleLogout}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer
                                       hover:bg-red-700 transition-colors duration-200'
                        >
                            Logout
                        </motion.button>
                    </>
                ) : (
                    <motion.button
                        onClick={() => navigate("/dashboard/home")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='px-4 py-2 bg-black text-white rounded-lg cursor-pointer
                                   hover:bg-gray-800 transition-colors duration-200'
                    >
                        Go to Dashboard
                    </motion.button>
                )}
            </div>
        </div>
    )
}


export default Navbar

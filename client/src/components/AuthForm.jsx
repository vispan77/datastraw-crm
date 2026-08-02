
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/slice/userSlice';
import api from '../../utils/api';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useState } from "react";
import { Loader } from "lucide-react";




function AuthForm() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const googleAuth = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);

            const response = await api.post("/auth/google-auth", {
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            })

            dispatch(setUserData(response.data.user))

        } catch (error) {
            console.log(`error in the google auth ${error}`)
        } finally {
            setLoading(false);
        }
    }

    return (
        < div className="min-h-screen bg-gray-200 flex justify-center items-center" >
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm text-center"
            >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Sign In to Your Account
                </h2>
                <p className="text-gray-600 mb-8">
                    Access dashboard and manage tickets.
                </p>
                <motion.button
                    onClick={googleAuth} 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                    className='w-full flex items-center justify-center gap-3 px-6 py-3 h-14
                     bg-black text-white rounded-lg cursor-pointer
                     hover:bg-black/90 transition-colors duration-200 text-lg font-medium'
                >
                    {loading ? (
                        <Loader className="animate-spin" />
                    ) : (<>
                        <FcGoogle />
                        Sign in with Google
                    </>)}
                </motion.button>
            </motion.div>
        </div >
    )
}

export default AuthForm

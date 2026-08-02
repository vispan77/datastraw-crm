import React from 'react'
import { motion } from "motion/react";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';



function Navbar() {

    const googleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
        } catch (error) {
            console.log(`error in the google auth ${error}`)
        }
    }

    return (
        <div>
            <motion.button
                onClick={googleAuth}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='px-5 py-2 bg-black text-white rounded-lg cursor-pointer' >
                Get Started
            </motion.button>
        </div>
    )
}


export default Navbar

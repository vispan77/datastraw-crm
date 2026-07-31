import React from 'react'
import { useState } from 'react'
import createTicket from '../features/createTicket';
import { motion } from "motion/react"

function CreateTicket() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            if (!name || !email || !subject || !description) {
                setError("all fields are required.");
                return;
            }

            setError(null);

            const payload = {
                customer_name: name,
                customer_email: email,
                subject: subject,
                description: description
            }
            const { data } = await createTicket(payload);
            console.log(data);
            setName("");
            setEmail("");
            setSubject("");
            setDescription("");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Create a Support Ticket
                </h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Please Enter your name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full border border-black/20 px-4 py-2 rounded-lg mb-4"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="text"
                        placeholder="Please Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full border border-black/20 px-4 py-2 rounded-lg mb-4"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                    </label>
                    <input
                        type="text"
                        placeholder="Enter the subject"
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                        className="w-full border border-black/20 px-4 py-2 rounded-lg mb-4"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        rows={5}
                        type="text"
                        placeholder="Describe your issue"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="w-full border border-black/20 px-4 py-2 rounded-lg mb-4"
                    />

                    {
                        error && (
                            <div className="text-red-500 text-sm -mt-3 mb-3 text-center">
                                {error}
                            </div>)
                    }

                    <div className='flex justify-center items-center'>
                        <motion.button onClick={handleSubmit}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='px-5 py-2 bg-black text-white rounded-lg cursor-pointer 
                            hover:bg-black/90'
                        >
                            Submit
                        </motion.button>

                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default CreateTicket






// import React from 'react'
// import { useState } from 'react'
// import createTicket from '../features/createTicket';
// import { motion } from "framer-motion"

// function CreateTicket() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [subject, setSubject] = useState("");
//     const [description, setDescription] = useState("");
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!name || !email || !subject || !description) {
//             setError("All fields are required.");
//             return;
//         }
//         setIsSubmitting(true);
//         setError(null);
//         setSuccess(null);
//         try {
//             const payload = {
//                 customer_name: name,
//                 customer_email: email,
//                 subject: subject,
//                 description: description
//             }
//             const { data } = await createTicket(payload);
//             setSuccess("Ticket created successfully!");
//             setName("");
//             setEmail("");
//             setSubject("");
//             setDescription("");
//         } catch (error) {
//             setError("Failed to create ticket. Please try again.");
//             console.error(error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     }
//     return (
//         <div className='min-h-screen bg-gray-100 flex justify-center items-center p-4'>
//             <motion.div
//                 initial={{ opacity: 0, y: -40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//                 <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//                     Create a Support Ticket
//                 </h2>

//                 <form onSubmit={handleSubmit} noValidate>
//                     <div className="space-y-4">
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                             <input
//                                 id="name"
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 value={name}
//                                 onChange={(event) => setName(event.target.value)}
//                                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 value={email}
//                                 onChange={(event) => setEmail(event.target.value)}
//                                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
//                             <input
//                                 id="subject"
//                                 type="text"
//                                 placeholder="Enter the subject"
//                                 value={subject}
//                                 onChange={(event) => setSubject(event.target.value)}
//                                 className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                             <textarea
//                                 id="description"
//                                 placeholder="Describe your issue"
//                                 value={description}
//                                 onChange={(event) => setDescription(event.target.value)}
//                                 className="w-full border border-gray-300 px-4 py-2 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
//                     {success && <div className="text-green-500 text-sm mt-4 text-center">{success}</div>}

//                     <div className='flex justify-center items-center mt-6'>
//                         <motion.button type="submit"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             disabled={isSubmitting}
//                             className='px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition w-full'>
//                             {isSubmitting ? 'Submitting...' : 'Submit'}
//                         </motion.button>

//                     </div>
//                 </form>
//             </motion.div>

//         </div>
//     )
// }

// export default CreateTicket


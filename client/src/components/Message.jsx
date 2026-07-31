import React from 'react'

function Message({ role, message_text, createdAt }) {
    const isUser = role === "customer";

    const message = message_text;

    const dateObj = new Date(createdAt);
    const localDateTime = dateObj.toLocaleString();

    return (
        <div className={`flex mt-3 ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed
        ${isUser ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm" :
                    "bg-black border border-white/[0.07] text-slate-200 rounded-tl-sm"
                }`}>
                <div>{message}</div>
                <span className={`text-xs block mt-1 opacity-70 
                    ${isUser ? "text-right" : "text-left"}`}>
                    {localDateTime}
                </span>

            </div>

        </div>


    )
}

export default Message

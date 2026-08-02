import React, { useState, useEffect } from "react";
import { ArrowLeftIcon, Search } from "lucide-react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function SearchTicket() {

  const { ticketData } = useSelector((state) => state.ticket);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    try {
      if (!searchText.trim()) {
        setSearchResults([]);
        return;
      }

      const results = ticketData.filter((ticket) => {

        const { ticket_id, customer_name, customer_email, subject } = ticket;
        const searchTextLower = searchText.toLowerCase();

        const ticketIdLower = (ticket_id || "").toLowerCase();
        const customerNameLower = (customer_name || "").toLowerCase();
        const customerEmailLower = (customer_email || "").toLowerCase();
        const subjectLower = (subject || "").toLowerCase();

        return (
          ticketIdLower.includes(searchTextLower) ||
          customerNameLower.includes(searchTextLower) ||
          customerEmailLower.includes(searchTextLower) ||
          subjectLower.includes(searchTextLower)
        );
      });

      setSearchResults(results);

    } catch (error) {
      console.log(`error in searching ${error}`)
      setSearchResults([]);
    }
  }

  const goBack = () => {
    navigate("/dashboard/home")
  };

  useEffect(() => {
    handleSearch();
  }, [ticketData, searchText]);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-black mb-1.5 cursor-pointer ml-2">
            <button className="cursor-pointer" onClick={goBack}>
              <ArrowLeftIcon size={20} />
            </button>
          </div>

          <h2 className="ml-2 text-xl font-bold mb-4 text-gray-800">
            Search Ticket
          </h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-white p-6 rounded-xl shadow-lg flex flex-col h-[550px] gap-4"
      >

        <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by Name, Email or Subject..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-black/50"
              />
            </div>

            <button
              onClick={handleSearch} // Add onClick handler
              className="px-6 py-3 bg-black text-white rounded-lg
                            cursor-pointer hover:bg-gray-800 transition"
            >
              Search
            </button>
          </div>
        </div>
        <div
          className="flex-grow overflow-y-auto border border-gray-200
                    rounded-lg bg-gray-50 p-4 [scrollbar-width:none]"
        >
          {/* Render search results */}
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white border border-gray-200 rounded-lg
                            shadow-sm p-4 mb-3 cursor-pointer hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    Ticket-id #{ticket._id}
                  </h3>

                  <span className={`text-sm px-3 py-1 rounded-full
                                 ${ticket.status === 'Open' ? 'bg-green-100 text-green-700' :
                      ticket.status === 'In-Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'}`}
                  >
                    {ticket.status}
                  </span>
                </div>

                <p className="text-gray-700 mt-2">
                  {ticket.subject}: {ticket.description}
                </p>

                <div className="mt-3 text-sm text-gray-500 flex justify-between">
                  <span>{ticket.customer_name}</span>
                  <span>{ticket.customer_email}</span>
                </div>
              </div>
            ))
          ) : (
            // Empty State
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600">
                {searchText.trim() ? "No tickets found matching your search."
                  :
                  "Please search for a ticket to see results."}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default SearchTicket;
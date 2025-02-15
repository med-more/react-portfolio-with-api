import { useState, useEffect } from "react";
import axios from "axios"; 

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("http://localhost:5000/portfolio/messages");
                setMessages(response.data);
            } catch (error) {
                console.error("An error occurred while fetching messages", error);
            }
        };

        fetchMessages();
    }, []);

    const handleDeleteMessage = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/portfolio/messages/${id}`);
            setMessages(messages.filter(message => message._id !== id));
        } catch (error) {
            console.error("An error occurred while deleting the message", error);
        }
    };

    const filteredMessages = messages.filter((message) =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-6 py-8 relative">
            <div className="fixed inset-0 bg-cover bg-center bg-img"></div>

            <div className="relative z-10">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-50 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                </div>

                <div className="space-y-4">
                    {filteredMessages.map((message) => (
                        <div key={message._id} className="p-6 rounded-lg backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-stone-50/30 shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                                    <p className="text-sm text-white/80">{message.email}</p>
                                    <p className="text-sm text-white/80">
                                        Phone: {message.countryCode} {message.phone}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDeleteMessage(message._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                            <p className="mt-4 text-white/90">{message.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Messages;
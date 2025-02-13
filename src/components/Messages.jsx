import { useState } from "react";

const Messages = () => {
  // Sample messages data (you can replace this with data from an API or state management)
  const [messages, setMessages] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", message: "Hello, I'm interested in your work!" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Can we schedule a meeting?" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", message: "Great portfolio!" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle message deletion
  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  // Filter messages based on search term
  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="mb-6 text-center text-4xl font-semibold text-white">Messages</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <div key={message.id} className="p-6 rounded-lg backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-stone-50/30 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                <p className="text-sm text-white/80">{message.email}</p>
              </div>
              <button
                onClick={() => handleDeleteMessage(message.id)}
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
  );
};

export default Messages;
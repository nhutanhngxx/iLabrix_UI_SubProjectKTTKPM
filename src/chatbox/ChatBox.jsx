import { useState, useEffect, useRef } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const newMessage = {
    id: Date.now(),
    text: input,
    sender: 'user',
    timestamp: new Date().toLocaleTimeString(),
  };

  setMessages((prev) => [...prev, newMessage]);
  setInput('');

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMessage = {
      id: Date.now() + 1,
      text: `${data.response || 'Không có phản hồi'}`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    const errorMessage = {
      id: Date.now() + 1,
      text: 'Lỗi kết nối server!',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, errorMessage]);
  }
};

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bong bóng chat */}
      <div
        className={`flex items-center justify-center cursor-pointer transition-all duration-300 ${
          isOpen ? 'hidden' : 'w-16 h-16 bg-blue-500 rounded-full shadow-lg'
        }`}
        onClick={() => setIsOpen(true)}
      >
        {/* <span className="text-white text-2xl">💬</span> */}
        <img
                  src="https://nguyenchungs3.s3.ap-southeast-2.amazonaws.com/image+(2).jpg"
                  alt="Bot"
                  className="w-15  h-15 rounded-full border border-gray-400 mb-1"
                />
      </div>

      {/* Chat box */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'w-80 h-[400px] opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-0'
        } bg-white rounded-lg shadow-lg flex flex-col origin-bottom-right`}
      >
        <div className="bg-blue-500 text-white p-2 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat Box</h2>
          <button
            className="text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              // className={`mb-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              className={`mb-2 flex flex-col ${
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
            >
               {/* Avatar nếu là bot */}
              {message.sender !== 'user' && (
                <img
                  src="https://nguyenchungs3.s3.ap-southeast-2.amazonaws.com/image+(2).jpg"
                  alt="Bot"
                  className="w-8 h-8 rounded-full border border-gray-400 mb-1"
                />
              )}
              <div
                className={`max-w-xs max-w-[80%] p-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              > 
                <p>{message.text}</p>
                <span className="text-xs opacity-70">{message.timestamp}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
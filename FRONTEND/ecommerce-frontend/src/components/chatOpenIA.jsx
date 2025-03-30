import { useState, useRef, useEffect } from "react";

const ChatOpenAI = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async () => {
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");

        try {
            const response = await fetch(`http://localhost:5000/api/ai/movie-info/${input}`); 

            if (!response.ok) {
                throw new Error("Error al enviar el mensaje.");
            }

            const data = await response.json();
            console.log("Datos recibidos del backend:", data);

            setMessages((prevMessages) => [...prevMessages, { text: data.message, sender: "bot" }]); 
        } catch (error) {
            console.error("Error:", error);
            setMessages((prevMessages) => [...prevMessages, { text: "No se pudo obtener la información de la película.", sender: "bot" }]);
        }
    };

    return (
        <div className="flex flex-col h-96 border rounded-lg p-4 bg-gray-800 text-white">
            <div className="flex-grow overflow-y-auto space-y-2">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`p-2 rounded-lg ${message.sender === "user" ? "bg-blue-500" : "bg-gray-700"} max-w-xs`}>
                            {message.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex mt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow border rounded-l-lg p-2 bg-gray-700 text-white"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white rounded-r-lg p-2"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ChatOpenAI;

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Howdy! I'm your McGaugh Ranch concierge. Curious about owning your own beef or how our heritage ranching works? Ask me anything!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `You are the McGaugh Ranch AI Sales Concierge. You are an expert in heritage ranching, cattle shares (1/4, 1/2, whole), and sustainable livestock management.
          Your goal is to guide potential customers through the process of owning their own cow. 
          Key talking points:
          - Transparent Ownership: Customers get a legal bill of sale.
          - Custom Processing: Customers can choose their cuts through our partner butchers.
          - Quality: Pasture-raised, hormone-free, heritage breeds.
          - Community: Customers can name their animal and follow its progress.
          Keep responses friendly, professional, and slightly rustic but sophisticated. Avoid long paragraphs; use bullet points for clarity when explaining shares.`,
        }
      });

      const aiText = response.text || "I apologize, I'm having a bit of trouble connecting to the ranch office. Could you try asking that again?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I'm experiencing some technical difficulties. Please feel free to reach out to us via phone or email!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "What is a 1/4 share?",
    "How does processing work?",
    "Can I name my cow?",
    "Is the beef organic?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] md:w-[400px] h-[500px] bg-white dark:bg-background-dark rounded-2xl shadow-2xl border border-primary/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div>
                <h3 className="font-bold leading-none text-lg">Ranch Concierge</h3>
                <span className="text-[10px] uppercase tracking-widest opacity-80">Expert Sales Agent</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-white/5 border border-primary/10 dark:text-white rounded-tl-none shadow-sm'
                }`}>
                  {m.text.split('\n').map((line, li) => (
                    <p key={li} className={li > 0 ? 'mt-1' : ''}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center border border-primary/10">
                  <div className="size-1.5 bg-primary rounded-full animate-bounce"></div>
                  <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Area */}
          <div className="p-3 border-t border-primary/10 bg-white dark:bg-background-dark">
            {messages.length < 3 && !isLoading && (
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestions.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => { setInput(s); }}
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary hover:text-white transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="flex-grow bg-gray-100 dark:bg-white/5 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="size-10 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="size-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center group relative hover:scale-110 transition-transform"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-white"></span>
          </span>
        )}
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'keyboard_arrow_down' : 'chat_bubble'}
        </span>
      </button>
    </div>
  );
};

export default ChatBot;

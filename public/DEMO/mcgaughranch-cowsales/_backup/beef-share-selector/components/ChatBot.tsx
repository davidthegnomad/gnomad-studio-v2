
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Howdy! I'm Caleb, the ranch manager here. Need a hand figurin' out which beef share is right for your freezer?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  // Initialize Chat Session
  useEffect(() => {
    const initChat = async () => {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are 'Caleb', an expert rancher and lead salesman for McGaugh Ranch. 
          Your tone is friendly, helpful, rustic but professional, and deeply knowledgeable.
          
          Core Knowledge:
          1. Shares: Quarter Cow (~100-125lbs), Half Cow (~200-250lbs), Whole Cow (~400-500lbs).
          2. Storage: Quarter fits in standard fridge freezer. Half needs ~8 cu.ft. Whole needs a large chest freezer.
          3. Process: We sell live animal shares. This is a legal requirement. Ownership transfers before processing.
          4. Quality: 100% grass-fed, no hormones, dry-aged for flavor.
          
          Your goal: Help customers choose the right size. If they are unsure, tell them to use the 'Share Calculator' on the page.
          Be concise but personable. Use occasional ranch-style greetings like 'Howdy' or 'Take care'.`,
        },
      });
    };
    initChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: userMessage });
      
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        const part = chunk as GenerateContentResponse;
        fullText += part.text;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', text: fullText };
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry partner, the connection's a bit spotty out here on the range. Try again in a second?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-3rem)] sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-[#e0e7e1] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-ranch-dark p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-ranch-dark">
                <span className="material-symbols-outlined">face_6</span>
              </div>
              <div>
                <h4 className="font-display text-lg leading-none">Caleb the Rancher</h4>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-0.5">Expert Salesman</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8faf8]"
          >
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-ranch-dark text-white rounded-tr-none' 
                      : 'bg-white border border-[#e0e7e1] text-ranch-dark rounded-tl-none shadow-sm'
                  }`}
                >
                  {m.text || (isTyping && i === messages.length - 1 ? <TypingIndicator /> : null)}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#e0e7e1]">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about storage, cuts, or pricing..."
                className="w-full pl-4 pr-12 py-3 bg-background-light border-transparent focus:border-primary focus:ring-0 rounded-xl text-sm placeholder-[#8fa796]"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 size-8 flex items-center justify-center bg-primary text-ranch-dark rounded-lg disabled:opacity-50 transition-all hover:scale-105"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`size-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 active:scale-90 ${
          isOpen ? 'bg-white text-ranch-dark rotate-90' : 'bg-primary text-ranch-dark hover:scale-110'
        }`}
      >
        <span className="material-symbols-outlined text-2xl">
          {isOpen ? 'close' : 'chat_bubble'}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex gap-1 py-1">
    <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="size-1.5 bg-primary rounded-full animate-bounce"></div>
  </div>
);

export default ChatBot;

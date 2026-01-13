'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BOOT_TEXT = [
  "SARANG OS v1.0.4 - KERNEL RELEASE 2026.01.13",
  "CPU: GEMINI QUANTUM CORE @ 4.2GHz",
  "MEMORY: 64GB NEURAL RAM",
  "STORAGE: 2TB NVME SOLID STATE",
  "NETWORK: CONNECTED via GIGABIT-ETHERNET",
  "------------------------------------------",
  "BOOTING...",
  "LOADING CORE MODULES...",
  "INITIALIZING UI ENGINE...",
  "ESTABLISHING SECURE CONNECTION...",
  "SYSTEM READY.",
  "TYPE 'HELP' FOR COMMANDS.",
  ""
];

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isBooted, setIsBooted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_TEXT.length) {
        setLines(prev => [...prev, BOOT_TEXT[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsBooted(true);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    let response = [`> ${input}`];

    switch (cmd) {
      case 'help':
        response.push("AVAILABLE COMMANDS: ABOUT, PROJECTS, CONTACT, CLEAR, LS");
        break;
      case 'about':
        response.push("CREATOR: SARANG SANJAY", "ROLE: SOFTWARE ENGINEER & DESIGNER", "BIO: [BLANK]");
        break;
      case 'projects':
        response.push("1. [PROJECT NAME] - [BLANK]", "2. [PROJECT NAME] - [BLANK]");
        break;
      case 'contact':
        response.push("EMAIL: [BLANK]", "GITHUB: [BLANK]", "TWITTER: [BLANK]");
        break;
      case 'ls':
        response.push("about.txt  projects/  contact.txt  secret.key");
        break;
      case 'clear':
        setLines([]);
        setInput('');
        return;
      default:
        response.push(`COMMAND NOT FOUND: ${cmd}`);
    }

    setLines(prev => [...prev, ...response, ""]);
    setInput('');
  };

  return (
    <div className="p-8 font-mono text-[#00ff41] h-full flex flex-col crt-flicker overflow-hidden text-xl">
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {isBooted && (
        <form onSubmit={handleCommand} className="flex items-center">
          <span className="mr-2">S_OS:~$</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-[#00ff41] caret-block"
            spellCheck={false}
          />
        </form>
      )}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
}

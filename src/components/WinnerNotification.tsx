import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Winner {
  email: string;
  amount: string;
  time: string;
  avatar: string;
}

const winners: Winner[] = [
  { email: "shivam811@yahoo.com", amount: "₹10,000", time: "1h ago", avatar: "🎮" },
  { email: "kritika985@mail.com", amount: "₹10,000", time: "12h ago", avatar: "🎯" },
  { email: "sneha181@gmail.com", amount: "₹5,000", time: "54m ago", avatar: "⭐" },
  { email: "richa374@mail.com", amount: "1000 💎", time: "just now", avatar: "🏆" },
  { email: "ajay977@hotmail.com", amount: "₹5,000", time: "21h ago", avatar: "🎁" },
  { email: "arjun129@mail.com", amount: "₹5,000", time: "59m ago", avatar: "🌟" },
  { email: "pritam527@hotmail.com", amount: "₹8,500", time: "2h ago", avatar: "💫" },
  { email: "priya456@gmail.com", amount: "₹2,000", time: "3h ago", avatar: "🎲" },
];

const WinnerNotification = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % winners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentWinner = winners[currentIndex];

  return (
    <div className="fixed top-16 right-3 z-40">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-giveaway-winner-bg rounded-full py-1.5 px-3 flex items-center gap-2 shadow-lg"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-sm">
            {currentWinner.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-white text-[10px] font-medium truncate max-w-[140px]">
              {currentWinner.email} won {currentWinner.amount}
            </p>
            <p className="text-white/70 text-[9px]">{currentWinner.time}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WinnerNotification;

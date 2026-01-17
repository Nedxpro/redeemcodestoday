import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const OnlineBadge = () => {
  const [count, setCount] = useState(7349);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 10) - 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-4 right-4 bg-giveaway-green text-white text-xs font-medium px-3 py-2 rounded-full shadow-lg z-40 flex items-center gap-1.5"
    >
      <span className="flex gap-0.5">
        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
      </span>
      <span>{count.toLocaleString()}+ users online</span>
    </motion.div>
  );
};

export default OnlineBadge;

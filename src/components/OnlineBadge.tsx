import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const OnlineBadge = () => {
  const [count, setCount] = useState(7349);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 10) - 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 z-40 bg-giveaway-green text-white px-3 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-2"
    >
      <span className="flex gap-0.5">
        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
      </span>
      <span>{count.toLocaleString()}+ online</span>
    </motion.div>
  );
};
export default OnlineBadge;
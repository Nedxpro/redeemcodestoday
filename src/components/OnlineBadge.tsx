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
  return;
};
export default OnlineBadge;
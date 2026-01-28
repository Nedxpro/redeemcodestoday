import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

interface TaskButtonProps {
  taskLink: string;
}

const TaskButton = ({ taskLink }: TaskButtonProps) => {
  const handleClick = () => {
    window.open(taskLink, "_blank");
  };

  return (
    <div className="px-4 mt-4">
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full relative overflow-hidden rounded-full py-3 px-4 shadow-lg"
        style={{
          background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
          boxShadow: "0 0 20px rgba(251, 191, 36, 0.5), 0 4px 15px rgba(245, 158, 11, 0.4)",
        }}
      >
        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 opacity-50"
          animate={{
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.4) 150%, transparent 200%)",
            ],
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="flex items-center justify-center gap-3 relative z-10">
          {/* Avatar circle */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-2 border-white/50 shadow-md">
            <Rocket className="w-5 h-5 text-white" />
          </div>

          {/* Text content */}
          <div className="flex flex-col items-start">
            <span className="text-white font-bold text-sm flex items-center gap-1">
              <span>🚀</span>
              <span>1-INSTALL+REGISTER=5,000</span>
              <span>💎</span>
            </span>
            <span className="text-white/90 font-semibold text-xs flex items-center gap-1">
              <span>🎁</span>
              <span>INSTALL & GET-5,000</span>
              <span>💎</span>
            </span>
          </div>
        </div>
      </motion.button>
    </div>
  );
};

export default TaskButton;

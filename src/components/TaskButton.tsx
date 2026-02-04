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
        animate={{
          scale: [1, 1.03, 1, 1.02, 1],
          rotate: [0, -1, 1, -1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut",
        }}
        whileTap={{ scale: 0.98 }}
        className="w-full relative overflow-hidden rounded-full py-3.5 px-4 shadow-lg border-[3px] border-white"
        style={{
          background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
          boxShadow: "0 0 25px rgba(251, 191, 36, 0.7), 0 0 50px rgba(245, 158, 11, 0.4), 0 4px 20px rgba(245, 158, 11, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      >
        {/* Pulsing glow ring */}
        <motion.div
          className="absolute -inset-1 rounded-full opacity-60"
          animate={{
            boxShadow: [
              "0 0 10px 2px rgba(251, 191, 36, 0.5)",
              "0 0 25px 5px rgba(251, 191, 36, 0.8)",
              "0 0 10px 2px rgba(251, 191, 36, 0.5)",
            ],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

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
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-2 border-white shadow-md"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Rocket className="w-5 h-5 text-white" />
          </motion.div>

          {/* Text content */}
          <div className="flex flex-col items-start">
            <span className="text-white font-bold text-sm flex items-center gap-1 drop-shadow-md">
              <span>🚀</span>
              <span>1-INSTALL+REGISTER=5,000</span>
              <span>💎</span>
            </span>
            <span className="text-white/90 font-semibold text-xs flex items-center gap-1 drop-shadow-md">
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

import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const SoundToggle = () => {
  const [soundOn, setSoundOn] = useState(false);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setSoundOn(!soundOn)}
      className="fixed bottom-4 left-4 bg-card rounded-full px-4 py-2 shadow-lg flex items-center gap-2 z-40"
    >
      {soundOn ? (
        <Volume2 className="w-5 h-5 text-giveaway-green" />
      ) : (
        <VolumeX className="w-5 h-5 text-red-500" />
      )}
      <span className="text-sm font-medium text-foreground">
        Sound {soundOn ? "ON" : "OFF"}
      </span>
    </motion.button>
  );
};

export default SoundToggle;

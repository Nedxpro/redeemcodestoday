import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
const SoundToggle = () => {
  const [soundOn, setSoundOn] = useState(false);
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setSoundOn(!soundOn)}
      className="fixed bottom-20 right-4 z-40 bg-card shadow-lg rounded-full p-3"
    >
      {soundOn ? (
        <Volume2 className="w-5 h-5 text-giveaway-green" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </motion.button>
  );
};
export default SoundToggle;
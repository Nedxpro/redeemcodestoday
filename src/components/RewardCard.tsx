import { GooglePlayIconSimple } from "./GooglePlayIcon";
import { motion } from "framer-motion";

interface RewardCardProps {
  type: "diamonds" | "redeem";
  amount: string;
  onRedeem: () => void;
}

const RewardCard = ({ type, amount, onRedeem }: RewardCardProps) => {
  const isDiamonds = type === "diamonds";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-2xl shadow-lg p-3 md:p-4 text-center"
    >
      {/* Icon */}
      <div className="flex justify-center mb-2">
        {isDiamonds ? (
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
            <span className="text-2xl md:text-3xl">💎</span>
          </div>
        ) : (
          <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center float-animation">
            <GooglePlayIconSimple className="w-10 h-10 md:w-12 md:h-12" />
          </div>
        )}
      </div>

      {/* Amount */}
      <p className="font-bold text-foreground text-sm md:text-base mb-2">
        {isDiamonds ? (
          <span>💎{amount} Diamonds</span>
        ) : (
          <span>{amount} Redeem code</span>
        )}
      </p>

      {/* Finish Requirement */}
      <div className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full mb-2">
        <span className="text-red-500 font-bold">T</span> Finish 3 Install
      </div>

      {/* Redeem Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRedeem}
        className="w-full py-2 md:py-2.5 rounded-full gradient-button text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md"
      >
        {isDiamonds ? (
          <>
            <span className="text-base">🎮</span> REDEEM
          </>
        ) : (
          <>
            <GooglePlayIconSimple className="w-4 h-4" /> REDEEM
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default RewardCard;

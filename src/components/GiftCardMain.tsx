import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface GiftCardMainProps {
  amount: string;
  sharesCompleted: number;
  totalShares: number;
  onShare: () => void;
}

const GiftCardMain = ({ amount, sharesCompleted, totalShares, onShare }: GiftCardMainProps) => {
  const progress = (sharesCompleted / totalShares) * 100;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-4 bg-card rounded-2xl shadow-xl p-6"
    >
      {/* Gift Card Design */}
      <div className="bg-gradient-to-br from-green-100 to-yellow-50 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-lg p-1.5 shadow-sm">
              <Play className="w-6 h-6 text-giveaway-green fill-giveaway-green" />
            </div>
          </div>
          <span className="text-2xl md:text-3xl font-bold text-giveaway-green">{amount}</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Google Play</h2>
        <p className="text-giveaway-orange text-sm font-medium mb-3">Gift Card</p>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Play className="w-4 h-4" />
          <span className="text-sm font-medium">GOOGLE PLAY</span>
        </div>
      </div>

      {/* Share Progress */}
      <div className="text-center mb-4">
        <p className="text-muted-foreground text-sm mb-3">
          Every share will get you {amount} Redeem code
        </p>
        
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-giveaway-green to-giveaway-teal rounded-full"
          />
        </div>
        
        <p className="text-giveaway-green font-bold text-lg">
          {sharesCompleted} / {totalShares} SHARES COMPLETED
        </p>
      </div>

      {/* Share Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onShare}
        className="w-full py-4 rounded-full gradient-button text-white font-bold text-lg shadow-lg"
      >
        SHARE {sharesCompleted + 1}/{totalShares} TO GET {amount}
      </motion.button>
    </motion.div>
  );
};

export default GiftCardMain;

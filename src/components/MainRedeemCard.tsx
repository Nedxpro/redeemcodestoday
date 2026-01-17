import { GooglePlayIconSimple } from "./GooglePlayIcon";
import { motion } from "framer-motion";

interface MainRedeemCardProps {
  amount: string;
  onDownload: () => void;
}

const MainRedeemCard = ({ amount, onDownload }: MainRedeemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-3 mt-4 bg-card rounded-xl shadow-lg p-4"
    >
      {/* Online Users Badge */}
      <div className="flex justify-end mb-2">
        <div className="inline-flex items-center gap-1.5 bg-giveaway-green text-white text-[10px] font-medium px-2.5 py-1 rounded-full pulse-animation">
          <span className="flex gap-0.5">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
          </span>
          <span>7349+ users online</span>
        </div>
      </div>

      {/* Google Play Icon */}
      <div className="flex justify-center mb-3">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="float-animation"
        >
          <GooglePlayIconSimple className="w-14 h-14 md:w-16 md:h-16" />
        </motion.div>
      </div>

      {/* Amount */}
      <h2 className="text-lg md:text-xl font-bold text-center text-giveaway-green mb-1.5">
        🎉 {amount} Play Store Code
      </h2>
      
      <p className="text-center text-foreground text-xs mb-3">
        🚀 Win a free Google Play redeem code!
      </p>

      {/* Instructions */}
      <div className="space-y-1.5 text-xs text-foreground mb-3">
        <p className="flex items-start gap-2">
          <span className="w-4 h-4 bg-giveaway-green text-white rounded flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
          <span>Tap "<strong>Download & Register</strong>" and sign up app/site.</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="w-4 h-4 bg-giveaway-green text-white rounded flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
          <span>Use it for <strong>20–30 seconds</strong>.</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="w-4 h-4 bg-giveaway-green text-white rounded flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
          <span>Return here and <strong>submit your email</strong> to enter the giveaway.</span>
        </p>
      </div>

      {/* Additional Info */}
      <div className="space-y-1 text-xs text-muted-foreground mb-3">
        <p className="flex items-center gap-1.5">
          <span className="text-red-500">©</span>
          Winners announced <strong className="text-foreground">via email</strong>.
        </p>
        <p className="flex items-center gap-1.5">
          <span className="text-yellow-500">$</span>
          Unlock <strong className="text-foreground">redeem code</strong> instantly!
        </p>
      </div>

      {/* Download Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onDownload}
        className="w-full py-3 rounded-xl gradient-button text-white font-bold text-sm shadow-lg mb-2"
      >
        <span className="block">Download & Register</span>
        <span className="block text-xs font-normal opacity-90">to get FREE {amount} Redeem Code</span>
      </motion.button>

      {/* Warning */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 text-center">
        <p className="text-orange-600 text-[10px] md:text-xs">
          ⚠️ <strong>Complete download & registration to get your redeem code.</strong> 💎
        </p>
      </div>
    </motion.div>
  );
};

export default MainRedeemCard;

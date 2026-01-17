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
      className="mx-4 bg-card rounded-2xl shadow-xl p-5 md:p-6"
    >
      {/* Online Users Badge */}
      <div className="flex justify-end mb-2">
        <div className="inline-flex items-center gap-1.5 bg-giveaway-green text-white text-xs font-medium px-3 py-1.5 rounded-full pulse-animation">
          <span className="flex gap-0.5">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          </span>
          <span>7349+ users online</span>
        </div>
      </div>

      {/* Google Play Icon */}
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="float-animation"
        >
          <GooglePlayIconSimple className="w-20 h-20 md:w-24 md:h-24" />
        </motion.div>
      </div>

      {/* Amount */}
      <h2 className="text-xl md:text-3xl font-bold text-center text-giveaway-green mb-2">
        🎉 {amount} Play Store Code
      </h2>
      
      <p className="text-center text-foreground text-sm md:text-base mb-4">
        🚀 Win a free Google Play redeem code!
      </p>

      {/* Instructions */}
      <div className="space-y-2.5 text-sm text-foreground mb-5">
        <p className="flex items-start gap-2">
          <span className="w-5 h-5 bg-giveaway-green text-white rounded flex items-center justify-center text-xs font-bold shrink-0">1</span>
          <span>Tap "<strong>Download & Register</strong>" and sign up app/site.</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="w-5 h-5 bg-giveaway-green text-white rounded flex items-center justify-center text-xs font-bold shrink-0">2</span>
          <span>Use it for <strong>20–30 seconds</strong>.</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="w-5 h-5 bg-giveaway-green text-white rounded flex items-center justify-center text-xs font-bold shrink-0">3</span>
          <span>Return here and <strong>submit your email</strong> to enter the giveaway.</span>
        </p>
      </div>

      {/* Additional Info */}
      <div className="space-y-1.5 text-sm text-muted-foreground mb-5">
        <p className="flex items-center gap-2">
          <span className="text-red-500">©</span>
          Winners announced <strong className="text-foreground">via email</strong>.
        </p>
        <p className="flex items-center gap-2">
          <span className="text-yellow-500">$</span>
          Unlock <strong className="text-foreground">redeem code</strong> instantly!
        </p>
      </div>

      {/* Download Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onDownload}
        className="w-full py-4 rounded-2xl gradient-button text-white font-bold text-base shadow-lg mb-3"
      >
        <span className="block">Download & Register</span>
        <span className="block text-sm font-normal opacity-90">to get FREE {amount} Redeem Code</span>
      </motion.button>

      {/* Warning */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
        <p className="text-orange-600 text-xs md:text-sm">
          ⚠️ <strong>Complete download & registration to get your redeem code.</strong> 💎
        </p>
      </div>
    </motion.div>
  );
};

export default MainRedeemCard;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, AlertTriangle, X } from "lucide-react";
import GooglePlayIconSimple from "./GooglePlayIcon";

interface ShareFlowProps {
  taskLink: string;
}

type FlowStep = "share" | "email" | "verified" | "spin" | "won" | "claim";

const WHEEL_REWARDS = ["₹200", "₹500", "₹600", "₹800", "₹100", "₹1000"];
const WHEEL_COLORS = ["#ea4335", "#fbbc04", "#34a853", "#4285f4", "#ea4335", "#34a853"];

const ShareFlow = ({ taskLink }: ShareFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("share");
  const [sharesCompleted, setSharesCompleted] = useState(0);
  const [email, setEmail] = useState("");
  const [wonAmount, setWonAmount] = useState("₹1000");
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);
  const [showFakeShareModal, setShowFakeShareModal] = useState(false);
  const totalShares = 5;
  const rewardAmount = "₹200";

  const handleShare = () => {
    // Simulate share action - 70% chance genuine, 30% fake
    const isGenuine = Math.random() > 0.3;
    
    if (isGenuine) {
      const newShares = sharesCompleted + 1;
      setSharesCompleted(newShares);
      
      if (newShares >= totalShares) {
        setCurrentStep("email");
      }
    } else {
      setShowFakeShareModal(true);
    }
  };

  const handleEmailSubmit = () => {
    if (email && email.includes("@")) {
      setCurrentStep("verified");
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * WHEEL_REWARDS.length);
    const segmentAngle = 360 / WHEEL_REWARDS.length;
    const targetRotation = 360 * 5 + (randomIndex * segmentAngle) + (segmentAngle / 2);
    
    setSpinRotation(targetRotation);
    setWonAmount(WHEEL_REWARDS[WHEEL_REWARDS.length - 1 - randomIndex]);
    
    setTimeout(() => {
      setIsSpinning(false);
      setCurrentStep("won");
    }, 4000);
  };

  const handleClaim = () => {
    setCurrentStep("claim");
  };

  const handleStartStep = () => {
    window.open(taskLink, "_blank");
  };

  const progress = (sharesCompleted / totalShares) * 100;

  return (
    <div className="px-3 py-3">
      {/* Fake Share Modal */}
      <AnimatePresence>
        {showFakeShareModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFakeShareModal(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-4 right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 max-w-sm mx-auto p-5 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">FAKE SHARE DETECTED</h3>
              <p className="text-xs text-gray-600 mb-3">
                👥✅ PLEASE SHARE TO GENUINE GROUP OR FRIENDS. WHOSE WANT FREE PLAY STORE REDEEM CODE — FAKE SHARE NOT ALLOWED 🚫⚠️
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFakeShareModal(false)}
                className="w-full py-2.5 rounded-full bg-blue-500 text-white font-bold text-sm"
              >
                TRY AGAIN
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Share */}
          {currentStep === "share" && (
            <motion.div
              key="share"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-3"
            >
              {/* Gift Card Design - Compact */}
              <div className="bg-gradient-to-br from-green-100 via-yellow-50 to-orange-50 rounded-lg p-3 mb-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-200/50 to-transparent rounded-bl-full" />
                <div className="flex items-center gap-3">
                  <img src="/assets/google-play-logo.png" alt="Google Play" className="w-14 h-14 rounded-lg" />
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800 leading-tight">Google Play</h2>
                    <p className="text-giveaway-orange text-xs font-medium">Gift Card</p>
                    <div className="flex items-center gap-1.5 text-gray-500 mt-0.5">
                      <Play className="w-3 h-3 fill-current" />
                      <span className="text-[10px] font-medium tracking-wide">GOOGLE PLAY</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-giveaway-green">{rewardAmount}</span>
                </div>
              </div>

              {/* Share Progress - Compact */}
              <div className="text-center mb-3">
                <p className="text-gray-500 text-xs mb-2">
                  Every share will get you {rewardAmount} Redeem code
                </p>
                
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-giveaway-green to-giveaway-teal rounded-full"
                  />
                </div>
                
                <p className="text-giveaway-green font-bold text-sm">
                  {sharesCompleted} / {totalShares} SHARES COMPLETED
                </p>
              </div>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="w-full py-3 rounded-full gradient-button text-white font-bold text-sm shadow-lg"
              >
                SHARE {Math.min(sharesCompleted + 1, totalShares)}/{totalShares} TO GET {rewardAmount}
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Email Input */}
          {currentStep === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-5"
            >
              {/* Gift Card Design */}
              <div className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 rounded-xl p-4 mb-5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <GooglePlayIconSimple className="w-8 h-8" />
                  </div>
                  <span className="text-2xl font-bold text-white">₹1000</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-0.5">Google Play</h2>
                <p className="text-white/80 text-sm font-medium mb-3">Gift Card</p>
                
                <div className="flex items-center gap-2 text-white/70">
                  <Play className="w-4 h-4 fill-current" />
                  <span className="text-xs font-medium tracking-wide">GOOGLE PLAY</span>
                </div>
              </div>

              {/* Balance Unlocked */}
              <div className="border-2 border-gray-200 rounded-xl p-5 mb-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-xl">🎉</span>
                  <h3 className="text-lg font-bold text-gray-800">Balance Unlocked!</h3>
                </div>
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Gmail"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-center text-gray-600 placeholder-gray-400 focus:outline-none focus:border-giveaway-green mb-4"
                />
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEmailSubmit}
                  className="w-full py-3 rounded-lg gradient-button text-white font-bold"
                >
                  CLAIM ₹1000 REDEEM CODE
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Email Verified */}
          {currentStep === "verified" && (
            <motion.div
              key="verified"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6 text-center"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Email Verified!</h3>
              <p className="text-gray-600 text-sm mb-6">
                ✅ Congratulations! Your entry is submitted. ₹1000 redeem code sent to email within 24 hours. ⏰.If you done the genuine share.
              </p>
              <p className="text-gray-700 text-sm mb-6">
                Now <span className="font-bold">Spin the Wheel</span> to claim MORE REDEEM CODE.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep("spin")}
                className="w-full py-4 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg"
              >
                SPIN NOW
              </motion.button>
            </motion.div>
          )}

          {/* Step 4: Spin Wheel */}
          {currentStep === "spin" && (
            <motion.div
              key="spin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-5 text-center"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">Spin to win Play Store Redeem</h3>
              <p className="text-giveaway-orange text-sm mb-6">Spin the wheel to win your code!</p>
              
              {/* Spin Wheel */}
              <div className="relative w-64 h-64 mx-auto mb-6">
                {/* Pointer */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-orange-500" />
                
                {/* Wheel */}
                <motion.div
                  className="w-full h-full rounded-full relative overflow-hidden shadow-xl"
                  style={{
                    background: `conic-gradient(
                      ${WHEEL_COLORS[0]} 0deg 60deg,
                      ${WHEEL_COLORS[1]} 60deg 120deg,
                      ${WHEEL_COLORS[2]} 120deg 180deg,
                      ${WHEEL_COLORS[3]} 180deg 240deg,
                      ${WHEEL_COLORS[4]} 240deg 300deg,
                      ${WHEEL_COLORS[5]} 300deg 360deg
                    )`,
                    transform: `rotate(${spinRotation}deg)`,
                    transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                  }}
                >
                  {/* Reward labels */}
                  {WHEEL_REWARDS.map((reward, index) => (
                    <div
                      key={index}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotate(${index * 60 + 30}deg)`
                      }}
                    >
                      <span
                        className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-bold text-sm"
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                      >
                        {reward}
                      </span>
                    </div>
                  ))}
                  
                  {/* Center button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <GooglePlayIconSimple className="w-8 h-8" />
                  </div>
                </motion.div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSpin}
                disabled={isSpinning}
                className="w-full py-4 rounded-full gradient-button text-white font-bold text-lg shadow-lg disabled:opacity-70"
              >
                {isSpinning ? "SPINNING..." : "SPIN NOW"}
              </motion.button>
            </motion.div>
          )}

          {/* Step 5: Won */}
          {currentStep === "won" && (
            <motion.div
              key="won"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-6 text-center"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-giveaway-green mb-2">YOU WON {wonAmount}!</h3>
              <p className="text-gray-600 text-sm mb-6">
                To unlock your <span className="font-bold">{wonAmount} Code</span>, you must complete the verification survey below.
              </p>
              
              <div className="border-2 border-dashed border-green-300 rounded-xl p-4 mb-6 bg-green-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-500">⚠️</span>
                  <span className="font-bold text-gray-700">Verification Step:</span>
                </div>
                <ol className="text-left text-sm text-gray-600 space-y-2">
                  <li>1. Click "Visit to Complete Survey" <span className="font-bold text-blue-500">BLUE BUTTON</span>.</li>
                  <li>2. Complete the survey by downloading apps and sign up on the website.</li>
                  <li>3. After sign-up run the app or website which you sign-up <span className="font-bold">60 seconds</span>.</li>
                </ol>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClaim}
                className="w-full py-4 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg"
              >
                VISIT TO COMPLETE SURVEY
              </motion.button>
            </motion.div>
          )}

          {/* Step 6: Claim - 3 Step Offer */}
          {currentStep === "claim" && (
            <motion.div
              key="claim"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-5"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shrink-0">
                  <span className="text-2xl">🎮</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base">Complete 3 steps to unlock</h3>
                  <p className="text-giveaway-green font-medium text-sm">💎{wonAmount} 💎</p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {[1, 2, 3].map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shrink-0">
                        <span className="text-lg">🎮</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">Complete Step {step}</h4>
                        <p className="text-xs text-gray-500">Open link → Download & Register wait 60s</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStartStep}
                      className={`w-full py-3 rounded-lg ${step === 3 ? 'gradient-orange' : 'gradient-button'} text-white font-bold shadow-md text-sm`}
                    >
                      Start Step {step}
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t text-center">
                <p className="text-xs text-gray-500">
                  Complete all steps to unlock the reward for this card.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ShareFlow;

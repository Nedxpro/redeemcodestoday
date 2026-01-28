import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import googlePlayCard from "@/assets/google-play-card.png";

interface RedeemCard {
  id: number;
  amount: number;
  code: string;
  status: "available" | "checking" | "failed" | "success";
  clickTime?: number;
}

interface AdvertisementBannerProps {
  taskLink: string;
}

const generateRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < 3) code += "-";
  }
  return code;
};

const generateCards = (): RedeemCard[] => {
  const amounts = [10, 20, 50, 80, 100, 150, 200, 250, 500];
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    code: generateRandomCode(),
    status: "available" as const,
  }));
};

const maskCode = (code: string) => {
  const parts = code.split("-");
  return `${parts[0]}-****-****-****`;
};

const AdvertisementBanner = ({ taskLink }: AdvertisementBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [cards, setCards] = useState<RedeemCard[]>([]);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [returnCheckInterval, setReturnCheckInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Generate cards on mount
    setCards(generateCards());

    // Show banner after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    return () => {
      clearTimeout(timer);
      if (returnCheckInterval) clearInterval(returnCheckInterval);
    };
  }, []);

  const handleClaimClick = useCallback((cardId: number) => {
    const clickTime = Date.now();
    setActiveCardId(cardId);
    
    // Update card with click time
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, clickTime } : card
    ));

    // Open affiliate link
    window.open(taskLink, "_blank");

    // Start checking for user return
    const checkInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        const returnTime = Date.now();
        const elapsed = returnTime - clickTime;
        
        // User returned before 10 seconds - show verify modal
        if (elapsed < 10000) {
          setShowVerifyModal(true);
          clearInterval(checkInterval);
        }
      }
    }, 500);

    setReturnCheckInterval(checkInterval);

    // Clear interval after 2 minutes max
    setTimeout(() => {
      clearInterval(checkInterval);
    }, 120000);
  }, [taskLink]);

  const handleVerifyComplete = useCallback(() => {
    if (activeCardId === null) return;
    
    const card = cards.find(c => c.id === activeCardId);
    if (!card || !card.clickTime) return;

    setShowVerifyModal(false);
    
    // Set status to checking
    setCards(prev => prev.map(c => 
      c.id === activeCardId ? { ...c, status: "checking" as const } : c
    ));

    // Simulate check delay
    setTimeout(() => {
      const elapsed = Date.now() - card.clickTime!;
      
      if (elapsed < 45000) {
        // Failed - user came back too quickly
        setCards(prev => prev.map(c => 
          c.id === activeCardId ? { ...c, status: "failed" as const } : c
        ));
      } else {
        // Success - show email modal
        setShowEmailModal(true);
      }
    }, 2000);
  }, [activeCardId, cards]);

  const handleEmailSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setShowEmailModal(false);
    setShowSuccessModal(true);
    
    // Reset after showing success
    setTimeout(() => {
      setShowSuccessModal(false);
      setActiveCardId(null);
    }, 5000);
  }, [email]);

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        {/* Main Banner */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
          style={{ border: "4px solid #22c55e" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
            <h2 className="text-white font-bold text-lg tracking-wide">ADVERTISEMENT</h2>
            <button
              onClick={closeBanner}
              className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="p-3 overflow-y-auto max-h-[calc(85vh-60px)]">
            <div className="grid grid-cols-2 gap-3">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.id * 0.02 }}
                  className="bg-white rounded-xl border-2 border-gray-100 shadow-md p-3 flex flex-col items-center"
                >
                  {/* Google Play Icon with Live Badge */}
                  <div className="relative mb-2">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        src={googlePlayCard} 
                        alt="Google Play" 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </div>
                    <div className="absolute -top-1 -right-3 flex items-center gap-0.5 bg-white border border-gray-200 rounded-full px-1.5 py-0.5 text-[10px]">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="font-medium text-gray-700">Live</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-xl font-bold text-green-600 mb-1">₹{card.amount}</div>

                  {/* Install Badge */}
                  <div className="flex items-center gap-1 text-xs text-orange-500 font-medium mb-2 bg-orange-50 px-2 py-0.5 rounded-full">
                    <Download className="w-3 h-3" />
                    <span>Install 1 App</span>
                  </div>

                  {/* Masked Code */}
                  <div className="w-full bg-gray-50 rounded-lg px-2 py-2 mb-3 text-center">
                    <code className="text-xs text-gray-600 font-mono">{maskCode(card.code)}</code>
                  </div>

                  {/* Action Button */}
                  {card.status === "available" && (
                    <button
                      onClick={() => handleClaimClick(card.id)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm py-2.5 rounded-full flex items-center justify-center gap-1.5 hover:from-green-600 hover:to-green-700 transition-all shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      CLAIM NOW
                    </button>
                  )}

                  {card.status === "checking" && (
                    <div className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold text-sm py-2.5 rounded-full flex items-center justify-center">
                      Checking...
                    </div>
                  )}

                  {card.status === "failed" && (
                    <div className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-sm py-2.5 rounded-full flex items-center justify-center gap-1">
                      <X className="w-4 h-4" />
                      Failed! Install App
                    </div>
                  )}

                  {card.status === "success" && (
                    <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-sm py-2.5 rounded-full flex items-center justify-center">
                      Code Sent!
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Verify Task Modal */}
        <AnimatePresence>
          {showVerifyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 z-60"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full text-center shadow-2xl"
              >
                <div className="text-5xl mb-4">⏳</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Verify Task</h3>
                <p className="text-gray-600 mb-6">
                  Did you complete the "Install App" or "Sign Up" task?
                </p>
                <button
                  onClick={handleVerifyComplete}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all"
                >
                  OK, I Completed
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email Modal */}
        <AnimatePresence>
          {showEmailModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 z-60"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full shadow-2xl"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Enter Your Email</h3>
                <p className="text-gray-600 mb-4 text-center text-sm">
                  We'll send your redeem code to this email
                </p>
                <form onSubmit={handleEmailSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:border-green-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    Submit
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 z-60"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full text-center shadow-2xl"
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Success!</h3>
                <p className="text-gray-600">
                  Your redeem code will be sent via mail soon.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdvertisementBanner;

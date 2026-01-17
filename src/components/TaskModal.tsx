import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardType: string;
  rewardAmount: string;
  taskLink: string;
}

const TaskModal = ({ isOpen, onClose, rewardType, rewardAmount, taskLink }: TaskModalProps) => {
  const handleStartStep = () => {
    window.open(taskLink, "_blank");
  };

  const steps = [
    { id: 1, colorClass: "gradient-button" },
    { id: 2, colorClass: "gradient-button" },
    { id: 3, colorClass: "gradient-orange" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-3 right-3 top-1/2 -translate-y-1/2 bg-card rounded-2xl shadow-2xl z-50 max-w-sm mx-auto overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-4 border-b gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shrink-0">
                  {rewardType === "diamonds" ? (
                    <span className="text-2xl">💎</span>
                  ) : (
                    <span className="text-2xl">🎮</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground text-base leading-tight">
                    Complete 3 steps to unlock
                  </h3>
                  <p className="text-giveaway-green font-medium text-sm">
                    💎{rewardAmount} {rewardType === "diamonds" ? "Diamonds" : ""} 💎
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Steps */}
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shrink-0">
                      <span className="text-lg">🎮</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground text-sm">Complete Step {step.id}</h4>
                      <p className="text-xs text-muted-foreground">
                        Open link → Download & Register wait 60s
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartStep}
                    className={`w-full py-3 rounded-lg ${step.colorClass} text-white font-bold shadow-md text-sm`}
                  >
                    Start Step {step.id}
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 text-center border-t">
              <p className="text-xs text-muted-foreground">
                Complete all steps to unlock the reward for this card.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;

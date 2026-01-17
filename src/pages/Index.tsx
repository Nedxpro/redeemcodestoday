import { useState } from "react";
import Header from "@/components/Header";
import WinnerNotification from "@/components/WinnerNotification";
import RewardCard from "@/components/RewardCard";
import MainRedeemCard from "@/components/MainRedeemCard";
import TaskModal from "@/components/TaskModal";
import SoundToggle from "@/components/SoundToggle";
import OnlineBadge from "@/components/OnlineBadge";
import Footer from "@/components/Footer";
import ShareFlow from "@/components/ShareFlow";

const TASK_LINK = "https://ey43.com/4/9422022";

interface Reward {
  type: "diamonds" | "redeem";
  amount: string;
}

const rewards: Reward[] = [
  { type: "diamonds", amount: "1060" },
  { type: "diamonds", amount: "5600" },
  { type: "redeem", amount: "₹1,000" },
  { type: "redeem", amount: "₹1,500" },
  { type: "redeem", amount: "₹2,000" },
  { type: "redeem", amount: "₹2,500" },
];

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const handleRedeem = (reward: Reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    setSelectedReward({ type: "redeem", amount: "₹10,000" });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen gradient-bg pb-28">
      <Header />
      
      <WinnerNotification />

      {/* Share Flow - Main Section at Top */}
      <ShareFlow taskLink={TASK_LINK} />

      {/* Main Redeem Card */}
      <MainRedeemCard 
        amount="₹10,000" 
        onDownload={handleDownload}
      />

      {/* Rewards Grid */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {rewards.map((reward, index) => (
            <RewardCard
              key={index}
              type={reward.type}
              amount={reward.amount}
              onRedeem={() => handleRedeem(reward)}
            />
          ))}
        </div>
      </div>

      <Footer />

      {/* Sound Toggle */}
      <SoundToggle />

      {/* Online Badge */}
      <OnlineBadge />

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rewardType={selectedReward?.type || "redeem"}
        rewardAmount={selectedReward?.amount || "₹10,000"}
        taskLink={TASK_LINK}
      />
    </div>
  );
};

export default Index;

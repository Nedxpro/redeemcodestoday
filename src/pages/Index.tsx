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
import VideoPlayer from "@/components/VideoPlayer";
import AdvertisementBanner from "@/components/AdvertisementBanner";

const TASK_LINK = "https://ey43.com/4/9422022";
const VIDEO_URL = "https://todayesports.com/wp-content/uploads/2026/01/km_20260109-2_480p_60f_20260109_164418.mp4";

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
    <div className="min-h-screen gradient-bg pb-24">
      <Header />
      
      {/* Winner Notification - Fixed to right */}
      <WinnerNotification />

      {/* Video Player - Top Section */}
      <div className="pt-4">
        <VideoPlayer videoUrl={VIDEO_URL} />
      </div>

      {/* Share Flow - Main Section at Top - Compact */}
      <div className="pt-4">
        <ShareFlow taskLink={TASK_LINK} />
      </div>

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

      {/* Main Redeem Cards - Ascending Order */}
      <MainRedeemCard 
        amount="₹5,000" 
        onDownload={handleDownload}
      />
      <MainRedeemCard 
        amount="₹8,500" 
        onDownload={handleDownload}
      />
      <MainRedeemCard 
        amount="₹10,000" 
        onDownload={handleDownload}
      />

      <Footer />

      {/* Sound Toggle */}
      <SoundToggle />

      {/* Online Badge */}
      <OnlineBadge />

      {/* Advertisement Banner - Shows after 6 seconds */}
      <AdvertisementBanner taskLink={TASK_LINK} />

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

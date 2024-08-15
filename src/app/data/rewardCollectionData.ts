import { RewardCard, Reward } from "@/app/types";
import rewardData from "./rewardData";

const generateRewardCollectiondata = (rewardData: Reward[]): RewardCard[] => {
	return rewardData.map((reward) => ({
		id: reward.id,
		title: reward.title,
		purchased: false,
		purchaseDate: "",
	}));
};
const rewardCollectionData = generateRewardCollectiondata(rewardData);
export default rewardCollectionData;

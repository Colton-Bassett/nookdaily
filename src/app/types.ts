export interface State {
	nmt: number | undefined;
	nmtStart: number | undefined;
	stampCollection: StampCard[] | undefined;
	rewardCollection: RewardCard[] | undefined;
	taskCollection: Task[] | undefined;
	lastSeen: string | undefined;
}

export const ACTIONS = {
	DECREMENT_NMT_BY: "decrement-nmt-by",
	ADD_STAMP: "add-stamp",
	ADD_REWARD_CARD: "add-reward-carrd",
	COMPLETE_TASK: "complete-task",
	SET_TASK_COLLECTION: "set-task-collection",
	SET_USERSTATE_NEW: "set-userstate-new",
	SET_USERSTATE_FROM_LOCAL_STORAGE: "set-userstate-from-local-storage",
	GENERATE_TASK_COLLECTION: "generate-task-collection",
	UPDATE_LAST_SEEN: "update-last-seen",
};

export interface Action {
	payload?: {
		userState?: {
			nmt: number;
			stampCollection: StampCard[];
			rewardCollection: RewardCard[];
			taskCollection: Task[];
		};
		rewardId?: string | undefined;
		rewardCost?: number | undefined;
		stampId?: string | undefined;
		task?: {
			id: string | undefined;
			points: number | undefined;
			multiplier: number | undefined;
		};
		lastSeen?: string;
	};
	// state?: { state: State };
	type: string;
}

export interface Task {
	id: string;
	name: string;
	description: string;
	type: "food" | "purchase" | "self" | "social";
	points: number;
	multiplier: number;
	imageUrl: string;
	dateAssigned?: string;
}

export interface Reward {
	id: string;
	title: string;
	description: string;
	cost: number;
	type: string;
}

export interface StampCard {
	id: string;
	title: string;
	type: string;
	stampList: {
		one: string;
		two: string;
		three: string;
		four: string;
	};
}

export interface RewardCard {
	id: string;
	title: string;
	purchased: boolean;
	purchaseDate: string;
}

// External

// Internal
import { State, Action, ACTIONS, Task, StampCard } from "@/app/types";
import tasksData from "../data/tasksData";
import stampCollectionData from "../data/stampCollectionData";
import rewardCollectionData from "../data/rewardCollectionData";

function reducer(state: State, action: Action) {
	switch (action.type) {
		// if rewardCost: reduce nmt, else reduce nmt by 0
		case ACTIONS.DECREMENT_NMT_BY:
			// destructure rewardCost from action.payload
			const { rewardCost } = action.payload || {};
			return {
				...state,
				nmt: state.nmt ? state.nmt - (rewardCost ?? 0) : state.nmt,
			};
		// checks if available slot in stampCard's stampList, adds stamp to stampCard's stampList, updates stampCollection
		case ACTIONS.ADD_STAMP: {
			// destructure stampId from payload
			const { stampId } = action.payload || {};
			const updateStampCollection = (
				stampCard: StampCard,
				date: string
			): StampCard => {
				const stampList = { ...stampCard.stampList };
				const slots = ["one", "two", "three", "four"] as const;
				for (const slot of slots) {
					if (!stampList[slot].length) {
						return {
							...stampCard,
							stampList: {
								...stampList,
								[slot]: date,
							},
						};
					}
				}
				console.log("All slots are full for stampCard", stampId);
				return stampCard;
			};

			const updatedCollection = state.stampCollection?.map((stampCard) =>
				stampCard.id === stampId
					? updateStampCollection(stampCard, getCurrentDate())
					: stampCard
			);

			return { ...state, stampCollection: updatedCollection };
		}
		// sets rewardCard to purchased and adds purchaseDate, updates rewardCollection
		case ACTIONS.ADD_REWARD_CARD:
			// destructure rewardId from action.payload
			const { rewardId } = action.payload || {};

			const updatedRewardCollection = state.rewardCollection?.map(
				(rewardCard) => {
					if (rewardCard.id === rewardId) {
						return {
							...rewardCard,
							purchased: true,
							purchaseDate: getCurrentDate(),
						};
					}
					return rewardCard;
				}
			);

			return {
				...state,
				rewardCollection: updatedRewardCollection,
			};

		// removes task, adds nmt points, adds new random task to taskCollection
		case ACTIONS.COMPLETE_TASK: {
			// destructure taskIdToRemove, points, multiplier from payload.task
			const { task } = action.payload || {};
			const { id: taskIdToRemove, points, multiplier } = task || {};

			if (!taskIdToRemove) {
				console.error("taskId missing in payload");
				return state;
			}

			// remove task
			const updatedTaskCollection = state.taskCollection
				? state.taskCollection.filter(
						(task) => task.id !== taskIdToRemove
				  )
				: [];

			// for countUp
			const updatedNMTStart = state.nmt;

			// add points to nmt
			const updatedNMT =
				state.nmt !== undefined && points && multiplier
					? state.nmt + points * multiplier
					: state.nmt ?? 0;

			// add random, unused task to taskCollection
			const usedTaskIds = new Set(
				updatedTaskCollection?.map((task) => task.id)
			);

			let randomTask;
			do {
				randomTask = getRandomTask();
			} while (usedTaskIds.has(randomTask.id));

			// update nmt, taskCollection,
			return {
				...state,
				taskCollection: [...updatedTaskCollection, randomTask],
				nmt: updatedNMT,
				nmtStart: updatedNMTStart,
			};
		}
		// sets userState to default, including randomly generated taskCollection
		case ACTIONS.SET_USERSTATE_NEW:
			return {
				...state,
				nmt: 0,
				stampCollection: stampCollectionData,
				rewardCollection: rewardCollectionData,
				taskCollection: generateTaskCollection(),
				lastSeen: getCurrentDate(),
			};
		// sets userState to data from localStorage userState payload
		case ACTIONS.SET_USERSTATE_FROM_LOCAL_STORAGE:
			// destructure userState from action.payload, // destructure properties from userState
			const { userState } = action.payload || {};
			const { nmt, stampCollection, rewardCollection, taskCollection } =
				userState || {};

			if (!userState) {
				console.error("userState from localStorage missing in payload");
				return state;
			}

			return {
				...state,
				nmt,
				stampCollection,
				rewardCollection,
				taskCollection,
			};
		case ACTIONS.GENERATE_TASK_COLLECTION:
			return {
				...state,
				taskCollection: generateTaskCollection(),
			};
		case ACTIONS.UPDATE_LAST_SEEN:
			const { lastSeen } = action.payload || {};
			return { ...state, lastSeen: lastSeen };
		default:
			return state;
	}
}

/* HELPERS */

export function getCurrentDate(): string {
	const currentDate = new Date().toLocaleDateString("en-US", {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
	});
	return currentDate;
}

function getRandomTask(): Task {
	const randomIndex = Math.floor(Math.random() * tasksData.length);
	return tasksData[randomIndex];
}

function generateTaskCollection(
	count: number = 5,
	defaultMultiplier: number = 2
): Task[] {
	console.log("generateTaskCollection called");
	// TODO: use actual multiplier from task (instead of default)
	const tasks: Task[] = [];
	const usedTaskIds = new Set<string>();

	while (tasks.length < count) {
		const randomTask = getRandomTask();

		if (!usedTaskIds.has(randomTask.id)) {
			const task: Task = {
				...randomTask,
				multiplier: defaultMultiplier,
			};
			tasks.push(task);
			usedTaskIds.add(randomTask.id);
		}
	}

	return tasks;
}

export default reducer;

import { StampCard, Task } from "@/app/types";
import TasksData from "./tasksData";

const generateStampCollectionData = (tasks: Task[]): StampCard[] => {
	return tasks.map((task) => ({
		id: task.id,
		title: task.name,
		type: task.type,
		stampList: {
			one: "",
			two: "",
			three: "",
			four: "",
		},
	}));
};
const stampCollectionData = generateStampCollectionData(TasksData);
export default stampCollectionData;

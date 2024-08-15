// External
import { Dispatch, SetStateAction } from "react";

// Internal
import styles from "../../page.module.css";

import { Task } from "../../types";
import Clouds from "./clouds";
import Tasks from "../tasks/tasks";
import Menu from "../menu/menu";
import Logic from "../logic";
import { clearAnimationStyles } from "@/app/helpers/clearAnimationStyles";

interface TopLayoutProps {
	selectedTask: Task | null;
	setSelectedTask: Dispatch<SetStateAction<Task | null>>;
	isTaskClicked: boolean;
	setIsTaskClicked: Dispatch<SetStateAction<boolean>>;
}

const TopLayout: React.FC<TopLayoutProps> = ({
	selectedTask,
	setSelectedTask,
	isTaskClicked,
	setIsTaskClicked,
}) => {
	return (
		<div
			className={styles.topContainer}
			onAnimationEnd={() => clearAnimationStyles(styles.topContainer)}
		>
			<div className={styles.backgroundTop}>
				<Clouds position="top" />
			</div>
			<Menu />
			<Logic />
			<Tasks
				selectedTask={selectedTask}
				setSelectedTask={setSelectedTask}
				isTaskClicked={isTaskClicked}
				setIsTaskClicked={setIsTaskClicked}
			/>
		</div>
	);
};

export default TopLayout;

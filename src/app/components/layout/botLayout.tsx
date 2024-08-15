// External

// Internal
import styles from "../../page.module.css";

import { Task } from "../../types";
import Trees from "./trees";
import Clouds from "./clouds";
import MilesBanner from "./milesBanner";
import { clearAnimationStyles } from "@/app/helpers/clearAnimationStyles";

interface BotLayoutProps {
	selectedTask: Task | null;
	isTaskClicked: boolean;
}

const BotLayout: React.FC<BotLayoutProps> = ({
	selectedTask,
	isTaskClicked,
}) => {
	return (
		<div className={styles.botContainer}>
			<div
				className={styles.backgroundBot}
				onAnimationEnd={() =>
					clearAnimationStyles(styles.backgroundBot)
				}
			>
				<Clouds position="bot" />
				<Trees />
				<div className={styles.grass}>
					<MilesBanner isTaskClicked={isTaskClicked}></MilesBanner>
					<p className={styles.taskText}>{selectedTask?.name}</p>
				</div>
			</div>
		</div>
	);
};

export default BotLayout;

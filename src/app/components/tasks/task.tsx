// External
import React, { useMemo } from "react";
import Image from "next/image";

// Internal
import styles from "./task.module.css";
import { Task } from "@/app/types";
import Sparkles from "../layout/sparkles";

interface TaskProps {
	selectedTask: Task | null;
	setSelectedTask: (task: Task | null) => void;
	task: Task;
	isTaskClicked: boolean;
	setIsTaskClicked: (clicked: boolean) => void;
	handleClickOpen: () => void;
	hiddenTaskId: string | undefined;
	setHiddenTaskId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TaskComponent: React.FC<TaskProps> = ({
	selectedTask,
	setSelectedTask,
	task,
	isTaskClicked,
	setIsTaskClicked,
	handleClickOpen,
	hiddenTaskId,
	setHiddenTaskId,
}) => {
	const taskImageUrl = taskTypeToImage[task.type];

	const handleMouseEnter = () => {
		if (!isTaskClicked) {
			setSelectedTask(task);
		}
	};

	const handleMouseLeave = () => {
		if (!isTaskClicked) {
			setSelectedTask(null);
		}
	};

	// 1st click selects task, 2nd click opens modal
	const handleClickTask = () => {
		setIsTaskClicked(true);
		setSelectedTask(task);
		if (selectedTask?.id === task.id) {
			if (isTaskClicked && selectedTask.id === task.id) {
				handleClickOpen();
			}
		}
	};

	const isTaskHidden = useMemo(() => {
		return task.id === hiddenTaskId;
	}, [task.id, hiddenTaskId]);

	// Logic for displaying selected/default task via css styles (colors, patterns, etc);
	const containerClassName = useMemo(() => {
		let className = styles.taskContainer;
		if (isTaskHidden) className += ` ${styles.animateDown}`;
		if (isTaskClicked && selectedTask?.id === task.id)
			className += ` ${styles.taskContainerSelected}`;
		return className;
	}, [isTaskHidden, isTaskClicked, selectedTask, task.id]);

	const circleClassName = `${styles.taskCircle} ${
		isTaskClicked && selectedTask?.id === task.id
			? styles.taskCircleSelected
			: undefined
	}`;

	const currencyClassName = `${styles.currency} ${
		isTaskClicked && selectedTask?.id === task.id
			? styles.currencySelected
			: undefined
	}`;

	const nmtIcon =
		isTaskClicked && selectedTask?.id === task.id
			? "/tasks/nmtIconMdWhite.svg"
			: "/tasks/nmtIconMdBrown.svg";

	// For <Sparkles>
	const Task = (
		<div
			className={containerClassName}
			onClick={handleClickTask}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onAnimationEnd={() => setIsTaskClicked(false)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				viewBox="0 0 233.5 248"
				height={300}
				width={300}
			>
				<pattern
					id="repeating-linear-gradient"
					patternUnits="userSpaceOnUse"
					width="32"
					height="32"
					patternTransform="rotate(45)"
				>
					<rect width="16" height="32" fill="#5578d6" />
					<rect x="16" width="16" height="32" fill="#496dcb" />
				</pattern>
				<g
					fill={
						isTaskClicked && selectedTask?.id === task.id
							? "url(#repeating-linear-gradient)"
							: "#f7f3dd"
					}
				>
					<path d="M223,94.5c0-26.9238892-11.7954254-49.0488892-30.9431381-64.4429169S146.4091492,6,117,6,60.8408508,14.6630554,41.4431381,30.0570831,10,67.5761108,10,94.5c0,7.8598671,1.027493,16.1625884,2.9649674,24.6116235s4.7849301,17.0443838,8.4248556,25.4895057c1.923788,4.4634497,3.0609895,9.18856,3.4303029,13.9785382s-.0292611,9.644824-1.1770251,14.3677449c-1.170014,4.8144772-2.0807892,9.2145388-2.6990609,13.0925238s-.9440399,7.2338933-.9440399,9.960064c0,18.5015259,14.9992371,30.0015259,34.6238556,36.8761444s43.8746185,9.1238556,62.3761444,9.1238556,42.7515259-2.2492371,62.3761444-9.1238556,34.6238556-18.3746185,34.6238556-36.8761444c0-2.8603146-.3592094-6.414672-1.0387987-10.5381664s-1.6795586-8.8161258-2.9610783-13.9529884c-1.1376013-4.5599779-1.5376048-9.2509516-1.1985088-13.8853142s1.4172914-9.2121143,3.2360878-13.545648c3.5103791-8.3639634,6.2509536-16.8690953,8.1139333-25.2279058s2.8483646-16.5712995,2.8483646-24.3499771Z" />
				</g>
			</svg>
			<div className={circleClassName}></div>
			<Image
				src={taskImageUrl}
				width={170}
				height={170}
				alt="task icon"
				className={styles.taskIcon}
			/>
			<div className={styles.taskDataContainer}>
				<Image
					src={nmtIcon}
					width={49}
					height={32}
					alt="nmt"
					className={styles.nmt}
				/>
				<p className={currencyClassName}>{task.points}</p>
				{task.multiplier === 2 && (
					<div className={styles.multiplierBadge}>x2</div>
				)}
			</div>
			<div className={styles.bubbleContainer}>
				{[...Array(3)].map((_, index) => (
					<Bubble
						key={index}
						selectedTask={selectedTask}
						task={task}
						isTaskClicked={isTaskClicked}
					/>
				))}
			</div>
		</div>
	);

	return (
		<>
			{isTaskClicked && selectedTask?.id === task.id ? (
				<Sparkles>{Task}</Sparkles>
			) : (
				Task
			)}
		</>
	);
};

// HELPERS
const taskTypeToImage: { [key: string]: string } = {
	food: "/tasks/foodTaskIcon.svg",
	purchase: "/tasks/purchaseTaskIcon.svg",
	self: "/tasks/selfcareTaskIcon.svg",
	social: "/tasks/friendTaskIcon.svg",
};

interface BubbleProps {
	selectedTask?: Task | null;
	task: Task;
	isTaskClicked: boolean;
}

const Bubble: React.FC<BubbleProps> = ({
	selectedTask,
	task,
	isTaskClicked,
}) => {
	const getClassName = () => {
		if (selectedTask?.id === task.id) {
			return `${styles.bubble} ${
				isTaskClicked ? styles.bubbleSelected : undefined
			}`;
		}
		return "";
	};

	return <div className={getClassName()}></div>;
};

// Not sure what this was for but it looks important
// export const useOutsideClick = (callback: () => void) => {
// 	const ref = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
// 			if (ref.current && !ref.current.contains(event.target as Node)) {
// 				callback();
// 			}
// 		};

// 		document.addEventListener("mouseup", handleClickOutside);
// 		document.addEventListener("touchend", handleClickOutside);

// 		return () => {
// 			document.removeEventListener("mouseup", handleClickOutside);
// 			document.removeEventListener("touchend", handleClickOutside);
// 		};
// 	}, [callback]);

// 	return ref;
// };

export default TaskComponent;

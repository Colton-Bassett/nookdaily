"use client";

// External
import React, {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Internal
import styles from "./tasks.module.css";
import { Task } from "@/app/types";
import { StateContext } from "../stateContext";
import TaskModal from "./taskModal";
import TaskComponent from "./task";

interface TaskProps {
	selectedTask: Task | null;
	setSelectedTask: Dispatch<SetStateAction<Task | null>>;
	isTaskClicked: boolean;
	setIsTaskClicked: Dispatch<SetStateAction<boolean>>;
}

const Tasks: React.FC<TaskProps> = ({
	selectedTask,
	setSelectedTask,
	isTaskClicked,
	setIsTaskClicked,
}) => {
	const [openModal, setOpenModal] = React.useState(false);

	const [hiddenTaskId, setHiddenTaskId] = React.useState<
		string | undefined
	>();
	const taskRef = useRef(null);
	const modalRef = useRef(null);

	const state = useContext(StateContext);
	const tasks = state?.taskCollection;

	function NextArrow(props: any) {
		const { className, style, onClick } = props;
		return (
			<div
				className={`${className} ${styles.arrow} ${styles.nextArrow}`}
				style={{ ...style }}
				onClick={onClick}
			/>
		);
	}

	function PrevArrow(props: any) {
		const { className, style, onClick } = props;
		return (
			<div
				className={`${className} ${styles.arrow} ${styles.prevArrow}`}
				style={{ ...style }}
				onClick={onClick}
			/>
		);
	}

	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1550,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	const handleClickOpen = () => {
		setOpenModal(true);
	};

	const handleClose = () => {
		setOpenModal(false);
		setIsTaskClicked(false);
		setSelectedTask(null);
	};

	// used to track clicks outside of tasks (resets taskSelection)
	useEffect(() => {
		document.body.addEventListener("click", (event) => {
			if (
				taskRef.current &&
				!event.composedPath().includes(taskRef.current) &&
				!event.composedPath().includes(modalRef.current!)
			) {
				setIsTaskClicked(false);
				setSelectedTask(null);
			}
		});
	}, []);

	return (
		<div className={styles.tasks} ref={taskRef}>
			<Slider {...settings}>
				{tasks &&
					tasks.map((task, index) => (
						<TaskComponent
							key={task.id}
							task={task}
							selectedTask={selectedTask}
							setSelectedTask={setSelectedTask}
							isTaskClicked={isTaskClicked}
							setIsTaskClicked={setIsTaskClicked}
							handleClickOpen={handleClickOpen}
							hiddenTaskId={hiddenTaskId}
							setHiddenTaskId={setHiddenTaskId}
						></TaskComponent>
					))}
			</Slider>
			<TaskModal
				openModal={openModal}
				handleClose={handleClose}
				selectedTask={selectedTask}
				setHiddenTaskId={setHiddenTaskId}
				modalRef={modalRef}
			></TaskModal>
		</div>
	);
};

export default Tasks;

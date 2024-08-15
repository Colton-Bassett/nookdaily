// External
import { useCallback, useContext, useState } from "react";
import Image from "next/image";
import { Backdrop, Modal, Fade, Slide } from "@mui/material";

// Internal
import styles from "./taskModal.module.css";
import { ACTIONS, Task } from "@/app/types";
import { StateDispatchContext } from "../stateContext";
import { polkaDotBackground } from "../logic";
import Sparkles from "../layout/sparkles";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

interface taskModalProps {
	openModal: boolean;
	handleClose: () => void;
	selectedTask: Task | null;
	setHiddenTaskId: React.Dispatch<React.SetStateAction<string | undefined>>;
	modalRef: React.MutableRefObject<null>;
}

const CLOSE_MODAL_DELAY = 2500;
const HIDE_ANIMATE_DELAY = 750;

const TaskModal: React.FC<taskModalProps> = ({
	openModal,
	handleClose,
	selectedTask,
	setHiddenTaskId,
	modalRef,
}) => {
	const dispatch = useContext(StateDispatchContext);
	const [isRedeemClicked, setIsRedeemClicked] = useState(false);

	// const handleCompleteTask = () => {
	// 	const task = {
	// 		id: selectedTask?.id,
	// 		points: selectedTask?.points,
	// 		multiplier: selectedTask?.multiplier,
	// 	};
	// 	// figure out this disptach oof
	// 	dispatch?.({
	// 		type: ACTIONS.COMPLETE_TASK,
	// 		payload: {
	// 			task: task,
	// 		},
	// 	});

	// 	dispatch?.({
	// 		type: ACTIONS.ADD_STAMP,
	// 		payload: { stampId: selectedTask?.id },
	// 	});
	// };

	const handleCompleteTask = useCallback(() => {
		setTimeout(() => {
			if (selectedTask) {
				const { id, points, multiplier } = selectedTask;
				dispatch?.({
					type: ACTIONS.COMPLETE_TASK,
					payload: { task: { id, points, multiplier } },
				});

				dispatch?.({
					type: ACTIONS.ADD_STAMP,
					payload: { stampId: id },
				});
				setHiddenTaskId(undefined);
			}
		}, HIDE_ANIMATE_DELAY);
	}, [selectedTask, dispatch]);

	const handleCloseModalWithDelay = useCallback(() => {
		setIsRedeemClicked(true);
		setTimeout(() => {
			handleCompleteTask();
			if (selectedTask) {
				setHiddenTaskId(selectedTask.id);
			}
			setIsRedeemClicked(false);
			handleClose();
		}, CLOSE_MODAL_DELAY);
	}, [handleClose, handleCompleteTask, selectedTask, setHiddenTaskId]);

	return (
		<Modal
			open={openModal}
			onClose={handleClose}
			aria-label="task-modal"
			ref={modalRef}
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					sx: {
						...polkaDotBackground,
					},
				},
			}}
		>
			<div className={styles.modalContainer}>
				<div className={styles.modal}>
					<div className={styles.container}>
						<div className={styles.popFluffContainer}>
							<div className={styles.popFluffL}></div>
							<div className={styles.popFluffR}></div>
						</div>
						<div className={styles.popFluffContainer}>
							<div className={styles.popFluffL}></div>
							<div className={styles.popFluffR}></div>
						</div>
						<h2 className={styles.title}>You got Nook Miles!</h2>{" "}
						<div className={styles.redeemContainer}>
							<div
								className={
									isRedeemClicked
										? styles.plinkAnimate
										: styles.plinkHide
								}
							>
								<Image
									src="/taskModal/redeemButtonPlinkL.svg"
									width={20}
									height={120}
									alt="redeem plink"
									aria-hidden={true}
									className={`${styles.redeemButtonPlink} 
									${styles.plinkL}`}
								></Image>
							</div>
							<Sparkles
								children={
									<button
										className={styles.redeemButton}
										type="button"
										aria-label="Redeem miles"
										onClick={handleCloseModalWithDelay}
									>
										<Image
											src="/taskModal/redeemNmtIcon.svg"
											width={58}
											height={41}
											alt="nmt icon"
											className={styles.nmt}
										></Image>
										<p className={styles.points}>
											{selectedTask?.points}
										</p>
									</button>
								}
							></Sparkles>

							{selectedTask?.multiplier === 2 && (
								<div className={styles.multiplierBadge}>x2</div>
							)}

							<div
								className={
									isRedeemClicked
										? styles.plinkAnimate
										: styles.plinkHide
								}
							>
								<Image
									src="/taskModal/redeemButtonPlinkR.svg"
									width={20}
									height={120}
									alt="redeem plink"
									aria-hidden={true}
									className={`${styles.redeemButtonPlink} 
									${styles.plinkR}`}
								></Image>
							</div>
						</div>
						<Image
							src="/taskModal/tanuki.gif"
							width={150}
							height={100}
							alt="tanuki"
							unoptimized={true}
							className={
								isRedeemClicked
									? styles.showTanukiGif
									: styles.tanukiGif
							}
						></Image>
						<div className={styles.worldContainer}>
							<Image
								src="/taskModal/world.svg"
								width={1000}
								height={500}
								alt="world"
								className={
									isRedeemClicked
										? styles.animateWorld
										: styles.world
								}
							></Image>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

// Slide up transition
const MenuDialogTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default TaskModal;

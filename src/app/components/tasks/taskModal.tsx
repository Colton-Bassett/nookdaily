// External
import React from "react";
import { useContext, useState } from "react";
import Image from "next/image";
import { Backdrop, Modal } from "@mui/material";

// Internal
import styles from "./taskModal.module.css";
import { ACTIONS, Task } from "@/app/types";
import { StateDispatchContext } from "../stateContext";
import { polkaDotBackground } from "../../helpers/polkaDotBackground";
import Sparkles from "../layout/sparkles";

interface taskModalProps {
	openModal: boolean;
	handleClose: () => void;
	selectedTask: Task | null;
	setHiddenTaskId: React.Dispatch<React.SetStateAction<string | undefined>>;
	modalRef: React.MutableRefObject<null>;
}

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

	const dispatchCompleteTask = () => {
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
	};

	const handleAnimationEnd = () => {
		setTimeout(() => {
			dispatchCompleteTask();
			if (selectedTask) {
				setHiddenTaskId(selectedTask.id);
			}
			setIsRedeemClicked(false);

			handleClose();
		}, HIDE_ANIMATE_DELAY);
	};

	// Mobile view vs. Desktop
	const handleRedeem = () => {
		const worldContainer = document.querySelector(
			`.${styles.worldContainer}`
		);
		if (worldContainer) {
			const computedStyle = window.getComputedStyle(worldContainer);
			// Mobile
			if (computedStyle.display === "none") {
				handleAnimationEnd();
			} else {
				// Desktop
				setIsRedeemClicked(true);
			}
		}
	};

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
									className={`${styles.redeemButtonPlink} 
									${styles.plinkL}`}
								></Image>
							</div>
							<Sparkles>
								<button
									className={styles.redeemButton}
									type="button"
									aria-label="Redeem miles"
									onClick={handleRedeem}
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
							</Sparkles>

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
								onAnimationEnd={handleAnimationEnd}
							></Image>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default TaskModal;

// External
import React, { useContext } from "react";
import Image from "next/image";

// prettier-ignore
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Modal } from "@mui/material";

// Internal
import styles from "./rewardStore.module.css";
import { StateContext, StateDispatchContext } from "../../stateContext";
import { Reward, ACTIONS } from "@/app/types";
import rewardData from "../../../data/rewardData";
import { formatNumberWithCommas } from "../../../helpers/formatNumber";

const RewardStore: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const [selectedReward, setSelectedReward] = React.useState<Reward | null>(
		null
	);

	const selectReward = (reward: Reward) => {
		setSelectedReward(reward);
		handleClickOpen();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<TableContainer component={Paper}>
			<Table size="small" aria-label="reward store">
				<TableBody>
					{rewardData.map((row) => (
						<TableRow
							key={row.id}
							className={styles.row}
							onClick={() => selectReward(row)}
						>
							<TableCell
								component="th"
								className={styles.cell}
							></TableCell>
							<TableCell align="right" className={styles.cell}>
								{row.title}
							</TableCell>
							<TableCell align="right" className={styles.cell}>
								<Image
									src="/menu/nmtIconSmBlack.svg"
									width={25}
									height={16}
									alt="nmt"
									className={styles.nmtIcon}
								></Image>
								{formatNumberWithCommas(row.cost)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<RedeemModal
				open={open}
				handleClose={handleClose}
				selectedReward={selectedReward}
			/>
		</TableContainer>
	);
};

// REDEEM MODAL
interface RedeemModalProps {
	open: boolean;
	handleClose: () => void;
	selectedReward: Reward | null;
}

const RedeemModal: React.FC<RedeemModalProps> = ({
	open,
	handleClose,
	selectedReward,
}) => {
	const dispatch = useContext(StateDispatchContext);
	const state = useContext(StateContext);

	const handlePurchaseReward = () => {
		dispatch?.({
			type: ACTIONS.DECREMENT_NMT_BY,
			payload: { rewardCost: selectedReward?.cost },
		});
		dispatch?.({
			type: ACTIONS.ADD_REWARD_CARD,
			payload: { rewardId: selectedReward?.id },
		});

		handleClose();
	};

	const canPurchaseReward = () => {
		if (state && selectedReward) {
			const canPurchase = (state.nmt ?? 0) >= selectedReward.cost;
			return canPurchase;
		}
		return false;
	};

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="redeem modal"
				aria-describedby="redeem reward for nmt points"
			>
				<div className={styles.redeemModal}>
					{canPurchaseReward() ? (
						<RedeemText
							cost={selectedReward?.cost}
							title={selectedReward?.title}
						/>
					) : (
						<NotEnoughMilesText />
					)}

					<div className={styles.redeemModalActions}>
						{canPurchaseReward() ? (
							<div className={styles.redeemModalButtonContainer}>
								<RedeemButton
									onClick={handlePurchaseReward}
									label="Redeem"
								/>
								<CloseButton onClick={handleClose} label="No" />
							</div>
						) : (
							<div>
								<CloseButton onClick={handleClose} label="Ok" />
							</div>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
};

/* redeemModal UI components */
interface RedeemTextProps {
	cost: number | undefined;
	title: string | undefined;
}

interface ButtonProps {
	onClick: () => void;
	label: string;
}

const RedeemText: React.FC<RedeemTextProps> = ({ cost, title }) => (
	<h2 id="redeem-modal-title" className={styles.redeemText}>
		Redeem <span className={styles.redeemAccentText}>{cost}</span> miles for
		a
		<br />
		<span className={styles.redeemAccentText}>{title}</span>?
	</h2>
);

const NotEnoughMilesText: React.FC = () => (
	<h2 id="redeem-modal-title" className={styles.redeemText}>
		Not enough miles
	</h2>
);

const RedeemButton: React.FC<ButtonProps> = ({ onClick, label }) => (
	<button
		className={styles.redeemModalButton}
		type="button"
		onClick={onClick}
	>
		{label}
	</button>
);

const CloseButton: React.FC<ButtonProps> = ({ onClick, label }) => (
	<button
		className={styles.redeemModalButton}
		type="button"
		onClick={onClick}
	>
		{label}
	</button>
);

export default RewardStore;

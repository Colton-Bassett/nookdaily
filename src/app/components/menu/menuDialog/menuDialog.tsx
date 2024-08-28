// External
import React, { useMemo } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
// prettier-ignore
import { Backdrop, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

// Internal
import styles from "./menuDialog.module.css";
import { MenuTabButtons, MenuTabContent } from "./menuTabs";
import { polkaDotBackground } from "../../../helpers/polkaDotBackground";

interface MenuDialogProps {
	open: boolean;
	handleClose: () => void;
}

const MenuDialog: React.FC<MenuDialogProps> = ({ open, handleClose }) => {
	const [tabIndex, setTabIndex] = React.useState(0);

	const dialogStyle = useMemo(
		() => ({
			"& .MuiPaper-root": {
				color: "white",
				background: "#c5d2f5",
				width: "848px",
				maxWidth: "848px",
				minHeight: "425px",
				borderRadius: "16px",
			},
		}),
		[]
	);

	const backdropProps = useMemo(
		() => ({
			sx: {
				...polkaDotBackground,
			},
		}),
		[]
	);

	const dialogContentStyle = useMemo(
		() => ({
			paddingBottom: "0px !important",
			"& .MuiPaper-root": {
				borderRadius: "0px !important",

				maxWidth: "100% !important",
				maxHeight: "425px !important",
				boxShadow: "none",
			},
		}),
		[]
	);

	return (
		<>
			<Dialog
				open={open}
				TransitionComponent={MenuDialogTransition}
				keepMounted
				onClose={handleClose}
				aria-describedby="NMT-menu"
				slots={{ backdrop: Backdrop }}
				slotProps={{ backdrop: backdropProps }}
				sx={dialogStyle}
			>
				<DialogTitle className={styles.title}>
					<MenuTabButtons
						tabIndex={tabIndex}
						setTabIndex={setTabIndex}
					/>

					<div className={styles.titleWaveContainer}>
						<Image
							src="/menu/titleWaveTop.svg"
							width={850}
							height={130}
							alt="title wave top"
							className={styles.titleWaveTop}
						></Image>
						<Image
							src="/menu/titleWaveBot.svg"
							width={850}
							height={130}
							alt="title wave bot"
							className={styles.titleWaveBot}
						></Image>
					</div>
				</DialogTitle>
				<DialogContent sx={dialogContentStyle}>
					<MenuTabContent tabIndex={tabIndex} />
				</DialogContent>
				<DialogActions className={styles.actions}>
					<div className={styles.closeContainer}>
						<button
							className={styles.close}
							type="button"
							onClick={handleClose}
						>
							<div className={styles.accentLetter}>
								<span>B</span>
							</div>
							Back
						</button>
					</div>

					<div className={styles.actionsWaveContainer}>
						<Image
							src="/menu/actionsWaveTop.svg"
							width={850}
							height={70}
							alt="actions wave top"
							className={styles.actionsWaveTop}
						></Image>
						<Image
							src="/menu/actionsWaveBot.svg"
							width={850}
							height={70}
							alt="actions wave bot"
							className={styles.actionsWaveBot}
						></Image>
					</div>
				</DialogActions>
			</Dialog>
		</>
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

export default MenuDialog;

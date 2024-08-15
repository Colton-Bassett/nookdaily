// External
import React, { useContext } from "react";
import CountUp from "react-countup";

// Internal
import styles from "./menu.module.css";

import { StateContext } from "../stateContext";
import MenuDialog from "./menuDialog/menuDialog";

// Menu
interface MenuProps {}

const Menu: React.FC<MenuProps> = ({}) => {
	const [open, setOpen] = React.useState(false);
	const state = useContext(StateContext);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div className={styles.menuContainer}>
			<button
				className={styles.menuButton}
				type="button"
				aria-label="Open Menu"
				onClick={() => handleClickOpen()}
			>
				<CountUp
					start={state?.nmtStart ?? 0}
					end={state?.nmt ?? 0}
					className={styles.nmtCount}
				></CountUp>
			</button>
			<MenuDialog open={open} handleClose={handleClose}></MenuDialog>
		</div>
	);
};

export default Menu;

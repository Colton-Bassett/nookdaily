// External
import { Paper } from "@mui/material";
import { useContext, useMemo } from "react";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";

// Internal
import styles from "./rewardCollection.module.css";
import { StateContext } from "../../stateContext";

const RewardCollection: React.FC = () => {
	const state = useContext(StateContext);

	const tooltipStyle = useMemo(
		() => ({
			padding: "10px",
			textAlign: "center",
			fontSize: "18px",
			backgroundColor: "#5879af",
			maxWidth: "175.5px",
		}),
		[]
	);

	const tooltipArrowStyle = useMemo(
		() => ({
			color: "#5879af",
		}),
		[]
	);

	const divs = state?.rewardCollection.map((card, index) => (
		<Tooltip
			title={card.title}
			placement="top"
			arrow
			key={index}
			slotProps={{
				tooltip: { sx: tooltipStyle },
				arrow: { sx: { color: tooltipArrowStyle } },
			}}
		>
			<div key={index} className={styles.rewardCard}>
				<div className={styles.rewardCardInner}>
					{card.purchased && (
						<Image
							src={"/menu/collectionSticker.svg"}
							width={125}
							height={125}
							alt="collection sticker"
						/>
					)}
				</div>
			</div>
		</Tooltip>
	));
	return <Paper className={styles.rewardCollection}>{divs}</Paper>;
};

export default RewardCollection;

// External
import { ReactNode, useContext } from "react";
import Image from "next/image";

import { Paper } from "@mui/material";

// Internal
import styles from "./stampCollection.module.css";
import { StateContext } from "../../stateContext";

const StampCollection: React.FC = () => {
	const state = useContext(StateContext);

	const StampCardCollection = state?.stampCollection?.map((card, index) => (
		<div key={index} className={styles.stampCard}>
			<div className={styles.stampCardInner}>
				<div
					className={styles.stampTitle}
					style={{ backgroundColor: getBackgroundTitle(card.type) }}
				>
					{card.title}
				</div>
				<div
					className={styles.stampBody}
					style={{ backgroundColor: getBackgroundBottom(card.type) }}
				>
					{renderProgressCircle(
						card.stampList.one.length > 0 &&
							renderStamp(card.stampList.one, card.type)
					)}
					{renderProgressCircle(
						card.stampList.two.length > 0 &&
							renderStamp(card.stampList.two, card.type)
					)}
					{renderProgressCircle(
						card.stampList.three.length > 0 &&
							renderStamp(card.stampList.three, card.type)
					)}
					{renderProgressCircle(
						card.stampList.four.length > 0 &&
							renderStamp(card.stampList.four, card.type)
					)}
				</div>
			</div>
		</div>
	));

	return (
		<Paper className={styles.stampCardsContainer}>
			{StampCardCollection}
		</Paper>
	);
};

const renderProgressCircle = (content: ReactNode) => (
	<div className={styles.stampBgContainer}>
		<div className={styles.stampBg}>{content}</div>
	</div>
);

const renderStamp = (date: string, cardType: string) => (
	<div className={styles.stampContainer}>
		<Image
			src={getStampType(cardType)}
			width={74}
			height={74}
			alt="stamp"
			className={styles.stamp}
		/>
		<p className={getTextStyle(cardType)}>{date}</p>
	</div>
);

const getBackgroundTitle = (cardType: string): string => {
	switch (cardType) {
		case "food":
			return "#faf9b6";
		case "self":
			return "#c1ebe1";
		case "purchase":
			return "#fae5d2";
		case "social":
			return "#d6e3f4";
		default:
			return "gray";
	}
};

const getBackgroundBottom = (cardType: string): string => {
	switch (cardType) {
		case "food":
			return "#e2eb92";
		case "self":
			return "#a9e0da";
		case "purchase":
			return "#fad6c0";
		case "social":
			return "#bcc9ec";
		default:
			return "gray";
	}
};

const getStampType = (cardType: string): string => {
	switch (cardType) {
		case "food":
			return "/stamps/foodStamp.svg";
		case "self":
			return "/stamps/selfStamp.svg";
		case "purchase":
			return "/stamps/purchaseStamp.svg";
		case "social":
			return "/stamps/friendStamp.svg";
		default:
			return "/stamps/selfStamp.svg";
	}
};

const getTextStyle = (cardType: string): string => {
	switch (cardType) {
		case "food":
			return `${styles.foodText}`;
		case "self":
			return `${styles.selfText}`;
		case "purchase":
			return `${styles.purchaseText}`;
		case "social":
			return `${styles.socialText}`;
		default:
			return `${styles.selfText}`;
	}
};
export default StampCollection;

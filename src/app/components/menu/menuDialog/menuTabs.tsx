// External
import React, { useState } from "react";
import Image from "next/image";
import { Tabs, Tab } from "@mui/material";

// Internal
import styles from "./menuTabs.module.css";
import RewardStore from "../rewardStore/rewardStore";
import StampCollection from "../stampCollection/stampCollection";
import RewardCollection from "../rewardCollection/rewardCollection";

interface MenuTabButtonProps {
	tabIndex: number;
	setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MenuTabButtons: React.FC<MenuTabButtonProps> = ({
	tabIndex,
	setTabIndex,
}) => {
	const [selectedTab, setSelectedTab] = useState<string | null>("tab1");

	// changes color of tab button
	const handleUpdateTabColor = (buttonId: string) => {
		setSelectedTab(buttonId);
	};

	// changes tabs
	const handleChangeTab = (event: React.SyntheticEvent, newIndex: number) => {
		setTabIndex(newIndex);
	};

	const renderTabIcon = (src: string, alt: string, isSelected: boolean) => {
		return (
			<Image
				src={src}
				width={50}
				height={`${isSelected ? 55 : 40}`}
				alt={alt}
				className={`${
					isSelected ? styles.selectedTabIcon : styles.tabIcon
				}`}
			/>
		);
	};

	return (
		<Tabs
			className={styles.tabButtonContainer}
			value={tabIndex}
			onChange={handleChangeTab}
			aria-label="menu tabs"
			sx={{
				"& .MuiTabs-indicator": { display: "none" },
				"& .MuiTabs-flexContainer": {
					minHeight: "85px",
					alignItems: "end",
				},
			}}
		>
			<Tab
				className={`${styles.tabButton} ${
					tabIndex === 0
						? `${styles.tabButtonTooltip} ${styles.tooltipRewards} `
						: ""
				}`}
				disableRipple={true}
				onClick={() => handleUpdateTabColor("tab1")}
				icon={renderTabIcon(
					"/menu/rewardsTabIcon.svg",
					"reward store",
					selectedTab === "tab1"
				)}
				{...a11yProps(0)}
			/>

			<Tab
				className={`${styles.tabButton} ${
					tabIndex === 1
						? `${styles.tabButtonTooltip} ${styles.tooltipStamps} `
						: ""
				}`}
				disableRipple={true}
				onClick={() => handleUpdateTabColor("tab2")}
				icon={renderTabIcon(
					"/menu/stampsTabIcon.svg",
					"stamp collection",
					selectedTab === "tab2"
				)}
				{...a11yProps(1)}
			/>
			<Tab
				className={`${styles.tabButton} ${
					tabIndex === 2
						? `${styles.tabButtonTooltip} ${styles.tooltipCollection} `
						: ""
				}`}
				disableRipple={true}
				onClick={() => handleUpdateTabColor("tab3")}
				icon={renderTabIcon(
					"/menu/collectionTabIcon.svg",
					"collection",
					selectedTab === "tab3"
				)}
				{...a11yProps(2)}
			/>
		</Tabs>
	);
};

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	tabIndex: number;
}

// accessibility
function a11yProps(index: number) {
	return {
		id: `menu-tab-${index}`,
		"aria-controls": `menu-tabpanel-${index}`,
	};
}

const MenuTabPanel: React.FC<TabPanelProps> = ({
	children,
	tabIndex,
	index,
}) => (
	<div
		role="tabpanel"
		hidden={tabIndex !== index}
		id={`menu-tabpanel-${index}`}
		aria-labelledby={`menu-tab-${index}`}
	>
		{tabIndex === index && children}
	</div>
);

interface MenuTabsPanels {
	tabIndex: number;
}

const MenuTabContent: React.FC<MenuTabsPanels> = ({ tabIndex }) => {
	return (
		<>
			<MenuTabPanel tabIndex={tabIndex} index={0}>
				<RewardStore />
			</MenuTabPanel>
			<MenuTabPanel tabIndex={tabIndex} index={1}>
				<StampCollection />
			</MenuTabPanel>
			<MenuTabPanel tabIndex={tabIndex} index={2}>
				<RewardCollection />
			</MenuTabPanel>
		</>
	);
};

export { MenuTabContent, MenuTabButtons };

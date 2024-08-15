// External
import Image from "next/image";

// Internal
import styles from "../../page.module.css";
import Sparkles from "./sparkles";

interface MilesBannerProps {
	isTaskClicked: boolean | null;
}

const MilesBanner: React.FC<MilesBannerProps> = ({ isTaskClicked }) => {
	return (
		<div className={styles.bannerContainer}>
			{isTaskClicked && (
				<Sparkles
					children={
						<div className={styles.milesBanner}>
							<Image
								src="/milesconfirmation.svg"
								width={442}
								height={120}
								alt="miles confirmation banner"
							></Image>
							<p className={styles.bannerText}>Get miles!</p>
						</div>
					}
				></Sparkles>
			)}
		</div>
	);
};

export default MilesBanner;

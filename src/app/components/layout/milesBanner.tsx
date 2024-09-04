// External
import Image from "next/image";

// Internal
import styles from "../../page.module.css";
import Sparkles from "./sparkles";
import { useState } from "react";

const MilesBanner: React.FC = () => {
	const [isSvgLoaded, setIsSvgLoaded] = useState(false);
	const handleSvgLoad = () => {
		setIsSvgLoaded(true);
	};

	return (
		<div className={styles.bannerContainer}>
			<Sparkles>
				<div className={styles.milesBanner}>
					<Image
						src="/milesconfirmation.svg"
						width={442}
						height={120}
						alt="miles confirmation banner"
						onLoad={handleSvgLoad}
					></Image>
					{isSvgLoaded && (
						<p className={styles.bannerText}>Get miles!</p>
					)}
				</div>
			</Sparkles>
		</div>
	);
};

export default MilesBanner;

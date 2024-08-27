// Internal
import React from "react";
import styles from "../../page.module.css";

// bottom fill color: #c9d2f6

interface CloudsProps {
	position: "top" | "bot"; // Prop for specifying the position of clouds
}

const Clouds: React.FC<CloudsProps> = React.memo(({ position }) => {
	const motionDuration = 100; // The duration of the animation;
	const cloudInterval = motionDuration * 0.1; // How close the clouds are (10%)

	let cloudColor = position === "top" ? "#c4d5f6" : "#bfcdf5";
	const CloudStyle =
		position === "top"
			? styles.infiniteScrollTop
			: styles.infiniteScrollBot;

	const CreateCloudA: React.FC<{ id: string }> = ({ id }) => {
		return (
			<g id={id} transform="translate(0, -50)">
				<ellipse
					cx="17.5"
					cy="47"
					rx="17.5"
					ry="14"
					fill={cloudColor}
				/>
				<ellipse
					cx="41.5"
					cy="45.5"
					rx="20.5"
					ry="18.5"
					fill={cloudColor}
				/>
				<ellipse
					cx="64.5"
					cy="47"
					rx="17.5"
					ry="14"
					fill={cloudColor}
				/>
				<ellipse cx="88" cy="20" rx="16" ry="13" fill={cloudColor} />
				<ellipse cx="112" cy="20" rx="16" ry="13" fill={cloudColor} />
			</g>
		);
	};

	const CreateCloudB: React.FC<{ id: string }> = ({ id }) => {
		return (
			<g id={id} transform="translate(0, -50)">
				<ellipse
					cx="77.7"
					cy="15.74"
					rx="13.65"
					ry="10.92"
					fill={cloudColor}
				/>
				<ellipse
					cx="96.42"
					cy="14.57"
					rx="15.99"
					ry="14.43"
					fill={cloudColor}
				/>
				<ellipse
					cx="114.35"
					cy="15.74"
					rx="13.65"
					ry="10.92"
					fill={cloudColor}
				/>
				<ellipse cx="12.5" cy="55" rx="12.5" ry="9" fill={cloudColor} />
			</g>
		);
	};

	const CreateCloudSet: React.FC = () => {
		const cloudSet = () => {
			let clouds = [];
			let cloudCount = 11;
			let startValue = 0;

			if (position === "top") {
				cloudCount = 24;
				startValue = 12;
			}
			for (let i = startValue; i <= cloudCount; i++) {
				const CloudComponent =
					i % 2 === 0 ? CreateCloudB : CreateCloudA;
				clouds.push(
					<CloudComponent key={`cloud${i}`} id={`cloud${i}`} />
				);
			}
			return clouds;
		};

		return <>{cloudSet()}</>;
	};

	const CreateAnimateMotion: React.FC<{ id: string; begin: string }> = ({
		id,
		begin,
	}) => {
		return (
			<animateMotion
				xlinkHref={"#" + id}
				dur={motionDuration + "s"}
				begin={begin}
				fill="freeze"
				repeatCount="indefinite"
			>
				<mpath xlinkHref="#motionPath" />
			</animateMotion>
		);
	};

	const CreateAnimateMotionSet: React.FC = () => {
		const animateMotionSet = () => {
			const animateMotions = [];
			let items = 12;
			let startValue = 0;

			if (position === "top") {
				items = 24;
				startValue = 12;
			}

			for (let i = startValue; i <= items; i++) {
				const begin = i === 1 ? "0s" : `-${cloudInterval * (i - 1)}s`; // Set begin value dynamically
				animateMotions.push(
					<CreateAnimateMotion
						key={`cloud${i}`}
						id={`cloud${i}`}
						begin={begin}
					/>
				);
			}
			return animateMotions;
		};

		return <>{animateMotionSet()}</>;
	};

	return (
		<svg
			width="2000"
			height="150"
			viewBox="0 0 2000 150"
			className={CloudStyle}
		>
			<path
				id="motionPath"
				fill="none"
				// Display motion path
				// stroke="#000000"
				// strokeMiterlimit="10"
				d="M2000,190Q1000,-85,0,190"
			/>

			<CreateCloudSet />
			<CreateAnimateMotionSet />
		</svg>
	);
});

Clouds.displayName = "Clouds";

export default Clouds;

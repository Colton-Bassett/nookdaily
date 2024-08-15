// External
import React from "react";
import styles from "../../page.module.css";
// Internal
import { CSSProperties, ReactNode } from "react";

const DEFAULT_COLOR = "hsl(270, 7%, 89%)";

const generateSparkle = (color = DEFAULT_COLOR): Sparkle => {
	return {
		id: String(random(10000, 99999)),
		createdAt: Date.now(),
		// Bright yellow color:
		color,
		size: random(10, 20),
		style: {
			// Pick a random spot in the available space
			top: random(0, 100) + "%",
			left: random(0, 100) + "%",
			// Float sparkles above sibling content
			zIndex: 2,
		},
	};
};

interface SparklesProps {
	children: ReactNode;
}

function Sparkles({ children }: SparklesProps) {
	const [sparkles, setSparkles] = React.useState<Sparkle[]>([]);

	useRandomInterval(
		() => {
			const now = Date.now();
			// Create a new sparkle
			const sparkle = generateSparkle();
			// Clean up any "expired" sparkles
			const nextSparkles: Sparkle[] = sparkles.filter(
				(sparkle: Sparkle) => {
					const delta = now - sparkle.createdAt;
					return delta < 1000;
				}
			);
			// Include our new sparkle
			nextSparkles.push(sparkle);

			// Make it so!
			setSparkles(nextSparkles);
		},
		50,
		500
	);

	return (
		<span className={styles.sparkleWrapper}>
			{sparkles.map((sparkle) => (
				<Sparkle
					key={sparkle.id}
					color={sparkle.color}
					size={sparkle.size}
					style={sparkle.style}
				></Sparkle>
			))}
			<strong className={styles.sparkleChildWrapper}>{children}</strong>
		</span>
	);
}

interface SparkleProps {
	color: string;
	size: number;
	style?: CSSProperties;
}

function Sparkle({ color, size, style }: SparkleProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 160 160"
			fill="none"
			className={styles.sparkleSvg}
			style={style}
		>
			<path
				d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
				fill={color}
			/>
		</svg>
	);
}

type Sparkle = {
	id: string;
	createdAt: number;
	color: string;
	size: number;
	style: {
		top: string;
		left: string;
		zIndex: number;
	};
};

// HELPERS
const useRandomInterval = (
	callback: () => void,
	minDelay: number,
	maxDelay: number
) => {
	const timeoutId = React.useRef<number | null>(null);
	const savedCallback = React.useRef(callback);
	React.useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);
	React.useEffect(() => {
		let isEnabled =
			typeof minDelay === "number" && typeof maxDelay === "number";
		if (isEnabled) {
			const handleTick = () => {
				const nextTickAt = random(minDelay, maxDelay);
				timeoutId.current = window.setTimeout(() => {
					savedCallback.current();
					handleTick();
				}, nextTickAt);
			};
			handleTick();
		}
		return () => {
			if (timeoutId.current !== null) {
				window.clearTimeout(timeoutId.current);
			}
		};
	}, [minDelay, maxDelay]);
	const cancel = React.useCallback(function () {
		if (timeoutId.current !== null) {
			window.clearTimeout(timeoutId.current);
		}
	}, []);
	return cancel;
};

const random = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min)) + min;

export default Sparkles;

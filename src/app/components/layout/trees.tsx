// External
import React from "react";

// Internal
import styles from "../../page.module.css";

const motionDuration = 100; // The duration of the animation; 100

const Trees: React.FC = () => {
	return (
		<svg
			width="2000"
			height="250"
			viewBox="0 0 2000 250"
			className={styles.infiniteScrollTree}
		>
			<path
				id="treeMotionPath"
				fill="none"
				// Display motion path
				// stroke="#000000"
				// strokeMiterlimit="10"
				d="M2000,190Q1000,-85,0,190"
			/>

			{generateSeries("", 0)}
			{generateSeries("s2", -23)}
			{generateSeries("s3", -46)}
			{generateSeries("s4", -69)}
		</svg>
	);
};

const generateSeries = (idPrefix: string, baseTime: number): JSX.Element => {
	return (
		<>
			<g id={`${idPrefix}treeLg`} transform="translate(0, 0) scale(1.5)">
				<path
					fill="#8fc2a3"
					d="M29,13.5v-5c0-4.4-3.6-8-8-8h-3c-4.4,0-8,3.6-8,8v5c-4.7.1-9.8,5.7-8.9,11,.6,3.8,4,6.1,6.6,7,2.7.9,5.9.6,8.3-.8v7.8l-3.4,3h13.4l-3-2.7v-8.2c2.3,1.5,5.6,1.8,8.3.9,2.6-.9,6-3.2,6.6-7,.8-5.3-4.2-10.9-8.9-11Z"
				/>
			</g>
			<animateMotion
				xlinkHref={`#${idPrefix}treeLg`}
				dur={motionDuration + "s"}
				begin={`${baseTime}s`}
				fill="freeze"
				repeatCount="indefinite"
			>
				<mpath xlinkHref="#treeMotionPath" />
			</animateMotion>

			<g id={`${idPrefix}grassSm`} transform="translate(0, 52) scale(1)">
				<polygon
					fill="#d7e79d"
					points="13 7.5 13 .6 8 7.3 8 .6 1 11.3 5 11.3 8 11.3 10.8 11.3 13 11.3 17 11.3 17 .6 13 7.5"
				/>
			</g>
			<animateMotion
				xlinkHref={`#${idPrefix}grassSm`}
				dur={motionDuration + "s"}
				begin={`${baseTime + 3}s`}
				fill="freeze"
				repeatCount="indefinite"
			>
				<mpath xlinkHref="#treeMotionPath" />
			</animateMotion>

			<g
				id={`${idPrefix}grassLg`}
				transform="translate(0, 48) scale(1.3)"
			>
				<polygon
					fill="#d7e79d"
					points="13 7.5 13 .6 8 7.3 8 .6 1 11.3 5 11.3 8 11.3 10.8 11.3 13 11.3 17 11.3 17 .6 13 7.5"
				/>
			</g>
			<animateMotion
				xlinkHref={`#${idPrefix}grassLg`}
				dur={motionDuration + "s"}
				begin={`${baseTime + 4}s`}
				fill="freeze"
				repeatCount="indefinite"
			>
				<mpath xlinkHref="#treeMotionPath" />
			</animateMotion>

			<g
				id={`${idPrefix}treeSm1`}
				transform="translate(0, 17) scale(1.1)"
			>
				<path
					fill="#8fc2a3"
					d="M29,13.5v-5c0-4.4-3.6-8-8-8h-3c-4.4,0-8,3.6-8,8v5c-4.7.1-9.8,5.7-8.9,11,.6,3.8,4,6.1,6.6,7,2.7.9,5.9.6,8.3-.8v7.8l-3.4,3h13.4l-3-2.7v-8.2c2.3,1.5,5.6,1.8,8.3.9,2.6-.9,6-3.2,6.6-7,.8-5.3-4.2-10.9-8.9-11Z"
				/>
			</g>
			<animateMotion
				xlinkHref={`#${idPrefix}treeSm1`}
				dur={motionDuration + "s"}
				begin={`${baseTime + 8}s`}
				fill="freeze"
				repeatCount="indefinite"
			>
				<mpath xlinkHref="#treeMotionPath" />
			</animateMotion>

			<g
				id={`${idPrefix}treeSm2`}
				transform="translate(0, 17) scale(1.1)"
			>
				<path
					fill="#8fc2a3"
					d="M29,13.5v-5c0-4.4-3.6-8-8-8h-3c-4.4,0-8,3.6-8,8v5c-4.7.1-9.8,5.7-8.9,11,.6,3.8,4,6.1,6.6,7,2.7.9,5.9.6,8.3-.8v7.8l-3.4,3h13.4l-3-2.7v-8.2c2.3,1.5,5.6,1.8,8.3.9,2.6-.9,6-3.2,6.6-7,.8-5.3-4.2-10.9-8.9-11Z"
				/>
			</g>
			<animateMotion
				xlinkHref={`#${idPrefix}treeSm2`}
				dur={motionDuration + "s"}
				begin={`${baseTime + 17}s`}
				fill="freeze"
				repeatCount="indefinite"
			>
				<mpath xlinkHref="#treeMotionPath" />
			</animateMotion>

			<g
				id={`${idPrefix}grassLg2`}
				transform="translate(0, 48) scale(1.3)"
			>
				<polygon
					fill="#d7e79d"
					points="13 7.5 13 .6 8 7.3 8 .6 1 11.3 5 11.3 8 11.3 10.8 11.3 13 11.3 17 11.3 17 .6 13 7.5"
				/>
			</g>
			<animateMotion
				xlinkHref={`#${idPrefix}grassLg2`}
				dur={motionDuration + "s"}
				begin={`${baseTime + 21}s`}
				fill="freeze"
				repeatCount="indefinite"
			>
				<mpath xlinkHref="#treeMotionPath" />
			</animateMotion>
		</>
	);
};

export default Trees;

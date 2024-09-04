"use client";
// External
import { useState, useReducer } from "react";

// Internal
import styles from "./page.module.css";

import { StateContext, StateDispatchContext } from "./components/stateContext";
import reducer, { getCurrentDate } from "./components/reducer";
import stampCollectionData from "./data/stampCollectionData";
import rewardCollectionData from "./data/rewardCollectionData";

import { State, Task } from "@/app/types";
import React from "react";
import TopLayout from "./components/layout/topLayout";
import BotLayout from "./components/layout/botLayout";

const initialState: State = {
	nmt: 0,
	nmtStart: 0,
	stampCollection: stampCollectionData,
	rewardCollection: rewardCollectionData,
	taskCollection: [],
	lastSeen: getCurrentDate(),
};

export default function Home() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [isTaskClicked, setIsTaskClicked] = useState(false);

	return (
		<StateContext.Provider value={state}>
			<StateDispatchContext.Provider value={dispatch}>
				<main className={styles.main}>
					<TopLayout
						selectedTask={selectedTask}
						setSelectedTask={setSelectedTask}
						isTaskClicked={isTaskClicked}
						setIsTaskClicked={setIsTaskClicked}
					></TopLayout>
					<BotLayout
						selectedTask={selectedTask}
						isTaskClicked={isTaskClicked}
					></BotLayout>
				</main>
			</StateDispatchContext.Provider>
		</StateContext.Provider>
	);
}

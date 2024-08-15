import { useContext, useEffect } from "react";
import { StateContext, StateDispatchContext } from "./stateContext";
import { ACTIONS } from "../types";
import { getCurrentDate } from "./reducer";

const Logic: React.FC = ({}) => {
	const dispatch = useContext(StateDispatchContext);
	const state = useContext(StateContext);

	// HANDLE THE STATE IF THE CLIENT CRASHES, WHAT HAPPENS TO LOCALSTORAGE DATA?

	// if userState already exists in localStorage, load it. else, create new default userState.
	useEffect(() => {
		const localUserState = localStorage.getItem("userState");

		if (localUserState) {
			const userStateData = JSON.parse(localUserState);

			dispatch?.({
				type: ACTIONS.SET_USERSTATE_FROM_LOCAL_STORAGE,
				payload: { userState: userStateData },
			});
		} else {
			dispatch?.({ type: ACTIONS.SET_USERSTATE_NEW });
		}
	}, []);

	// save userState whenever state changes
	useEffect(() => {
		const today = getCurrentDate();
		if (state?.lastSeen !== today) {
			console.log("generating task collection");
			console.log("updating last seen");
			dispatch?.({ type: ACTIONS.GENERATE_TASK_COLLECTION });
			dispatch?.({
				type: ACTIONS.UPDATE_LAST_SEEN,
				payload: { lastSeen: getCurrentDate() },
			});
		}
		console.log("userState saved");
		localStorage.setItem("userState", JSON.stringify(state));
	}, [state]);

	// function test() {
	// 	dispatch?.({
	// 		type: ACTIONS.UPDATE_LAST_SEEN,
	// 		payload: { lastSeen: "06/13/24" },
	// 	});
	// }
	return (
		<>
			{/* <button
				style={{ zIndex: 100 }}
				onClick={() => {
					test();
				}}
			>
				Last Seen
			</button> */}
		</>
	);
};

export const polkaDotBackground = {
	backgroundImage:
		"radial-gradient(rgb(255, 255, 255, 0.2) 10%, transparent 14%), radial-gradient(rgb(255, 255, 255, 0.2) 10%, transparent 14%)",
	backgroundPosition: "0 0, 16px 16px",
	backgroundSize: "32px 32px",
	backgroundColor: "rgb(149, 170, 240, 0.5)",
};

export default Logic;

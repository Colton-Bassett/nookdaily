import { useContext, useEffect } from "react";
import { StateContext, StateDispatchContext } from "./stateContext";
import { ACTIONS } from "../types";
import { getCurrentDate } from "./reducer";

const Logic: React.FC = ({}) => {
	const dispatch = useContext(StateDispatchContext);
	const state = useContext(StateContext);

	// if userState already exists in localStorage, load it. else, create new default userState.
	useEffect(() => {
		const localUserState = localStorage.getItem("userState");

		if (localUserState) {
			const userStateData = JSON.parse(localUserState);
			// checking taskCollection exists
			if (userStateData.taskCollection.length >= 1) {
				dispatch?.({
					type: ACTIONS.SET_USERSTATE_FROM_LOCAL_STORAGE,
					payload: { userState: userStateData },
				});
			}
		} else {
			// creating new user state
			dispatch?.({ type: ACTIONS.SET_USERSTATE_NEW });
		}
	}, []);

	// save userState whenever state changes, (+ template code for resetting tasks per day)
	useEffect(() => {
		const today = getCurrentDate();
		// if (state?.lastSeen !== today) {
		// 	// console.log("generating task collection");
		// 	// console.log("updating last seen");
		// 	dispatch?.({ type: ACTIONS.GENERATE_TASK_COLLECTION });
		// 	dispatch?.({
		// 		type: ACTIONS.UPDATE_LAST_SEEN,
		// 		payload: { lastSeen: getCurrentDate() },
		// 	});
		// }
		// console.log("userState saved");
		localStorage.setItem("userState", JSON.stringify(state));
	}, [state]);

	return <></>;
};

export default Logic;

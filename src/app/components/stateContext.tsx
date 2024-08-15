// External
import { Dispatch, createContext } from "react";

// Internal
import { State, Action } from "@/app/types";

export const StateContext = createContext<State | null>(null);
export const StateDispatchContext = createContext<Dispatch<Action> | null>(
	null
);

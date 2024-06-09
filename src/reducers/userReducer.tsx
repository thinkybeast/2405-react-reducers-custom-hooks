import type { UserState, User } from "@/components/User";
/*
Actions: Objects that describe the type of change we want to make to our state

By convention, actions are objects with a type property that describes the type of action we want to take, and an optional payload property that includes some bit of data we want to include in our next state.
 {
  type: string // defines the type of action we want to take
  payload?: any // some bit of data we want to include in our next state
 }
*/

interface FetchUserStartAction {
  type: "FETCH_USER_LOADING";
}

interface FetchUserSuccessAction {
  type: "FETCH_USER_SUCCESS";
  payload: User;
}

interface FetchUserErrorAction {
  type: "FETCH_USER_ERROR";
}

type UserAction =
  | FetchUserStartAction
  | FetchUserSuccessAction
  | FetchUserErrorAction;

export const UserAction = {
  UserLoading: (): FetchUserStartAction => ({ type: "FETCH_USER_LOADING" }),
  UserSuccess: (payload: User): FetchUserSuccessAction => ({
    type: "FETCH_USER_SUCCESS",
    payload,
  }),
  UserError: (): FetchUserErrorAction => ({ type: "FETCH_USER_ERROR" }),
};

/*
 Key idea: 
 1. Use reducers when you have complex, interdependent state
 2. Where you want to move control of the changes in state from the component to a "state change" function
*/

/*
  Key idea: useReducer is like useState...
  *except*
  ...the argument to the setter function is not the next state,
  ...the argument to the setter function is the argument to the reducer function
*/

/*
  Key idea: 
  The return value of the reducer function will be your next state
*/
const userReducer = (_currentState: UserState, action: UserAction) => {
  const { type } = action;
  switch (type) {
    case "FETCH_USER_LOADING":
      return { user: null, isLoading: true, error: false };
    case "FETCH_USER_SUCCESS":
      return { user: action.payload, isLoading: false, error: false };
    case "FETCH_USER_ERROR":
      return { user: null, isLoading: false, error: true };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export default userReducer;

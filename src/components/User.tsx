import React from "react";
import z from "zod";
import Loading from "./Loading";
import UserError from "./UserError";
import { randomErrorString } from "@/utils";

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

const userSchema = z.object({
  avatar: z.string(),
  first_name: z.string(),
  employment: z.object({
    key_skill: z.string(),
  }),
});

type User = z.infer<typeof userSchema>;

// Define the initial state of the component data
type UserState = {
  user: User | null;
  isLoading: boolean;
  error: boolean;
};

const initialUserState: UserState = {
  user: null,
  isLoading: false,
  error: false,
};

// Define the reducer function. It takes the current state and an argument, and returns the next state
const userReducer = (_currentState: UserState, arg: UserState) => {
  return arg;
};

const User = () => {
  const [userState, setUserState] = React.useReducer(
    userReducer,
    initialUserState
  );
  const { user, isLoading, error } = userState; // Destructure the state object

  async function fetchUser() {
    try {
      // Set Loading state
      setUserState({ isLoading: true, error: false, user: null });

      // Simulate a delay
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));

      // Fetch user data from API
      // Randomly add either an empty string or an nonsense string to the URL to simulate an API error
      const result = await fetch(
        "https://random-data-api.com/api/v2/users" + randomErrorString()
      );
      const userData = await result.json();

      // Validate API response
      userSchema.parse(userData);

      // Set user state
      setUserState({ user: userData, isLoading: false, error: false });
    } catch (error) {
      // Set error state and log error
      setUserState({ user: null, isLoading: false, error: true });

      console.error(error);
    }
  }

  React.useEffect(() => {
    // Fetch user data when component mounts
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <UserError onRetry={fetchUser} />;
  }

  return (
    <article>
      {user ? (
        <div>
          <div style={{ width: "310px", height: "310px", margin: "0 auto" }}>
            <img src={user.avatar} key={user.avatar} />
          </div>
          <p>
            Meet <b>{user.first_name}!</b>
          </p>
          <p>They are passionate about {user.employment.key_skill}</p>
          <button onClick={fetchUser}>Not cool enough. Give me another.</button>
        </div>
      ) : null}
    </article>
  );
};

export default User;

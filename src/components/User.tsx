import React from "react";
import z from "zod";
import Loading from "./Loading";
import UserError from "./UserError";
import { randomErrorString } from "@/utils";
import userReducer, { UserAction } from "@/reducers/userReducer";

export const userSchema = z.object({
  avatar: z.string(),
  first_name: z.string(),
  employment: z.object({
    key_skill: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;

// Define the initial state of the component data
export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: boolean;
};

const initialUserState: UserState = {
  user: null,
  isLoading: false,
  error: false,
};

const User = () => {
  const [userState, dispatch] = React.useReducer(userReducer, initialUserState);
  const { user, isLoading, error } = userState; // Destructure the state object

  async function fetchUser() {
    try {
      // Set Loading state
      dispatch(UserAction.UserLoading());

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
      dispatch(UserAction.UserSuccess(userData));
    } catch (error) {
      // Set error state and log error
      dispatch(UserAction.UserError());

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

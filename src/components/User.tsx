import React from "react";
import z from "zod";
import Loading from "./Loading";
import UserError from "./UserError";
import { randomErrorString } from "@/utils";

const userSchema = z.object({
  avatar: z.string(),
  first_name: z.string(),
  employment: z.object({
    key_skill: z.string(),
  }),
});

type User = z.infer<typeof userSchema>;

const User = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  async function fetchUser() {
    try {
      // Reset state
      setIsLoading(true);
      setUser(null);
      setError(false);

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
      setUser(userData);
    } catch (error) {
      // Set error state and log error
      setError(true);
      console.error(error);
    } finally {
      // Reset loading state
      setIsLoading(false);
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

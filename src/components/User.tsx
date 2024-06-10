import React from "react";
import z from "zod";
import Loading from "./Loading";

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
  // Add state to track loading status
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function fetchUser() {
    try {
      // Set loading state to true when fetching data
      setIsLoading(true);

      // Simulate a delay
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));

      // Fetch user data from API
      const result = await fetch("https://random-data-api.com/api/v2/users");
      const userData = await result.json();

      // Validate API response
      userSchema.parse(userData);
      setUser(userData);
    } catch (error) {
      console.error(error);
    } finally {
      // Set loading state to false after fetching data
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    // Fetch user data when component mounts
    fetchUser();
  }, []);

  // Display loading component while fetching data
  if (isLoading) {
    return <Loading />;
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

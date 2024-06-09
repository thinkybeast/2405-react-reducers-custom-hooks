import React from "react";
import z from "zod";

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

  async function fetchUser() {
    try {
      const result = await fetch("https://random-data-api.com/api/v2/users");
      const userData = await result.json();
      userSchema.parse(userData);
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <article>
      {user ? (
        <div>
          <div style={{ width: "310px", height: "310px", margin: "0 auto" }}>
            <img src={user.avatar} />
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

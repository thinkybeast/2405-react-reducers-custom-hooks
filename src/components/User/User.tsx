import z from "zod";
import Loading from "./UserLoading";
import UserError from "./UserError";
import useFetch from "@/hooks/useFetch";

export const userSchema = z.object({
  avatar: z.string(),
  first_name: z.string(),
  employment: z.object({
    key_skill: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;

const User = () => {
  const [{ data: user, isLoading, error }, fetchData] = useFetch<User>(
    "https://random-data-api.com/api/v2/users",
    userSchema
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <UserError onRetry={fetchData} />;
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
          <button onClick={fetchData}>Not cool enough. Give me another.</button>
        </div>
      ) : null}
    </article>
  );
};

export default User;

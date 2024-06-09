import z from "zod";
import Loading from "./BeerLoading";
import BeerError from "./BeerError";
import useFetch from "@/hooks/useFetch";

export const beerSchema = z.object({
  brand: z.string(),
  name: z.string(),
});

export type Beer = z.infer<typeof beerSchema>;

const User = () => {
  const [{ data: beer, isLoading, error }, fetchData] = useFetch<Beer>(
    "https://random-data-api.com/api/v2/beers",
    beerSchema
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <BeerError onRetry={fetchData} />;
  }

  return beer ? (
    <>
      <article>
        <h2>
          Enjoy a refreshing <strong>{beer.name}</strong>
        </h2>
        <p>Brought to you by your friends at {beer.brand}</p>
      </article>
      <button onClick={fetchData}>Not cold enough. Give me another!</button>
    </>
  ) : null;
};

export default User;

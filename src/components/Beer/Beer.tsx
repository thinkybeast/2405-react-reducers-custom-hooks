import z from "zod";
import Loading from "@/components/shared/Loading";
import Error from "@/components/shared/Error";
import useFetch from "@/hooks/useFetch";

const beerSchema = z.object({
  brand: z.string(),
  name: z.string(),
});

type Beer = z.infer<typeof beerSchema>;

const User = () => {
  const [{ data: beer, isLoading, error }, fetchData] = useFetch<Beer>(
    "https://random-data-api.com/api/v2/beers",
    beerSchema
  );

  if (isLoading) {
    return <Loading>🍻 Finding the coldest of beers...</Loading>;
  }

  if (error) {
    return (
      <Error onRetry={fetchData}>
        We seem to have some trouble finding a cold beer at the moment.
      </Error>
    );
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

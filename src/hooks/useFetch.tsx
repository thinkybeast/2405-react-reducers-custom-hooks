import React from "react";
import { ZodSchema, ZodError } from "zod";
import { randomErrorString } from "@/utils";

// Note the use of Generics to define the type of data that will be fetched
type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: boolean;
};

type FetchAction<T> =
  | { type: "FETCH_LOADING" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR" };

// Define the reducer function. Again, note the use of Generics to define the shape of the state object that is returned
// The extra comma in `<T,>` is included only because the syntax linter interprets <T> as a JSX tag. The comma is a workaround to avoid this issue and is not strictly necessary in TypeScript.
const fetchReducer = <T,>(
  _currentState: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> => {
  switch (action.type) {
    case "FETCH_LOADING":
      return { data: null, isLoading: true, error: false };
    case "FETCH_SUCCESS":
      return { data: action.payload, isLoading: false, error: false };
    case "FETCH_ERROR":
      return { data: null, isLoading: false, error: true };
    default:
      throw new Error(`Unknown action type`);
  }
};

// Define the custom hook
const useFetch = <T,>(
  url: string,
  schema?: ZodSchema<T>
): [FetchState<T>, () => Promise<void>] => {
  const [state, dispatch] = React.useReducer(fetchReducer<T>, {
    data: null,
    isLoading: false,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: "FETCH_LOADING" });
    try {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));
      const result = await fetch(url + randomErrorString());
      const data = await result.json();
      if (schema) {
        schema.parse(data);
      }
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Schema validation error:", error.errors);
      } else {
        console.error(error);
      }
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  // Memoize the fetchData function for the useEffect dependency. Not strictly necessary in this case, but good practice
  const fetchDataMemoized = React.useCallback(fetchData, [url, schema]);

  React.useEffect(() => {
    fetchDataMemoized();
  }, [fetchDataMemoized]);

  return [state, fetchDataMemoized];
};

export default useFetch;

import React from "react";
import { ZodSchema, ZodError } from "zod";
import { randomErrorString } from "@/utils";

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: boolean;
};

type FetchAction<T> =
  | { type: "FETCH_LOADING" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR" };

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

  React.useEffect(() => {
    fetchData();
  }, [url]);

  return [state, fetchData];
};

export default useFetch;

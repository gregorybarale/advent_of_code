import { ServerRequest } from "https://deno.land/std/http/server.ts";

export interface IAoCInput {
  year: number;
  day: number;
  input: ReadonlyArray<string>;
}

export const getInput: (
  year: number,
  day: number,
  token: string,
) => Promise<IAoCInput> = async (
  year: number,
  day: number,
  token: string,
) => {
  const request = new ServerRequest();
  request.headers = new Headers();
  request.headers.set(
    "Cookie",
    `session=${token}`,
  );

  const page = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: request.headers,
    },
  );
  const input = (await page.text()).split("\n");

  return {
    year,
    day,
    input,
  };
};

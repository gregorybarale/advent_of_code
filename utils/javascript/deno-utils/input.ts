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
  const headers = new Headers();
  headers.set(
    "Cookie",
    `session=${token}`,
  );

  const page = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers,
    },
  );
  const input = (await page.text()).split("\n");

  return {
    year,
    day,
    input,
  };
};

import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

const performLoopSize: (
  dividerConfig: number,
) => (subjectNumber: number) => (value: number) => number = (
  dividerConfig: number,
) =>
(subjectNumber: number) =>
(value: number) => value * subjectNumber % dividerConfig;

const findLoopSize: (
  dividerConfig: number,
) => (subjectNumber: number) => (publicKey: number) => number = (
  dividerConfig: number,
) =>
(subjectNumber: number) =>
(publicKey: number) => {
  console.log("Starting finding loop size");
  let loopSize = 0;
  let calculatedPublicKey: number = 1;
  do {
    console.log(`Trying loop size for: ${loopSize}`);
    loopSize += 1;
    calculatedPublicKey = performLoopSize(dividerConfig)(subjectNumber)(
      calculatedPublicKey,
    );
  } while (calculatedPublicKey !== publicKey);
  console.log(`Loop size found: ${loopSize}`);
  return loopSize;
};

const applyLoopSize: (
  dividerConfig: number,
) => (loopSize: number) => (subjectNumber: number) => number = (
  dividerConfig: number,
) =>
(loopSize: number) =>
(subjectNumber: number) => {
  let value = 1;
  for (let i = 1; i <= loopSize; i++) {
    value = performLoopSize(dividerConfig)(subjectNumber)(value);
  }
  return value;
};

export const fn1 = ({ input }: IAoCInput) => {
  const DIVIDER_CONFIG = 20201227;
  const SUBJECT_NUMBER_PUBLIC_KEY = 7;
  const [cardPublicKey, doorPublicKey] = input.map((str) =>
    Number.parseInt(str, 10)
  );
  console.log(`Card public key: ${cardPublicKey}`);
  console.log(`Door public key: ${doorPublicKey}`);

  const cardLoopSize = findLoopSize(DIVIDER_CONFIG)(SUBJECT_NUMBER_PUBLIC_KEY)(
    cardPublicKey,
  );
  const doorLoopSize = findLoopSize(DIVIDER_CONFIG)(SUBJECT_NUMBER_PUBLIC_KEY)(
    doorPublicKey,
  );
  console.log(`Card loop size: ${cardLoopSize}`);
  console.log(`Door loop size: ${doorLoopSize}`);

  const encryptionKeyFromCard = applyLoopSize(DIVIDER_CONFIG)(cardLoopSize)(
    doorPublicKey,
  );
  const encryptionKeyFromDoor = applyLoopSize(DIVIDER_CONFIG)(doorLoopSize)(
    cardPublicKey,
  );
  console.log(`Encryption Key from Card loop size: ${encryptionKeyFromCard}`);
  console.log(`Encryption Key from Door loop size: ${encryptionKeyFromDoor}`);

  if (encryptionKeyFromCard !== encryptionKeyFromDoor) {
    throw Error("Encryption keys do not match");
  }

  return encryptionKeyFromCard;
};
export const fn2 = (input: IAoCInput) => {
  console.info("[2020-25] fn2", input);
  return undefined;
};

export type OpeningChar = '(' | '[' | '{' | '<';
export type ClosingChar = ')' | ']' | '}' | '>';
export type ValidChar = OpeningChar | ClosingChar;

export const isOpeningChunk = (s: ValidChar) => s === '(' || s === '[' || s === '{' || s === '<';
export const isMatching = (o: OpeningChar, s: ClosingChar): boolean => {
    if (o === '(') return s === ')';
    if (o === '<') return s === '>';
    if (o === '[') return s === ']';
    return s === '}';
};

export const getClosing = (o: OpeningChar): ClosingChar => {
    if (o === '(') return ')';
    if (o === '<') return '>';
    if (o === '[') return ']';
    return '}';
}

export const parseInput = (input: ReadonlyArray<string>): ReadonlyArray<ReadonlyArray<ValidChar>> => input.map(s => s.split('') as ReadonlyArray<ValidChar>);

export const getFirstInvalidChar = (line: ReadonlyArray<ValidChar>): ValidChar | undefined => {
    const stack: Array<ValidChar> = [];
    for (let i = 0; i < line.length; i++) {
        const nextChar = line[i];
        if (isOpeningChunk(nextChar)) {
            stack.push(nextChar);
        } else {
            const previousChar = stack.pop();
            if (!isMatching(previousChar as OpeningChar, nextChar as ClosingChar)) {
                return nextChar;
            }
        }
    }
    return undefined;
};

export const getMissingChars = (line: ReadonlyArray<ValidChar>): ReadonlyArray<ClosingChar> => {
    const stack: Array<ValidChar> = [];
    for (let i = 0; i < line.length; i++) {
        const nextChar = line[i];
        if (isOpeningChunk(nextChar)) {
            stack.push(nextChar);
        } else {
            const previousChar = stack.pop() as ValidChar;
            if (!isMatching(previousChar as OpeningChar, nextChar as ClosingChar)) {
                stack.push(previousChar, nextChar);
            }
        }
    }
    stack.reverse();
    //@ts-ignore
    return stack.map(getClosing);
};

export const computeSyntaxErrorCode = (errors: ReadonlyArray<ClosingChar>): number => errors.reduce((acc, error) => {
    if (error === ')') return acc + 3;
    if (error === ']') return acc + 57;
    if (error === '}') return acc + 1197;
    return acc + 25137;
}, 0);

export const computeMissingCode = (missings: ReadonlyArray<ClosingChar>): number => missings.reduce((acc, missing) => {
    if (missing === ')') return acc * 5 + 1;
    if (missing === ']') return acc * 5 + 2;
    if (missing === '}') return acc * 5 + 3;
    return acc * 5 + 4;
}, 0);
export type Connection = [string, string];
export type Path = ReadonlyArray<string>;

export const parseInput = (input: ReadonlyArray<string>): ReadonlyArray<Connection> => {
    return input.map(str => {
        const exec = (/(start|[a-z]+|[A-Z]+)-(end|[a-z]+|[A-Z]+)/g).exec(str) as RegExpExecArray;
        return [exec[1] as string, exec[2] as string];
    });
};

export const findConnectionByNode = (connections: ReadonlyArray<Connection>) => (node: string): ReadonlyArray<Connection> => connections.filter(connection => connection[0] === node || connection[1] === node);
export const isStartCave = (node: string) => node === 'start';
export const isEndCave = (node: string) => node === 'end';
export const isSmallCave = (node: string) => /[a-z]+/g.test(node);
export const isBigCave = (node: string) => /[A-Z]+/g.test(node);
export const isNodeAlreadyVisited = (currentPath: Path) => (node: string) => currentPath.some(nodeVisited => nodeVisited === node);
export const getOtherNodeFromConnection = (node: string) => (connection: Connection): string => {
    if (connection[0] === node) {
        return connection[1];
    }
    if (connection[1] === node) {
        return connection[0];
    }
    throw new Error('[getOtherNodeFromConnection] Node not in connection')
}

export const findAllPaths = (connections: ReadonlyArray<Connection>, isPart1 = true): ReadonlyArray<Path> => {
    let paths: ReadonlyArray<Path> = [['start']];
    while (paths.some(path => path.at(-1) !== 'end')) {
        const endedPaths = paths.filter(path => path.at(-1) === 'end');
        const notEndedPaths = paths.filter(path => path.at(-1) !== 'end');
        const nextPaths = notEndedPaths.reduce((acc: ReadonlyArray<Path>, path) => {
            const nextpossiblePaths = isPart1 ? findNextPossiblePathsPart1(connections)(path) : findNextPossiblePathsPart2(connections)(path);
            if (nextpossiblePaths === undefined) return acc;
            return [...acc, ...nextpossiblePaths as ReadonlyArray<Path>];
        }, []);
        paths = [...endedPaths, ...nextPaths];
        console.log(paths.length);
    }
    return paths;
}

export const findNextPossiblePathsPart1 = (connections: ReadonlyArray<Connection>) => (currentPath: Path): ReadonlyArray<Path> | undefined => {
    const currentNode = currentPath.at(-1) as string;
    const nextNodeFromConnectionFinder = getOtherNodeFromConnection(currentNode);
    const nodeAlreadyVisitedChecker = isNodeAlreadyVisited(currentPath);
    const availableConnections = findConnectionByNode(connections)(currentNode);
    if (currentPath.length === 1) {
        return availableConnections.map(connection => [...currentPath, nextNodeFromConnectionFinder(connection)]);
    }
    if (availableConnections.length === 1) {
        const nextNodeVisited = nextNodeFromConnectionFinder(availableConnections[0])
        if (isSmallCave(nextNodeVisited) && nodeAlreadyVisitedChecker(nextNodeVisited)) return undefined;
        return [[...currentPath, nextNodeFromConnectionFinder(availableConnections[0])]];
    }

    const availableConnectionsFilteredBySmallCavesAlreadyVisited = availableConnections.filter(connection => {
        const otherNode = nextNodeFromConnectionFinder(connection);
        return !isSmallCave(otherNode) || !isNodeAlreadyVisited(currentPath)(otherNode);
    });

    if (availableConnectionsFilteredBySmallCavesAlreadyVisited.length === 0) return undefined;

    return availableConnectionsFilteredBySmallCavesAlreadyVisited.map(connection => [...currentPath, nextNodeFromConnectionFinder(connection)]);
};

export const findNextPossiblePathsPart2 = (connections: ReadonlyArray<Connection>) => (currentPath: Path): ReadonlyArray<Path> | undefined => {
    const currentNode = currentPath.at(-1) as string;
    const nextNodeFromConnectionFinder = getOtherNodeFromConnection(currentNode);
    const nodeAlreadyVisitedChecker = isNodeAlreadyVisited(currentPath);
    const availableConnections = findConnectionByNode(connections)(currentNode);
    const hasSmallCavesVisitedTwice = [...currentPath.filter(isSmallCave).reduce((acc, node) => {
        if (!acc.has(node)) {
            acc.set(node, 0);
        }
        acc.set(node, acc.get(node) as number + 1);
        return acc;
    }, new Map<string, number>()).values()].some(n => n > 1);
    if (currentPath.length === 1) {
        return availableConnections.map(connection => [...currentPath, nextNodeFromConnectionFinder(connection)]);
    }
    if (availableConnections.length === 1) {
        const nextNodeVisited = nextNodeFromConnectionFinder(availableConnections[0]);
        const isPathNotValid = isStartCave(nextNodeVisited) ||
            isSmallCave(nextNodeVisited) && hasSmallCavesVisitedTwice && nodeAlreadyVisitedChecker(nextNodeVisited);
        if (isPathNotValid) return undefined;
        return [[...currentPath, nextNodeFromConnectionFinder(availableConnections[0])]];
    }

    const availableConnectionsFilteredBySmallCavesAlreadyVisited = availableConnections.filter(connection => {
        const otherNode = nextNodeFromConnectionFinder(connection);
        const isPathNotValid = isStartCave(otherNode) ||
            isSmallCave(otherNode) && hasSmallCavesVisitedTwice && nodeAlreadyVisitedChecker(otherNode);
        return !isPathNotValid;
    });

    if (availableConnectionsFilteredBySmallCavesAlreadyVisited.length === 0) return undefined;

    return availableConnectionsFilteredBySmallCavesAlreadyVisited.map(connection => [...currentPath, nextNodeFromConnectionFinder(connection)]);
};
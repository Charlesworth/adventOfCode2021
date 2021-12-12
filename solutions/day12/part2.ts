import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 12, part 2');

let input: string[] = readFileSync('./inputs/day12/part1', 'utf-8').split("\n");

type CaveGraph = Map<string, string[]>;
const newCaveGraph = (input: string[]): CaveGraph => {
	let graph: Map<string, string[]> = new Map<string, string[]>();

	for (let inputLine of input) {
		const [nodeA, nodeB] = inputLine.split('-');
		addConnection(graph, nodeA, nodeB);
	}

	return graph;
}

const addConnection = (caveGraph: CaveGraph, nodeA: string, nodeB: string): void => {
	if (caveGraph.has(nodeA)) caveGraph.get(nodeA)?.push(nodeB);
	else caveGraph.set(nodeA, [nodeB]);

	if (caveGraph.has(nodeB)) caveGraph.get(nodeB)?.push(nodeA);
	else caveGraph.set(nodeB, [nodeA]);
}


const getPathsFromNode = (caveGraph: CaveGraph, node: string, previouslyVisitedNodes: string[]): string[][] => {
	const currentVisitedNodes = [...previouslyVisitedNodes, node];

	if (node === 'end') return [currentVisitedNodes];

	const possiblePaths: string[][] = [];

	caveGraph.get(node)?.forEach(connectedNode => {
		if (connectedNode.toLowerCase() == connectedNode) {
			if (connectedNode == 'start') return;

			const visitedOnce: Set<string> = new Set<string>();
			let visitedTwice = false;

			currentVisitedNodes.forEach(visitedNode => {
				if (visitedNode.toLowerCase() != visitedNode) return;

				if (visitedOnce.has(visitedNode)) visitedTwice = true;
				else visitedOnce.add(visitedNode);
			});

			if (visitedOnce.has(connectedNode) && visitedTwice) return;
		}

		possiblePaths.push(...getPathsFromNode(caveGraph, connectedNode, currentVisitedNodes))
	});

	return possiblePaths;
}

const getAllPaths = (caveGraph: CaveGraph): string[][] => {
	return getPathsFromNode(caveGraph, 'start', []);
}

const problemGraph = newCaveGraph(input);
console.log(`Answer: ${getAllPaths(problemGraph).length}`);

// Breadth First Traversal for a Graph
function bfs(graph, start) {
    let visited = new Set();
    let queue = [start];
    visited.add(start);
    while (queue.length > 0) {
        let current = queue.shift();
        console.log(current);
        for (let neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
                visited.add(neighbor);
            }
        }
    }
}

// Depth First Traversal for a Graph
function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    for (let neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}

// Count the number of nodes at given level in a tree using BFS
function countNodesAtLevel(graph, start, level) {
    let visited = new Set();
    let queue = [{ node: start, depth: 0 }];
    let count = 0;
    visited.add(start);
    while (queue.length > 0) {
        let { node, depth } = queue.shift();
        if (depth === level) {
            count++;
        }
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                queue.push({ node: neighbor, depth: depth + 1 });
                visited.add(neighbor);
            }
        }
    }
    return count;
}

// Count number of trees in a forest
function countTrees(graph) {
    let visited = new Set();
    let count = 0;
    for (let node in graph) {
        if (!visited.has(node)) {
            dfsForForest(graph, node, visited);
            count++;
        }
    }
    return count;
}

function dfsForForest(graph, start, visited) {
    visited.add(start);
    for (let neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            dfsForForest(graph, neighbor, visited);
        }
    }
}

// Detect Cycle in a Directed Graph
function hasCycle(graph) {
    let visited = new Set();
    let recursionStack = new Set();
    for (let node in graph) {
        if (detectCycleUtil(node, visited, recursionStack, graph)) {
            return true;
        }
    }
    return false;
}

function detectCycleUtil(node, visited, recursionStack, graph) {
    if (!visited.has(node)) {
        visited.add(node);
        recursionStack.add(node);
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor) && detectCycleUtil(neighbor, visited, recursionStack, graph)) {
                return true;
            } else if (recursionStack.has(neighbor)) {
                return true;
            }
        }
    }
    recursionStack.delete(node);
    return false;
}

// Implement n-Queen’s Problem
function solveNQueens(n) {
    let solutions = [];
    let board = Array.from({ length: n }, () => Array(n).fill('.'));
    solveNQueensUtil(board, 0, solutions);
    return solutions;
}

function solveNQueensUtil(board, col, solutions) {
    if (col === board.length) {
        solutions.push(board.map(row => row.join('')));
        return;
    }

    for (let i = 0; i < board.length; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 'Q';
            solveNQueensUtil(board, col + 1, solutions);
            board[i][col] = '.';
        }
    }
}

function isSafe(board, row, col) {
    for (let i = 0; i < col; i++) {
        if (board[row][i] === 'Q') return false;
    }

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') return false;
    }

    for (let i = row, j = col; i < board.length && j >= 0; i++, j--) {
        if (board[i][j] === 'Q') return false;
    }

    return true;
}

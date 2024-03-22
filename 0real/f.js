//感染模型
function bfs(graph, start) {
    const queue = [start]
    const visited = new Set()
    while (queue.length) {
        const cur = queue.shift()
        if (!visited.has(cur)) {
            visited.add(cur)
            for (let child of graph[cur]) {
                if (!visited.has(child)) {
                    queue.push(child)

                }
            }
        }

    }
    return [...visited]
}

const fn = (graph, start, timestep) => {
    const visited = new Set()
    const q = [{node: start, time: 1}]
    while (q.length) {
        const {node, time} = q.shift()
        if (!visited.has(node)) {
            visited.add(node)

            console.log(node, time);

            for (let neighbor of graph[node]) {
                if (!visited.has(neighbor) && time < timestep) {
                    q.push({node: neighbor, time: time + 1})
                }
            }
        }
    }
}


const graph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B', 'F'],
    F: ['C', 'E']
};

const res = fn(graph, 'A', 2)

console.log(res)
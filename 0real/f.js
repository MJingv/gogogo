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

// const res = fn(graph, 'A', 2)


const useState1 = (initVal) => {
    let state = initVal
    const setState = (newVal) => {
        state = newVal
        // render()

    }
    return [state, setState]
}


const pool = async (max, arr) => {
    const cur = [], list = []
    for (let item of arr) {
        let p = item
        list.push(p)

        if (max <= cur.length) {
            item().then(() => {
                cur.splice(cur.indexOf(p), 1)
            })
            cur.push(p)
            if (cur.length >= max) {
                await Promise.race(cur)
            }
        }
    }
    return Promise.all(list)
}


// 100以内素数
const su = () => {
    const res = []
    for (let i = 2; i <= 100; i++) {
        let flag = true
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) flag = false
        }
        if (flag) res.push(i)
    }
    return res
}
const res = su()
// console.log(res)

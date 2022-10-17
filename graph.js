// 图多用邻接表（数组）


// 797. 所有可能的路径 剑指 Offer II 110. 所有路径
// 输入：graph = [[1,2],[3],[3],[]] 输出：[[0,1,3],[0,2,3]] 解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3
var allPathsSourceTarget = function (graph) {
    const traverse = (graph, s = 0, path = []) => {
        path.push(s)
        if (s === graph.length - 1) {
            //到结尾节点
            res.push(path.slice())
            path.pop()
            return
        }
        for (let v of graph[s]) {
            traverse(graph, v, path)
        }
        path.pop()

    }
    const res = []
    traverse(graph)
    return res
};
// const res = allPathsSourceTarget([[1, 2], [3], [3], []])
// console.log(res)

// 207. 课程表
// 输入：numCourses = 2, prerequisites = [[1,0]] 输出：true 解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。

// 看到依赖问题，首先想到的就是把问题转化成「有向图」这种数据结构，只要图中存在环，那就说明存在循环依赖。
var canFinish = function (numCourses, prerequisites) {
    const graph = new Array(numCourses).fill(0).map(i => []) //注意
    prerequisites.map((i) => {
        const from = i[1], to = i[0]
        // 学完0才能学1，0->1
        graph[from].push(to)
    })

    let hasCycle = false
    let visited = []
    const onPath = [] //指针
    const traverse = (graph, s = 0) => {
        if (onPath[s]) {
            hasCycle = true
        }
        if (hasCycle || visited[s]) return
        visited[s] = true
        onPath[s] = true
        for (let v of graph[s]) {
            traverse(graph, v)
        }
        onPath[s] = false
    }

    for (let i = 0; i < graph.length; i++) {
        traverse(graph, i)

    }
    return !hasCycle
};
const res = canFinish(3, [[1, 0], [2, 1], [0, 2]])
console.log(res)

// 210. 课程表 II
// 剑指 Offer II 113. 课程顺序
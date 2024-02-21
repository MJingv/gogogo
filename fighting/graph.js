// 数据结构-图
// 实现方式：邻接表/矩阵
// 遍历 和多叉树遍历相同，注意环！

//  LeetCode 207. 课程表
// 构建图，没环true
var canFinish = function (numCourses, prerequisites) {
    const n = numCourses
    const graph = Array(n).fill(0).map(() => [])
    const visited = Array(n).fill(0)
    for (let [cur, pre] of prerequisites) {
        graph[pre].push(cur)
    }

    const helper = (i, visited) => {
        if (visited[i] === -1) return true
        if (visited[i] === 1) return false
        visited[i] = -1
        for (let j of graph[i]) {
            if (helper(j, visited)) return true
        }
        visited[i] = 1
    }

    for (let i = 0; i < n; i++) {
        if (helper(i, visited)) return false
    }
    return true


};
// const res = canFinish(2, [[1, 0], [0, 1]])


// LeetCode 210. 课程表 II
// 输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]] 输出：[0,2,1,3]
var findOrder = function (numCourses, prerequisites) {
    const n = numCourses
    const graph = Array(n).fill(0).map(() => [])
    const visited = Array(n).fill(0)
    const res = []
    for (let [cur, pre] of prerequisites) {
        graph[pre].push(cur)
    }
    const helper = (i, visited) => {
        if (visited[i] === -1) return true
        if (visited[i] === 1) return false
        visited[i] = -1

        for (let j of graph[i]) {
            if (helper(j, visited)) return true

        }
        res.push(i)
        visited[i] = 1
    }

    for (let i = 0; i < n; i++) {
        if (helper(i, visited)) return []
    }


    return res.reverse()
};
const res = findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])

// 797. 所有可能的路径
var allPathsSourceTarget = function (graph) {

};
// const res = allPathsSourceTarget()
console.log(res)
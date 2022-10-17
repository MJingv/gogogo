// 797. 所有可能的路径 剑指 Offer II 110. 所有路径
// 输入：graph = [[1,2],[3],[3],[]] 输出：[[0,1,3],[0,2,3]] 解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3
var allPathsSourceTarget = function (graph) {
    const traverse = (graph, s = 0, path = []) => {
        //节点s
        path.push(s)
        if (s === graph.length - 1) {
            // 到头了
            res.push(path.slice())
            path.pop()
        }

    }
    const res = []
    traverse(graph)
    return res

};
const res = allPathsSourceTarget([[1, 2], [3], [3], []])
console.log(res)
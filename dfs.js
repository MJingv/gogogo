// 回溯法（back tracking）（探索与回溯法）是一种选优搜索法，又称为试探法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。


// 「剑指 Offer 12. 矩阵中的路径」
// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true

const exist = (board, word) => {
    if (!board.length || !word) return false
    const [m, n] = [board.length, board[0].length]
    const dfs = (i, j, index) => {
        if (i < 0 || i >= m || j < 0 || j >= n || word[index] !== board[i][j]) return false //终止条件
        if (index === word.length - 1) return true //回溯的终点
        const tmp = board[i][j]
        board[i][j] = '' //防止回溯的时候重复
        console.log(tmp, index)
        const res = dfs(i - 1, j, index + 1) || dfs(i + 1, j, index + 1) || dfs(i, j - 1, index + 1) || dfs(i, j + 1, index + 1)
        board[i][j] = tmp
        return res
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true
        }
    }
    return false
}
const res = exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED")
console.log(res)

// 回溯法（back tracking）（探索与回溯法）是一种选优搜索法，又称为试探法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。


// 「剑指 Offer 12. 矩阵中的路径」
// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true

const exist = (board, word) => {
    // if (!board.length || !word) return false
    const [m, n] = [board.length, board[0].length]

    const dfs = (i, j, index) => {
        if (i < 0 || i >= m || j >= n || j < 0 || board[i][j] !== word[index]) return false
        if (index === word.length - 1) return true
        const tmp = board[i][j]
        console.log(tmp, index)
        board[i][j] = '' // 将当前字符设置为空，防止四个方向dfs再次遍历到
        const res = dfs(i - 1, j, index+1) || dfs(i + 1, j, index+1) || dfs(i, j - 1, index+1) || dfs(i, j + 1, index+1)
        board[i][j] = tmp
        return res
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === word[0]) {
                if (dfs(i, j, 0)) return true
            }
        }
    }
    return false
}
const res = exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED")
console.log(res)

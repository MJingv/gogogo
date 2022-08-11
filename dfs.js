// 回溯法（back tracking）（探索与回溯法）是一种选优搜索法，又称为试探法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。


// 「剑指 Offer 12. 矩阵中的路径」
// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true

const exist = (board, word) => {
    const [m, n] = [board.length, board[0].length];

    const dfs = (i, j, index) => {
        // 越界、或者字符不匹配
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[index]) return false;
        // 索引等于单词长度-1，说明全匹配上了
        if (index === word.length - 1) return true;
        // 保存当前字符
        const temp = board[i][j];
        // 将当前字符设置为空，防止四个方向dfs再次遍历到
        board[i][j] = '';
        // 四个方向遍历
        const res =
            dfs(i + 1, j, index + 1) ||
            dfs(i, j + 1, index + 1) ||
            dfs(i - 1, j, index + 1) ||
            dfs(i, j - 1, index + 1);
        // 恢复当前字符
        board[i][j] = temp;
        return res;
    };

    // 从第一个匹配的字符处开始dfs
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }

    return false;
}
// const res = exist([["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "A"], ["A", "A", "A", "A", "A", "B"], ["A", "A", "A", "A", "B", "A"]], "AAAAAAAAAAAAABB")


// 「剑指 Offer 13. 机器人的运动范围」
// 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
// 输入：m = 2, n = 3, k = 1
// 输出：3

const movingCount = (m, n, k) => {

    const dps = (i = 0, j = 0, index = 0) => {
        const sum = (`${i}${j}`.split('') || []).reduce((i, pre) => i + pre)
        if (i < 0 || i > m - 1 || j < 0 || j > n - 1 || sum > k) return false

        const res = dps(i + 1, j, index + 1) || dps(i - 1, j) || dps(i, j + 1) || dps(i, j - 1)
        return res
    }
    return dps(0, 0, 0)


}
const res = movingCount(2, 3, 1)
console.log(res)

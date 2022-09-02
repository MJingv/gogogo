// // 力扣第 303 题「 区域和检索 - 数组不可变」
// 输入： ["NumArray", "sumRange", "sumRange", "sumRange"] [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]] 输出： [null, 1, -1, -3]

var NumArray = function (nums) {
    const len = nums.length
    const preNum = [0]
    for (let i = 0; i < len + 1; i++) {
        preNum[i + 1] = preNum[0] + nums[i]
    }
    this.preNum = preNum
};

NumArray.prototype.sumRange = function (left, right) {
    return this.preNum[right + 1] - this.preNum[left]
};

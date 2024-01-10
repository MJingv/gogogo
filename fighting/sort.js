const quickSort = (arr) => {
    const len = arr.length
    if (len <= 1) return arr
    const left = [], right = [], equal = []
    const pivot = arr[Math.floor(len / 2)]
    for (let i = 0; i < len; i++) {
        if (arr[i] > pivot) {
            right.push(arr[i])
        } else if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            equal.push(arr[i])
        }
    }
    return [...quickSort(left), ...equal, ...quickSort(right)]
};

const arr = [3, 0, 5, 2, 4, 1, 1, 4, 99];
const sortedArr = quickSort(arr);
console.log(sortedArr); // 输出：[0, 1, 1, 2, 3, 4, 4, 5, 99]
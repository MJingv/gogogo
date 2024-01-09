const quickSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    const equal = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            right.push(arr[i]);
        } else {
            equal.push(arr[i]);
        }
    }

    return [...quickSort(left), ...equal, ...quickSort(right)];
};

const list = [3, 0, 5, 2, 4, 1, 1, 4, 99];
const sortedList = quickSort(list);
console.log(sortedList);
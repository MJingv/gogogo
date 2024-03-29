## 海量数据处理思路

1.如何从大量的 URL 中找出相同的 URL？
- 分而治之，进行哈希取余；
- 对每个子文件进行 HashSet 统计。

2.如何从大量数据中找出高频词
- 分而治之，进行哈希取余
- 使用 HashMap 统计频数
- 求解最大的 TopN 个，用小顶堆；求解最小的 TopN 个，用大顶堆。

3.如何找出某一天访问百度网站最多的IP
- 分而治之，进行哈希取余；
- 使用 HashMap 统计频数；
- 求解最大的 TopN 个，用小顶堆；求解最小的 TopN 个，用大顶堆。

4. 如何在大量的数据中找出不重复的整数/判断一个数是否存在？
- 判断数字是否重复的问题，位图法是一种非常高效的方法。
  
5. 如何从 5 亿个数中找出中位数？
- 维护两个堆，一个大顶堆，一个小顶堆。大顶堆中最大的数小于等于小顶堆中最小的数；保证这两个堆中的元素个数的差不超过 1。
- 若数据总数为偶数，当这两个堆建好之后，中位数就是这两个堆顶元素的平均值。当数据总数为奇数时，根据两个堆的大小，中位数一定在数据多的堆的堆顶。


https://segmentfault.com/a/1190000021109127

/**
 * MaxPriorityQueue 类表示一个最大优先队列，基于最大堆实现。
 * 最大优先队列允许在队列中插入元素，并始终能够快速获取和移除最大值。
 */
class MaxPriorityQueue {
  private heap: number[] = []
  /**
   * 创建一个新的最大优先队列实例。
   */
  constructor(arr: number[] = []) {
    arr.forEach(item => this.insert(item));
  }

  /**
   * 获取父节点索引。
   * @param {number} index - 给定索引
   * @returns {number} - 父节点索引
   */
  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * 获取左子节点索引。
   * @param {number} index - 给定索引
   * @returns {number} - 左子节点索引
   */
  leftChildIndex(index) {
    return 2 * index + 1;
  }

  /**
   * 获取右子节点索引。
   * @param {number} index - 给定索引
   * @returns {number} - 右子节点索引
   */
  rightChildIndex(index) {
    return 2 * index + 2;
  }

  /**
   * 交换数组中的两个元素。
   * @param {Array} arr - 目标数组
   * @param {number} i - 第一个元素的索引
   * @param {number} j - 第二个元素的索引
   */
  swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  /**
   * 上移操作，维护最大堆性质。
   * @param {number} index - 开始上移的索引
   */
  heapifyUp(index) {
    while (index > 0 && this.heap[index] > this.heap[this.parentIndex(index)]) {
      this.swap(this.heap, index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }

  /**
   * 下移操作，维护最大堆性质。
   * @param {number} index - 开始下移的索引
   */
  heapifyDown(index) {
    const left = this.leftChildIndex(index);
    const right = this.rightChildIndex(index);
    let largest = index;

    if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
      largest = left;
    }

    if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(this.heap, index, largest);
      this.heapifyDown(largest);
    }
  }

  /**
   * 插入元素到最大优先队列中。
   * @param {number} value - 要插入的值
   */
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * 获取最大值（不删除）。
   * @returns {number|null} - 最大值，如果队列为空则返回 null
   */
  getMax() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }
  // 获取第几个
  getMaxByKey(key: number) {
    return this.heap[key];
  }

  /**
   * 移除并返回最大值。
   * @returns {number|null} - 移除的最大值，如果队列为空则返回 null
   */
  extractMax() {
    if (this.heap.length === 0) {
      return null;
    }

    const max = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last as number;
      this.heapifyDown(0);
    }
    return max;
  }

  /**
   * 获取队列的大小。
   * @returns {number} - 队列的大小
   */
  size() {
    return this.heap.length;
  }
}

// 使用示例
const maxPriorityQueue = new MaxPriorityQueue();
maxPriorityQueue.insert(4);
maxPriorityQueue.insert(8);
maxPriorityQueue.insert(2);
maxPriorityQueue.insert(5);

console.log("Max: " + maxPriorityQueue.getMax()); // 输出最大值 8
console.log("Size: " + maxPriorityQueue.size()); // 输出队列大小 4

const extractedMax = maxPriorityQueue.extractMax();
console.log("Extracted Max: " + extractedMax); // 输出并移除最大值 8
console.log("Size after extraction: " + maxPriorityQueue.size()); // 输出队列大小 3

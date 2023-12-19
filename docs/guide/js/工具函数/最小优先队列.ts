/**
 * MinHeap 类表示一个最小堆数据结构。
 * 最小堆是一种二叉树结构，其中每个节点的值都小于或等于其子节点的值。
 */
class MinHeap {
  private heap: number[] = [];
  /**
   * 创建一个新的最小堆实例。
   */
  constructor(arr: number[] = []) {
    arr.forEach(item => this.insert(item));
  }

  /**
   * 获取给定索引的父节点索引。
   * @param {number} index - 给定索引
   * @returns {number} - 父节点索引
   */
  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * 获取给定索引的左子节点索引。
   * @param {number} index - 给定索引
   * @returns {number} - 左子节点索引
   */
  leftChildIndex(index) {
    return 2 * index + 1;
  }

  /**
   * 获取给定索引的右子节点索引。
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
   * 上移操作，维护最小堆性质。
   * @param {number} index - 开始上移的索引
   */
  heapifyUp(index) {
    while (index > 0 && this.heap[index] < this.heap[this.parentIndex(index)]) {
      this.swap(this.heap, index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }

  /**
   * 下移操作，维护最小堆性质。
   * @param {number} index - 开始下移的索引
   */
  heapifyDown(index) {
    const left = this.leftChildIndex(index);
    const right = this.rightChildIndex(index);
    let smallest = index;

    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }

    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest !== index) {
      this.swap(this.heap, index, smallest);
      this.heapifyDown(smallest);
    }
  }

  /**
   * 插入元素到最小堆中。
   * @param {number} value - 要插入的值
   */
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * 获取最小值（不删除）。
   * @returns {number|null} - 最小值，如果堆为空则返回 null
   */
  getMin() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }

  /**
   * 移除并返回最小值。
   * @returns {number|null} - 移除的最小值，如果堆为空则返回 null
   */
  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last as number;
      this.heapifyDown(0);
    }

    return min;
  }

  /**
   * 获取堆的大小。
   * @returns {number} - 堆的大小
   */
  size() {
    return this.heap.length;
  }
}

// 使用示例
const minHeap = new MinHeap();
minHeap.insert(4);
minHeap.insert(8);
minHeap.insert(2);
minHeap.insert(5);

console.log("Min: " + minHeap.getMin()); // 输出最小值 2
console.log("Size: " + minHeap.size()); // 输出堆大小 4

const extractedMin = minHeap.extractMin();
console.log("Extracted Min: " + extractedMin); // 输出并移除最小值 2
console.log("Size after extraction: " + minHeap.size()); // 输出堆大小 3

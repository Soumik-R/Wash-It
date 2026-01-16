class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(order) {
    this.heap.push(order);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (element.priority >= parent.priority) break;

      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  dequeue() {
    const min = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown();
    }

    return min;
  }

  sinkDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftIdx = 2 * index + 1;
      let rightIdx = 2 * index + 2;
      let swap = null;

      if (leftIdx < length) {
        if (this.heap[leftIdx].priority < element.priority) {
          swap = leftIdx;
        }
      }

      if (rightIdx < length) {
        if (
          (swap === null &&
            this.heap[rightIdx].priority < element.priority) ||
          (swap !== null &&
            this.heap[rightIdx].priority <
              this.heap[leftIdx].priority)
        ) {
          swap = rightIdx;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

module.exports = PriorityQueue;

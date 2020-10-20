class MaxBinaryHeap {
  constructor() {
    this.values = [41, 39, 33, 18, 27, 12];
  }

  insert(value) {
    this.values.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    var index = this.values.length - 1;
    var element = this.values[index];
    while (index > 0) {
      var parentIndex = Math.floor((index - 1) / 2);
      var parent = this.values[parentIndex];
      if (element <= parent) break;
      this.values[parentIndex] = element;
      this.values[index] = parent;
      index = parentIndex;
    }
  }

  siftDown() {
    var max = this.values[0];
    var end = this.values.pop();
    this.values[0] = end;
    var index = 0;
    var length = this.values.length;
    var element = this.values[0];
    while (true) {
      var leftChildIndex = 2 * index + 1;
      var rightChildIndex = 2 * index + 2;
      var swap = null;
      var leftChild;
      var rightChild;
      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild > element) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (!swap && rightChild > element) ||
          (swap && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }
      if (!swap) break;
      this.values[index] = this.values[swap];
      this.values[swap] = element;
      index = swap;
    }
    return max;
  }
}

const heap = new MaxBinaryHeap();
heap.insert(100);
heap.siftDown();
console.log(heap);

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
}

const heap = new MaxBinaryHeap();
heap.insert(100);
console.log(heap);

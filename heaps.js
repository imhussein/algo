class MaxBinaryHeap {
  constructor() {
    this.values = [41, 39, 33, 18, 27, 12];
  }

  insert(value) {
    this.values.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.values.length - 1;
    const ELEMENT = this.values[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parentElement = this.values[parentIndex];
      if (ELEMENT <= parentElement) break;
      if (ELEMENT > parentElement) {
        this.values[parentIndex] = ELEMENT;
        this.values[index] = parentElement;
        index = parentIndex;
      }
    }
  }

  siftDown() {
    var root = this.values[0];
    var end = this.values.pop();
    this.values[0] = end;
    var element = this.values[0];
    var index = 0;
    var leftChildIndex = 2 * index + 1;
    var rightChildIndex = 2 * index + 2;
    var leftChild;
    var rightChild;
    var swap = null;
    while (true) {
      if (leftChildIndex) {
        leftChild = this.values[leftChildIndex];
        if (leftChild > element) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex) {
        rightChild = this.values[rightChildIndex];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap == null) {
        break;
      }
      this.values[index] = this.values[swap];
      this.values[swap] = element;
      index = swap;
    }
    return root;
  }
}

const maxBH = new MaxBinaryHeap();
maxBH.insert(55);
console.log(maxBH.values);

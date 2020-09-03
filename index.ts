class DNode {
  public value: string;
  public prev: DNode | null;
  public next: DNode | null;
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DLinkedList {
  public len: number;
  public head: DNode | null;
  public tail: DNode | null;
  constructor() {
    this.len = 0;
    this.head = null;
    this.tail = null;
  }

  push(value: string): DLinkedList {
    var newNode = new DNode(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.len++;
    return this;
  }
}

const lls = new DLinkedList();
lls.push("Mohamed");
lls.push("Hussein");
console.log(lls);

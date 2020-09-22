class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    var newNode = new Node(value);
    var current = this.root;
    if (!this.root) {
      this.root = new Node(value);
      return this;
    }
    while (true) {
      if (current.value == value) {
        return null;
      }
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        } else {
          current = current.left;
        }
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  find(value) {
    var current = this.root;
    var found = false;
    if (!this.root) return false;
    if (current.value == value) {
      return true;
    }
    while (!found && current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (found) {
      return current;
    } else {
      return false;
    }
  }

  BFS() {
    var node = this.root;
    var data = [];
    var queue = [];
    queue.push(node);
    while (queue.length) {
      node = queue.shift();
      data.push(node);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return data;
  }

  DFSPreOrder() {
    var data = [];
    function traverse(node) {
      data.push(node);
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    }
    traverse(this.root);
    return data;
  }

  DFSPostOrder() {
    var data = [];
    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
      data.push(node);
    }
    traverse(this.root);
    return data;
  }

  DFSInOrder() {
    var data = [];
    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }
      data.push(node);
      if (node.right) {
        traverse(node.right);
      }
    }
    traverse(this.root);
    return data;
  }
}

var tree = new BinarySearchTree();
tree.insert(2);
tree.insert(3);
tree.insert(1);
tree.insert(0);
tree.insert(100);
console.log(tree);
console.log(tree.find(1010));
console.log(tree.BFS());
console.log(tree.DFSPreOrder());
console.log(tree.DFSPostOrder());
console.log(tree.DFSInOrder());

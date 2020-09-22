// class TreeNode {
//   public left: null | TreeNode = null;
//   public right: null | TreeNode;
//   constructor(public value: number) {}
// }

// class BinarySearchTreeTS {
//   constructor(public root: null | TreeNode = null) {}

//   insert(value: number): BinarySearchTreeTS {
//     var newNode: TreeNode = new TreeNode(value);
//     var current: TreeNode | null = this.root;
//     if (!this.root) {
//       this.root = newNode;
//       return this;
//     }
//     while (true) {
//       if (value < current.value) {
//         if (!current.left) {
//           current.left = newNode;
//           return this;
//         } else {
//           current = current.left;
//         }
//       } else if (value > current.value) {
//         if (!current.right) {
//           current.right = newNode;
//           return this;
//         } else {
//           current = current.right;
//         }
//       }
//     }
//   }

//   find(value: number): boolean | TreeNode {
//     var current: TreeNode = this.root;
//     var found: boolean = false;
//     if (!this.root) {
//       return false;
//     }
//     while (!found && current) {
//       if (current.value < value) {
//         current = current.right;
//       } else if (current.value > value) {
//         current = current.left;
//       } else {
//         found = true;
//       }
//     }
//     if (found) {
//       return current;
//     } else {
//       return false;
//     }
//   }

//   BST() {
//     var node: TreeNode = this.root;
//     var queue = [];
//     var data = [];
//     queue.push(this.root);
//     while (queue.length) {
//       node = queue.shift();
//       data.push(node);
//       if (node.left) {
//         queue.push(node.left);
//       }
//       if (node.right) {
//         queue.push(node.right);
//       }
//     }
//     return data;
//   }
// }

// 排序二叉树
// 定义： 根节点 叶子节点 中间节点
// 特点： 左子树 < 中间 < 右子树

function BirnaryTree() {
  var Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  var root = null;

  var insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  };

  this.insert = function (key) {
    var newNode = new Node(key);
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };

  // 中序遍历接口 左中右
  var inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  };

  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(root, callback);
  };

  // 前序遍历接口 中左右
  var preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  };
  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(root, callback);
  };

  // 后序遍历 左右中
  var postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  };
  this.postOrderTraverse = function (callback) {
    postOrderTraverseNode(root, callback);
  };

  // 查找最小值
  this.min = function () {
    return minNode(root);
  };
  var minNode = function (node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  };

  // 查找最大值
  this.max = function () {
    return maxNode(root);
  };
  var maxNode = function (node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  };

  // 查找指定的值
  this.search = function (key) {
    return searchNode(root, key);
  };
  var searchNode = function (node, key) {
    if (node === null) {
      return false;
    }

    if (key < node.key) {
      return searchNode(node.left, key);
    } else if (key > node.key) {
      return searchNode(node.right, key);
    } else {
      return true;
    }
  };

  var findNode = function (node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    return null;
  }

  // 删除节点
  this.remove = function (key) {
    return removeNode(root, key)
  }
  var removeNode = function (node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key)
      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right, key)
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      }
      if (node.right === null) {
        node = node.left;
        return node;
      }
      var aux = findNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key)

    }
  }
}

var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13];
var birnaryTree = new BirnaryTree();
nodes.forEach((key) => {
  birnaryTree.insert(key);
});
console.log("birnaryTree==", birnaryTree);

var callback = function (key) {
  console.log(key);
};

// 中序遍历（左中右）作用：升序排列
// birnaryTree.inOrderTraverse(callback);

// 前序遍历（中左右）作用：复制二叉树
// birnaryTree.preOrderTraverse(callback);

// 后序遍历（左右中）
// birnaryTree.postOrderTraverse(callback);

console.log("min node is:", birnaryTree.min());
console.log("max node is:", birnaryTree.max());

console.log(birnaryTree.search(7) ? "7 is fount" : "7 is not found");
console.log(birnaryTree.search(9) ? "9 is fount" : "9 is not found");

// birnaryTree.remove(1); 
// birnaryTree.remove(10); 
birnaryTree.remove(3); 
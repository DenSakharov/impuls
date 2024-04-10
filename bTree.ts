class treeNode <T> {
    data: T;
    leftChild: treeNode<T> | null;
    rightChild: treeNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }

    height(): number {
        return 1 + Math.max(
            this.leftChild !== null ? this.leftChild.height() : -1,
            this.rightChild !== null ? this.rightChild.height() : -1
        )
    }
}

class myBinaryTree <T> {
    parent: treeNode<T> | null;

    constructor() {
        this.parent = null;
    }
    

    insert(data: T) {
        let newNode = new treeNode(data);
        if (this.parent === null) {
            this.parent = newNode;
        } else {
            this.insertNode(this.parent, newNode);
        }
    }

    treeHeight(): number{
        return this.parent === null ? -1 : this.parent.height()
    }

    protected insertNode(treeNode: treeNode<T>, newNode: treeNode<T>) {
        if (newNode.data < treeNode.data) {
            if (treeNode.leftChild === null) {
                treeNode.leftChild = newNode;
            } else {
                this.insertNode(treeNode.leftChild, newNode);
            }            
        } else {
            if (treeNode.rightChild === null) {
                treeNode.rightChild = newNode;
            } else {
                this.insertNode(treeNode.rightChild, newNode);
            }
        }
    }

    search(treeNode: treeNode<T> | null, data: T): treeNode<T> | null {
        if (treeNode === null) {
            return null;
        }
        if (data < treeNode.data) {
            return this.search(treeNode.leftChild, data);
        }
        if (data > treeNode.data) {
            return this.search(treeNode.rightChild, data);
        }

        return treeNode;
    }

    minNode(treeNode: treeNode<T>): treeNode<T> {
        if (treeNode.leftChild === null)
            return treeNode
        else 
            return this.minNode(treeNode.leftChild)
    }

    remove(data: T) {
        this.parent = this.removeNode(this.parent, data)
    }

    protected removeNode(treeNode: treeNode<T> | null, data: T): treeNode<T> | null {
        if (treeNode === null) {
            return null
        } else if (data < treeNode.data) {
            treeNode.leftChild = this.removeNode(treeNode.leftChild, data)
            return treeNode
        } else if (data > treeNode.data) {
            treeNode.rightChild = this.removeNode(treeNode.rightChild, data)
            return treeNode
        } else {
            if (treeNode.leftChild === null && treeNode.rightChild === null) {
                treeNode = null
                return treeNode
            }

            if (treeNode.leftChild === null) {
                treeNode = treeNode.rightChild
                return treeNode
            } else if (treeNode.rightChild === null) {
                treeNode = treeNode.leftChild
                return treeNode
            }

            let newNode = this.minNode(treeNode.rightChild)
            treeNode.data = newNode.data
            treeNode.rightChild = this.removeNode(treeNode.rightChild, newNode.data)
            return treeNode
        }
    }
    
}

let tree = new myBinaryTree<number>()
tree.insert(11)
tree.insert(8)
tree.insert(20)
tree.insert(50)
tree.insert(44)
tree.insert(1)
console.log(tree)
tree.remove(20)
console.log(tree)
console.log(tree.search(tree.parent,44))
console.log(tree.treeHeight())

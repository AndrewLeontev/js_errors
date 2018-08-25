class Tree {
    constructor(key, meta, parent) {
        this.parent = parent;
        this.key = key;
        this.meta = meta;
        this.children = new Map();
    }

    addChild(key, meta) {
        const child = new Tree(key, meta, this);
        this.children.set(key, child);

        return child;
    }

    getChild(key) {
        const child = this.children.get(key);
        return child
    }
}

tree = new Tree('animals');
tree.addChild('cats');
console.log(tree.key);
const dogs = tree.getChild('dogs');
console.log(dogs);
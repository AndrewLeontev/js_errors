class Tree {
    constructor(key, meta, parent) {
      this.parent = parent;
      this.key = key;
      this.meta = meta;
      this.children = new Map();
    }
  
    getKey() {
      return this.key;
    }
  
    getMeta() {
      return this.meta;
    }
  
    addChild(key, meta) {
      const child = new Tree(key, meta, this);
      this.children.set(key, child);
  
      return child;
    }
  
    getChild(key) {
      return this.children.get(key);
    }
  
    // BEGIN (write your solution here)
    hasChildren() {
  
      return this.children.size > 0;
    }
  
    hasChild(key) {
      return this.children.has(key);
    }
  
    getParent() {
      return this.parent
    }
  
    getDeepChild(keys) {
      if (keys.length === 0) {
        return null;
      }
      const [key, ...rest] = keys;
      const node = this.getChild(key);
      if (node === undefined) {
        return null;
      } else if (rest.length === 0) {
        return node;
      }
      return node.getDeepChild(rest);
    }
  
    removeChild(key) {
      return this.children.delete(key);
    }
  
    getChildren() {
      return [...this.children.values()];
    }
    // END
  }
  
  export default Tree;

tree = new Tree('animals');
tree.addChild('cats');
console.log(tree.key);
const dogs = tree.getChild('dogs');
console.log(dogs);
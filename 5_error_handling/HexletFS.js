import path from 'path';
import Tree from 'hexlet-trees';
import { Dir, File } from 'hexlet-fs';


const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return null;
    }
    return current.getMeta().getStats();
  }

  mkdirSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || parent.getMeta().isFile()) {
      return false;
    }
    parent.addChild(base, new Dir(base));
    return true;
  }

  // BEGIN (write your solution here)
  mkdirpSync(filepath) {
    const current = this.findNode(filepath);
    if (current) {
      return this.statSync(filepath).isDirectory();
    }
     const { dir } = path.parse(filepath);
     return this.mkdirpSync(dir) && this.mkdirSync(filepath);
  }

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
     const parent = this.findNode(dir);
     if (!parent || parent.getMeta().getStats().isFile()) {
      return false;
    }
     return parent.addChild(base, new File(base));
  }

  readdirSync(filepath) {
    const current = this.findNode(filepath);
    if(!current || current.getMeta().isFile()) {
      return false;
    }

    return current.getChildren().map(child => child.getKey());   
  }

  rmdirSync(filepath) {
    const current = this.findNode(filepath);
    if(!current || current.hasChildren() || current.getMeta().isFile()) {
      return false;
    }

    const { base } = path.parse(filepath);
    return current.getParent().removeChild(base);

  }
  // END

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}

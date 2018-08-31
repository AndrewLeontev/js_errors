import path from 'path';
import errors from 'errno';
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
      return [null, errors.code.ENOENT];
    }
    return [current.getMeta().getStats(), null];
  }

  // BEGIN (write your solution here)
  unlinkSync(filepath) {
    const { dir, base } = path.parse(filepath);
    let err;

    const parent = this.findNode(dir);
    if (!parent) {
      err = errors.code.ENOENT;
    }

    const current = this.findNode(filepath);
    if (current && current.getMeta().getStats().isDirectory()) {
      err = errors.code.EPERM;
    }
    
    return err ? [null, err] : [current.getParent().removeChild(current.getKey()), null];
  }

  readFileSync(filepath) {
    const current = this.findNode(filepath);
    let err;

    if (!current) {
      err = errors.code.ENOENT;
    } else if (current.getMeta().isDirectory()) {
      err = errors.code.EISDIR;
    }

    return err ? [null, err] : [current.getMeta().getBody(), null];
  }

  writeFileSync(filepath, content) {
    const { dir, base } = path.parse(filepath);
    let err;

    const parent = this.findNode(dir);
    if (!parent) {
      err = errors.code.ENOENT;
    }

    const current = this.findNode(filepath);
    if (current && current.getMeta().getStats().isDirectory()) {
      err = errors.code.EISDIR;
    }

    return err ? [null, err] : [parent.addChild(base, new File(base, content)), null];
  }
  // END

  mkdirpSync(filepath) {
    const result = getPathParts(filepath).reduce((subtree, part) => {
      if (!subtree) {
        return false;
      }
      const current = subtree.getChild(part);
      if (!current) {
        return subtree.addChild(part, new Dir(part));
      }
      if (current.getMeta().isFile()) {
        return false;
      }

      return current;
    }, this.tree);

    return !!result;
  }

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return [null, errors.code.ENOENT];
    }
    if (parent.getMeta().isFile()) {
      return [null, errors.code.ENOTDIR];
    }
    return [parent.addChild(base, new File(base, '')), null];
  }

  readdirSync(filepath) {
    const dir = this.findNode(filepath);
    if (!dir) {
      return [null, errors.code.ENOENT];
    } else if (dir.getMeta().isFile()) {
      return [null, errors.code.ENOTDIR];
    }
    return [dir.getChildren().map(child => child.getKey()), null];
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}

/* eslint-disable class-methods-use-this */

import Node from './Node';

// BEGIN (write your solution here)
export default class extends Node {
  constructor(name, body) {
    super(name);
    this.body = body;
  }

  getBody() {
    return this.body;
  }

  isDirectory() {
    return true;
  }

  isFile() {
    return false;
  }
}
// END

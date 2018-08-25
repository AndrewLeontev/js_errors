const path = '/etc/nginx/conf.d/hexlet.conf';

const keys = ['etc', 'nginx', 'conf.d'];
const subtree = tree.getDeepChild(keys);
assert.equal(subtree.getParent().getKey(), 'nginx');

const keys = ['etc', 'init', 'nginx.conf'];
const subtree = tree.getDeepChild(keys);
assert.equal = (subtree, undefined);
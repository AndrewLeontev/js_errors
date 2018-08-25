// создание
tree = new Tree('/')
const child = tree.addChild('home')
    .addChild('config', 'data');
tree.addChild('etc');

assert.ok(tree.hasChildren());
assert.ok(tree.hasChildren('home'));


// отображение
const node = tree.getCHild('home')
    .getChild('config');

assert.equal(node.getKey(), 'config');
assert.equal(node.getMeta(), 'data');
const files = new HexletFs();

assert.ok(!files.isDirectory('/etc'))

files.mkdirSync('/etc');
assert.ok(files.isDirectory('/etc'));

files.mkdirSync('/etc/nginx');
assert.ok(files.isDirectory('/etc/nginx'));
import HexletFs from './HexletFs';
let files;
files = new HexletFs();
files.mkdirSync('/etc');
console.log(files.statSync('/etc').isDirectory());
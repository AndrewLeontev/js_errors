import HexletFs from './03_fs_dynamic_dispetcherization/HexletFs';
let files;
files = new HexletFs();
files.mkdirSync('/etc');
console.log(files.statSync('/etc').isDirectory());
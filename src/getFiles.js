var fs = require('fs');

function getFiles(dir, fileList, fileName) {
  fileList = fileList || [];

  var files = fs.readdirSync(dir);
  for (var i in files) {
    if (!files.hasOwnProperty(i)) continue;
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList, fileName);
    } else {
      if (name.toLowerCase().includes(fileName.toLowerCase())) fileList.push(name);
    }
  }
  return fileList;
}

module.exports = { getFiles };
// export default getFiles;

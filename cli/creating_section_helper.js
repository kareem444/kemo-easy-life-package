const fs = require('fs');
const path = require('path');

const creatingSectionHelper = (name, folderName) => {
    const srcPath = path.join(process.cwd(), "src");

    if (!fs.existsSync(srcPath)) {
        fs.mkdirSync(srcPath);
    }

    const dirPath = path.join(srcPath, folderName);

    if (name[name.length - 1] != "s") {
        name += "s";
    }

    const filePath = path.join(dirPath, `${name}.js`);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
    }
}

module.exports = creatingSectionHelper

const fs = require("fs");
const path = require("path");
const {
    indexFile,
    routeFileContent,
    fileContent,
    createRequireSentence,
    fileContentIfController,
} = require("./files_content_cli_helper");

const creatingSectionHelper = (name, folderName) => {
    const srcPath = path.join(process.cwd(), "src");
    const indexPath = path.join(process.cwd(), "index.js");

    if (name[name.length - 1] != "s") {
        name += "s";
    }

    //#region make src folder and index in the project path
    if (!fs.existsSync(srcPath)) {
        fs.mkdirSync(srcPath);
    }

    if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, indexFile);
    }
    //#endregion

    const dirPath = path.join(srcPath, folderName);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    const filePath = path.join(dirPath, `${name}.js`);

    if (!fs.existsSync(filePath)) {
        if (folderName === "routes") {
            fs.writeFileSync(filePath, routeFileContent(name));
        } else if (folderName === "controllers") {
            fs.writeFileSync(
                filePath,
                fileContentIfController(
                    name + folderName.charAt(0).toUpperCase() + folderName.slice(1, -1)
                )
            );
        } else {
            fs.writeFileSync(
                filePath,
                fileContent(
                    name + folderName.charAt(0).toUpperCase() + folderName.slice(1, -1)
                )
            );
        }
    }

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        let allRequireSentence = "";
        let allModuleSentence = `\nmodule.exports = {\n`;

        // log the names of all files in the folder
        files.forEach((file, index) => {
            if (file != "index.js") {
                allRequireSentence += createRequireSentence(file);
                if (index === files.length - 1) {
                    allModuleSentence += `\t${file.slice(0, -3)}\n}`;
                } else {
                    allModuleSentence += `\t${file.slice(0, -3)},\n`;
                }
            }
        });

        const concatFile = allRequireSentence + allModuleSentence;

        const indexInDirPath = path.join(dirPath, "index.js");
        fs.writeFileSync(indexInDirPath, concatFile);
    });
};

module.exports = creatingSectionHelper;

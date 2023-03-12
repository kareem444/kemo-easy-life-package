const indexFile = `const kemo = require('kemo-easy-life');\nrequire('./src/routes/index')\n\nkemo.run();`

const routeFileContent = (route) => `const kemo = require("kemo-easy-life")
const {${route} : controllers} = require("../controllers/index.js")
const {${route} : middlewares} = require("../middlewares/index.js")
const {${route} : validations} = require("../validations/index.js")

kemo.routeGroup({
    groupPath: "/api/${route}",
    routes: [
        {
            path: "/",
            method: kemo.routeMethods.GET,
            execute: controllers.sayHello
        },
    ]
})

module.exports = {}
`


const fileContent = (name) => `const kemo = require("kemo-easy-life")

    const ${name} = {

    }

module.exports = ${name}
`
const fileContentIfController = (name) => `const kemo = require("kemo-easy-life")

    const ${name} = {
        sayHello: (req, res) => {
            res.send('Hello World!')
        }
    }

module.exports = ${name}
`

const createRequireSentence = (name) => `const ${name.slice(0, -3)} = require("./${name}");\n`

module.exports = {
    indexFile,
    routeFileContent,
    fileContent,
    createRequireSentence,
    fileContentIfController
}
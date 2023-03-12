const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { make } = require('simple-body-validator');

const constants = require('./utils/constants')
const validateObject = require('./utils/validate')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let kero = {
    route: async function ({
        method = 'get',
        path = null,
        validate = {},
        middlewares = [],
        execute = null
    } = {}) {
        if (path && typeof path == 'string') {
            if (execute) {
                middlewares = [
                    (req, res, next) => {
                        console.log(`-- Enter to path: "${path}" --.`)
                        const validatorArray = Object.keys(validate)
                        if (req.body && validatorArray.length > 0) {
                            const validator = make(req.body, validate)
                            if (!validator.stopOnFirstFailure().validate()) {
                                res.status(400).send(validator.errors().first())
                                throw new Error(validator.errors().first())
                            }
                        }
                        next()
                    },
                    ...middlewares
                ]
                return await app[method](path, ...middlewares, (req, res) =>
                    execute(req, res)
                )
            }
            throw new Error(`%% The execute method of "${path}" can't be null %%.`)
        }
        throw new Error(`%% The {path} property can't be null %%.`)
    },

    routeGroup: async function ({
        groupPath = '/api',
        routes = [],
        middlewares = []
    } = {}) {
        if (routes.length == 0) {
            throw new Error(`%% The routes can't be empty %%.`)
        }
        routes.forEach(async e => {
            if (typeof e !== 'object') {
                throw new Error(`%% The routes should be [kero.route] function %%.`)
            }
            let { method = "get", path = "/", validate = {}, middlewares: mws = [], execute = null } = e
            path = groupPath + path
            if (execute) {
                mws = [
                    (req, res, next) => {
                        console.log(`-- Enter to path: "${path}" --.`)
                        const validatorArray = Object.keys(validate)
                        if (req.body && validatorArray.length > 0) {
                            const validator = make(req.body, validate)
                            if (!validator.stopOnFirstFailure().validate()) {
                                res.status(400).send(validator.errors().first())
                                throw new Error(validator.errors().first())
                            }
                        }
                        next()
                    },
                    ...mws
                ]
                middlewares = [...middlewares, ...mws]
                return await app[method](path, ...middlewares, (req, res) =>
                    execute(req, res)
                )
            }
            throw new Error(`%% The execute method of "${path}" can't be null %%.`)
        })
    },

    run: ({ port = 7000, message } = {}) => {
        app.listen(process.env.PORT || port, () => {
            console.log(message || `-- App ruining at: http://127.0.0.1:${port}/ --.`)
        })
    }
}

Object.assign(kero, constants, { validate: validateObject })

module.exports = kero


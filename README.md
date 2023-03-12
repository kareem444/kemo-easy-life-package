
# Project Title

This package helps to easy create your own api with validation


## Installation

Install my-project with npm

```bash
npm i kemo-easy-life
```

## Using cli

To use cli commands for kemo-easy-life run this command:

```bash
npm i -g kemo-easy-life
//then
kemo-easy-life help //for more commands information
```
---
by using cli commands you can create sections very easy like this:
```bash
kemo-easy-life create-all users
```

This will auto generate users sections files like below:

![App Screenshot](https://i.ibb.co/0MmQ2gx/folders.png)

---
Not just sections file! the cli command will generate some ready code for your project like the user route below:

![App Screenshot](https://i.ibb.co/pWM1D5Y/route.png)

and the controller file :

![App Screenshot](https://i.ibb.co/HpJ6YH2/controller.png)

    
## Usage/Examples

Quick start, You can easly start runing server with this by using <b>run()<b>.
```javascript
const kemo = require("kemo-easy-life")

// this will start run the server at http://127.0.0.1:7000
kemo.run() 
```
To change the port or the message after runing:

```javascript
const kemo = require("kemo-easy-life")

// this will start run the server at http://127.0.0.1:3000
kemo.run({port = 3000, message: "Hello world"}) 
```


## Creating routes
Its easy to make routes like example blow:
```javascript
const kemo = require("kemo-easy-life")

    kemo.route({
        method: kemo.routeMethods.GET, // default get
        path: "/", // required
        execute : (req , res)=>{
            res.send("Hello World!")
        } // This output will be "Hello World!"
    })

kemo.run() 
```
## Creating routeGroup
To create group of routes use the example below:
```javascript
const kemo = require("kemo-easy-life")

kemo.routeGroup({
    groupPath: "/api/users",
    routes: [
        {
            execute: (req, res) => {
                res.send(`Hello from "api/users/"`)
            }
        },
        {
            path: "/create",
            method: kemo.routeMethods.POST,
            execute: (req, res) => {
                res.send(`Hello from "api/users/create"`)
            }
        },
    ]
})

kemo.run()
```

## Add middlewares
You can add any number of middlewares in middleware array like below.
```javascript
const kemo = require("kemo-easy-life")

const mdws = [
    (req, res, next) => {
        if (true) {
            console.log('Hello from first middleware');
            next()
        }
    },
    (req, res, next) => {
        if (true) {
            console.log('Hello from second middleware');
            next()
        }
    },
]

kemo.route({
    method: kemo.routeMethods.GET,
    path: "/",
    middlewares: mdws,
    execute: (req, res) => {
        res.send("Hello World!")
    }
})


kemo.run()
```
## routeGroup middlewares
You can add middlewares for the whole group or to spacific one .
```javascript
const kemo = require("kemo-easy-life")

const mdwsForGroup = [
    (req, res, next) => {
        if (true) {
            console.log('Hello from group middleware');
            next()
        }
    }
]

const mdwsForRoute = [
    (req, res, next) => {
        if (true) {
            console.log('Hello from route middleware');
            next()
        }
    }
]

kemo.routeGroup({
    groupPath: "/api/users",
    middlewares: mdwsForGroup,
    routes: [
        {
            middlewares: mdwsForRoute,
            execute: (req, res) => {
                res.send(`Hello from "api/users/"`)
            }
        },
    ]
})

kemo.run()
```

## Add Validation

```javascript
const kemo = require("kemo-easy-life")

const validation = {
    user_name: [
        kemo.validate.required,
        kemo.validate.alpha
    ],
    email: [
        kemo.validate.required,
        kemo.validate.email
    ],
    password: [
        kemo.validate.required,
        kemo.validate.alphaNum,
        kemo.validate.confirmed
    ],
    password_confirmation: [
        kemo.validate.requiredWithAll(["password"])
    ],
}

kemo.route({
    method: kemo.routeMethods.GET,
    path: "/",
    validate: validation,
    execute: (req, res) => {
        res.send("Hello World!")
    }
})

kemo.run()
```

## Validation keywords

```javascript
//# main validation wrods
    required,
    isTrue,
    alpha,
    alphaDash,
    alphaNum,
    array,
    boolean,
    confirmed,
    date,
    isFalse,
    email,
    json,
    integer,
    nullable,
    numeric,
    object,
    requiredAndNullable,
    string,
    url,
    validateOnlyIfExist,

//# main validation functions
    isTrueIf({ anotherFiled :"username" ,anotherFiledValue :"kareem" }),
    dateAfter("2021-12-11"),
    dateAfterOrEqual("2021-12-11"), 
    dateBefore("2021-12-11"),  
    dateBeforeOrEqual("2021-12-11"), 
    between({ min, max }), 
    dateEquals("2021-12-11"), 
    isFalseIf({ anotherFiled :"username" ,anotherFiledValue :"kareem" }),
    differentThanField(field), 
    endsWith([]), 
    greaterThan(field), 
    greaterThanOrEqual(field), 
    in([]), 
    lessThan(field),
    lessThanOrEqual(field), 
    max(value),
    min(value),
    notIn([]),
    regex(data),
    notRegex(data),
    requiredIf (data),
    requiredWith([]),
    requiredWithAll([]),
    requiredWithout([]),
    requiredWithoutAll([]),
    same(field),
    size(value),
```
#!/usr/bin/env node

const { program } = require("commander");

const creatingSectionHelper = require("./creating_section_helper");

const sectionsFolders = ["middlewares", "routes", "controllers", "validations"];

program
    .command("create-all <name>")
    .action((name) => {
        console.log(`Creating ${name} section`);
        sectionsFolders.forEach((folder) => {
            creatingSectionHelper(name, folder);
        });
    })
    .parse(process.argv);

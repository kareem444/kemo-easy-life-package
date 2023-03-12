#!/usr/bin/env node

const { program } = require("commander");

const creatingSectionHelper = require("./creating_section_helper");

const sectionsFolders = ["middlewares", "controllers", "validations", "routes"];

program
    .command("create-all <name>")
    .description(
        "Create all the sections ['middlewares','routes','controllers','validations']"
    )
    .action((name) => {
        console.log(`Creating ${name} section`);
        sectionsFolders.forEach((folder) => {
            creatingSectionHelper(name, folder);
        });
    });

sectionsFolders.forEach((folder) => {
    const section = folder.slice(0, -1);
    program
        .command(`create-${section} <name>`)
        .description(`Create ${section} section`)
        .action((name) => {
            console.log(`Creating ${section} for ${name} section`);
            creatingSectionHelper(name, folder);
        });
});

program.parse(process.argv);

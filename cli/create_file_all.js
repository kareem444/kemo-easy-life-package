#!/usr/bin/env node

const { program } = require("commander");

const creatingSectionHelper = require("./creating_section_helper");

const sectionsFolders = ["middlewares", "controllers", "validations", "routes"];

program
    .command("create <name>")
    .description(
        "Create all sections ['middlewares','routes','controllers','validations']"
    )
    .action((name) => {
        name.split("-").forEach((sectionName) => {
            console.log(`Creating ${sectionName} section`);
            sectionsFolders.forEach((folder) => {
                creatingSectionHelper(sectionName, folder);
            });
        })
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

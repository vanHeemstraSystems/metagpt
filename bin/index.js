#! /usr/bin/env node
// import { keyword, green, yellow } from 'chalk';
const chalk = require('chalk');
// import boxen from 'boxen';
const boxen = require('boxen');
// import translate from '@vitalets/google-translate-api';
const translate = require('@vitalets/google-translate-api');
// import { usage as _usage, showHelp } from "yargs";
const yargs = require('yargs');
// import { textSync } from 'figlet';
const figlet = require('figlet');

const usage = chalk.keyword('violet')("\nUsage: metagpt -l <language>  -s <sentence> \n"
+ boxen(chalk.green("\n" + "Translates a sentence to specific language" + "\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");
const options = yargs
      .usage(usage)
      .option("l", {alias:"language", describe: "Translate to language", type: "string", demandOption: false })
      .option("s", {alias:"sentence", describe: "Sentence to be translated", type: "string", demandOption: false })
      .help(true)
      .argv;

// console.log(yargs.argv);
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

if(argv.language == null && argv.l == null){
    console.log(
        chalk.yellow(
          figlet.textSync('MetaGPT', { horizontalLayout: 'full' })
        )
      );
    yargs.showHelp();
    return;
}
if(argv.sentence == null && argv.s == null){
    yargs.showHelp();
    return;
}

const language =  argv.l  || argv.language;

const sentence =  argv.s  || argv.sentence;

// console.log( language,sentence);
translate(sentence, {to: language.toLowerCase()}).then(res => {
    console.log("\n" + boxen(chalk.green( sentence + "\n\n" + res.text ), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");
}).catch(err => {
    console.error(err);
});
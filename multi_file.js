const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const utils = require('./src/utlis');

const DIR_NAME = './epub/aaa';
const BACKUP_DIR = './epub/aaa_5';

fs.copySync(DIR_NAME, BACKUP_DIR);

let files = [];
fs.readdirSync(DIR_NAME).forEach(file => {
    if (file.match('\.html')) {
        files.push(file);
    }
});

files.forEach((file, idx) => {
    const data = fs.readFileSync(path.join(DIR_NAME, file));
    const $ = cheerio.load(data);
    console.log(`parsing: ${idx+1}/${files.length}`);

//edit html section -------------

    // $('p.calibre20 > a').parent().remove();
    // $('h3:contains("Like this")').parent().remove();
    // $('div#comments').remove();
    // $('iframe').remove();
    utils.acronimToFootnotes($, $('acronym'), $('hr.calibre24').last());

// ------------------------------

    fs.writeFileSync(path.join(DIR_NAME, file), $.html());
});







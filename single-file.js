const fs = require('fs');
const cheerio = require('cheerio');

const FILE_NAME = './epub/index1.html';

const data = fs.readFileSync(FILE_NAME);
fs.rename(FILE_NAME, FILE_NAME+ '_');

const $ = cheerio.load(data);



//edit html section -------------

$('div#topbar-inner').remove();

// ------------------------------

fs.writeFileSync(FILE_NAME, $.html());

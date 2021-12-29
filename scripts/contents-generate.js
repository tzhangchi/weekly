const WEEKLY_START_DATE = require('./config').WEEKLY_START_DATE;

const fs = require("fs");
const moment = require("moment");

const path = require("path");

const rootDirPath = path.join(__dirname, "../");


const MAX = 83;
const yearMap = {};
const monthMap = {};
const CN_MANTH_MAP = ['一','二','三','四','五','六','七','八','九','十','十一','十二']
let fileContent = [];
for (let i = MAX; i >= 1; i--) {
    let weeklyDate = moment(WEEKLY_START_DATE)
    .add((i-1) * 7, "days")
    let year = weeklyDate.year();
    let month = weeklyDate.month();

  if(!yearMap[year]){
    yearMap[year] = 1;
    fileContent.push(`## ${year}`)
  }

  if(!monthMap[year+'_'+month]){
    monthMap[year+'_'+month] = 1;
    fileContent.push(`### ${CN_MANTH_MAP[month]}月`)
  }
  fileContent.push(`* 第 ${i} 期: [issue-${i}.md]('./docs/issue-${i}.md')`)
   
}

fs.writeFileSync(
    path.join(rootDirPath, "docs", "contents.md"),
    fileContent.join('\n'),
    "utf-8"
);
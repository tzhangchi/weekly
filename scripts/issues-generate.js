const fs = require("fs");
const moment = require("moment");

const path = require("path");

const rootDirPath = path.join(__dirname, "../");

function buildMD(i, fileContent) {
    let fileName = "issue-" + i + ".md";
    fs.writeFileSync(
        path.join(rootDirPath, "docs", fileName),
        fileContent,
        "utf-8"
    );
}
function buildMDContent(i) {
    // let lastDate = "2021-12-24";
    let contents = [];
    let pubDate = moment("2021-12-26")
        .subtract((83 - i)*7, "days")
        .format("YYYY年M月D日");
    contents.push(`# FTD 技术周刊第 ${i} 期：`);
    contents.push(
        `这是 「FTD 技术周刊」 第 ${i} 期，发表于：${pubDate}。本期刊开源（GitHub: [cg0101/weekly](https://github.com/cg0101/weekly)），欢迎 issue 区投稿，推荐或自荐项目。`
    );
    contents.push('\n')
    contents.push(`## 📅 订阅
本周刊每周日发布，同步更新在语雀 [[zhangchi1024/weekly](https://www.yuque.com/zhangchi1024/weekly)」 。`);

    return contents.join("\n");
}
const MAX = 83;

for (let i = 1; i <= MAX; i++) {
    let fileContent = buildMDContent(i);
    buildMD(i, fileContent);
}




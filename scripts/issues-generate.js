const WEEKLY_START_DATE = require("./config").WEEKLY_START_DATE;
const WEEKLY_MAX_NUM = require("./config").WEEKLY_MAX_NUM;

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
	let contents = [];
	let pubDate = moment(WEEKLY_START_DATE)
		.add((i - 1) * 7, "days")
		.format("YYYY年M月D日");
	contents.push(`# FTD 技术周刊第 ${i} 期：`);

	contents.push(
		`这是 「FTD 技术周刊」 第 ${i} 期，发表于：${pubDate}。本期刊开源（GitHub: [cg0101/weekly](https://github.com/cg0101/weekly)），欢迎 [issue](https://github.com/cg0101/weekly/issues) 区投稿，推荐或自荐项目。![](https://visitor-badge.glitch.me/badge?page_id=cg0101.weekly) <a href="https://www.linkedin.com/in/%E9%A9%B0-%E5%BC%A0-60669710a/">
        </a>`
	);
	contents.push(`## 封面图`);
	contents.push("\n");
	contents.push(
		fs.readFileSync(path.join(rootDirPath, "metadata", `m${i}.md`), "utf-8")
	);

	contents.push("\n");
	contents.push(`## 📅 订阅
本周刊每周日发布，同步更新在语雀 [[zhangchi1024/weekly](https://www.yuque.com/zhangchi1024/weekly)」 。`);
	contents.push("\n");
	contents.push(`微信搜索 「zhangchi_insight」 或者扫描二维码，即可订阅。
<div align="left"> <img src="https://cdn.nlark.com/yuque/0/2021/jpeg/132503/1640750963398-e8538e9e-6b96-46f7-abff-c93b56bdd377.jpeg?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_5byg6amw%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10%2Fresize%2Cw_426%2Climit_0" ></div>    
    （完）`);
	return contents.join("\n");
}

for (let i = 1; i <= WEEKLY_MAX_NUM; i++) {
	let fileContent = buildMDContent(i);
	buildMD(i, fileContent);
}

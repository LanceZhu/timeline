const child_process = require('child_process')

const commitMessage = child_process.execSync(`git log -1 --date=iso --pretty=format:'{"commit": "%h", "date": "%ad"}'`).toString()

const { commit: commitNumber, date: commitDate } = JSON.parse(commitMessage)

// 获取 git commit 信息中的 版本号 提交日期
module.exports = {
    commitNumber,
    commitDate
}
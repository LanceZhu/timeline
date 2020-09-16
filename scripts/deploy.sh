#/bin/bash
set -ex

starttime=`date +'%Y-%m-%d %H:%M:%S'`

# branch aidata

git checkout aidata

# 发明简史
echo 'invention start'
npm run build:invention > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-invention > /dev/null
echo -e "invention end"
sleep 10s

# 互联网简史
echo 'internet start'
npm run build:internet > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-internet > /dev/null
echo -e "internet end"
sleep 10s

# 教育简史
echo 'education start'
npm run build:invention > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-education > /dev/null
echo -e "education end"
sleep 10s

# eechina 中国高等工程教育简史
echo 'eechina start'
npm run build:eechina > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-eechina > /dev/null
echo -e "eechina end"
sleep 10s

# edudata 教育大数据
echo 'edudata start'
npm run build:edudata > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-edudata > /dev/null
echo 'edudata end'
sleep 10s

# aidata 人工智能技术和算法研究资料编年汇编
echo 'aidata start'
npm run build:aidata > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-aidata > /dev/null
echo 'aidata end'
sleep 10s

# infor 中国高等工程教育简史 信息领域
echo 'infor start'
npm run build:infor > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-infor > /dev/null
echo 'infor end'
sleep 10s

# cis 指挥信息系统技术与应用
echo 'cis start'
npm run build:cis > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-cis > /dev/null
echo 'cis end'
sleep 10s

endtime=`date +'%Y-%m-%d %H:%M:%S'`
start_seconds=$(date --date="$starttime" +%s)
end_seconds=$(date --date="$endtime" +%s)
echo "本次运行时间： "$((end_seconds-start_seconds))"s"
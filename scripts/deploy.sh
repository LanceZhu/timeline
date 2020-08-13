#/bin/bash
set -ex

# eechina edudata aidata infor

starttime=`date +'%Y-%m-%d %H:%M:%S'`

# branch aidata: eechina edudata aidata
git checkout aidata
echo 'eechina start'
npm run build:eechina > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-eechina > /dev/null
echo -e "eechina end"

echo 'edudata start'
npm run build:edudata > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-edudata > /dev/null
echo 'edudata end'

echo 'aidata start'
npm run build:aidata > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-aidata > /dev/null
echo 'aidata end'

# branch infor: infor
git checkout infor
echo 'infor start'
npm run build:infor > /dev/null
scp -r dist/* welishi:/home/ubuntu/wiki/wiki-docker-master/frontend/frontend-infor > /dev/null
echo 'infor end'

git checkout aidata

endtime=`date +'%Y-%m-%d %H:%M:%S'`
start_seconds=$(date --date="$starttime" +%s)
end_seconds=$(date --date="$endtime" +%s)
echo "本次运行时间： "$((end_seconds-start_seconds))"s"
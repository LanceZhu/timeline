#/bin/bash
set -ex

# branch master: invention internet education

echo "start building"

starttime=`date +'%Y-%m-%d %H:%M:%S'`

echo "start building invention"
echo "npm run build:invention"
npm run build:invention > /dev/null
echo -e "end building invention \n"
tar -zcf invention.tar.gz ./dist

echo "start building internet"
echo "npm run build:internet"
npm run build:internet > /dev/null
echo -e "end building internet \n"
tar -zcf internet.tar.gz ./dist

echo "start building education"
echo "npm run build:education"
npm run build:education > /dev/null
echo -e "end building education \n"
tar -zcf education.tar.gz ./dist

endtime=`date +'%Y-%m-%d %H:%M:%S'`
start_seconds=$(date --date="$starttime" +%s);
end_seconds=$(date --date="$endtime" +%s);
echo "本次运行时间： "$((end_seconds-start_seconds))"s"
#/bin/bash
# flush tencent cloud cdn
# tccli https://cloud.tencent.com/document/product/440/39027
# flush path api https://cloud.tencent.com/document/product/228/37871
set -ex

tccli cdn PurgePathCache --Paths '["http://invention.welishi.cn/", "http://internet.welishi.cn/", "http://education.welishi.cn/", "http://eechina.welishi.cn/" "http://aidata.welishi.cn/", "http://edudata.welishi.cn/", "http://infor.welishi.cn", "http://cis.welishi.cn/"]' --FlushType flush

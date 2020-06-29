#/bin/bash
# flush tencent cloud cdn
# tccli https://cloud.tencent.com/document/product/440/39027
# flush path api https://cloud.tencent.com/document/product/228/37871
set -e

tccli cdn PurgePathCache --Paths '["http://aidata.welishi.cn/", "http://edudata.welishi.cn/", "http://eechina.welishi.cn", "http://infor.welishi.cn"]' --FlushType flush

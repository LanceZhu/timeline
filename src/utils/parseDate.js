import dayjs from 'dayjs'

// 格式化时间点日期 2000/01/01 -> 2000年1月1日
export default function (date, format = 'YYYY年M月D日') {
  return dayjs(date).format(format)
}

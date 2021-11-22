export function friendlyDate(datsStr) {
    let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
    let time = dateObj.getTime()
    let now = Date.now()
    let space = now - time
    let str = ''
    if (space < 6000) {
        str = '刚刚'
    } else if (space < 1000 * 3600) {
        str = Math.floor(space / 60000) + '分钟前'
    } else if (space < 1000 * 3600 * 24) {
        str = Math.floor(space / 60000) + '小时前'
    } else {
        str = date.getFullYear() + date.getMonth() + date.getDate()
    }
}
/**
 *
 *  @auth xlx_good@qq.com
 *  @date 18/5/23.
 *
 */

/**
 * 格式化时间
 * @param {Data | String | Integer} [time] Date对象或者能被Date构造函数接收的参数
 * @param {String} [pattern = 'yyyy-mm-dd hh:ii:ss'] 格式
 * @return {String} 格式化以后的时间字符串
 */
function format(time, pattern) {
    var y, m, d, h, i, s;
    if (!pattern) {
        if (time) {
            pattern = time;
        } else {
            pattern = 'yyyy-mm-dd hh:ii:ss';
        }
        time = null;
    }
    if (!time) {
        time = new Date();
    } else if (!(time instanceof Date)) {
        time = new Date(time);
    }
    y = time.getFullYear();
    m = time.getMonth() + 1;
    d = time.getDate();
    h = time.getHours();
    i = time.getMinutes();
    s = time.getSeconds();
    m < 10 && (m = '0' + m);
    d < 10 && (d = '0' + d);
    h < 10 && (h = '0' + h);
    i < 10 && (i = '0' + i);
    s < 10 && (s = '0' + s);
    return pattern.replace('yyyy', y).replace('mm', m).replace('dd', d).replace('hh', h).replace('ii', i).replace('ss', s);
}

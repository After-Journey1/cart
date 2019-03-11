/*****
 * cookie的访问
 */
//写入cookie
function setCookie(name, value, expires) {
    if (expires != null) {
        var Days = expires; //天数
        var exp = new Date();
        exp.setDate(exp.getDate() + Days);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }else{
        document.cookie = name + "=" + escape(value);
    }

}

//读取cookie
function getCookie(name) {
    var strCookie = document.cookie; // “userId=828; userName=hulk;userId=828; userName=hulk”
    //将多cookie切割为多个名/值对
    var arrCookie = strCookie.split("; ");
    var result;
    //遍历cookie数组，处理每个cookie对
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        //找到名称为userId的cookie，并返回它的值
        if (name == arr[0]) {
            result = unescape(arr[1]);
            break;
        } else {
            result = null;
        }
    }
    return result;
}

//删除cookie
function delCookie(name) {
    //获取当前时间
    var date = new Date();
    //将date设置为过去的时间
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=;expires=" + date.toGMTString();
}
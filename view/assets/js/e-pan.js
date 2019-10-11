// var Epan = Epan || {};

// Epan.variable = {
//     windowH : window.innerHeight,
//     windwoW : document.body.scrollWidth
// };

// Epan.function = {
//     banner : function () {
//         document.querySelector(".banner").style.height = Epan.variable.windowH + "px";
//     }
// };
// Epan.function.banner();
// console.log(Epan.variable)

// 验证手机号
function mobileValidate (mobile) {
    var mobileReg = /^1[3|4|5|7|8|][0-9]{9}$/;
    if (!mobileReg.test(mobile)) {
        return false;
    } else {
        return true;
    }
}
// 验证email
function emailValidate (email) {
    var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailReg.test(email)) {
        return false;
    } else {
        return true;
    }
}
// 验证密码
function pwdValidate (pwd) {
    var pwdReg = /^([0-9a-zA-Z_]|[~!@#$%^&*\(\)\_\+\=\{\}\[\]\?\/\,\.]){6,20}$/;
    if (!pwdReg.test(pwd)) {
        return false;
    } else {
        return true;
    }
}

//验证身份证号码
function identification (num) {
    var num = num.toUpperCase().split(''),                              // 大写/格式化成数组
        ratio = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],  // 前17未对应的系数
        verification = [1, 0, 'X' , 9, 8, 7, 6, 5, 4, 3, 2],            // 最后一位对应值
        type,
        total = 0;

    if (num.length != 18 && num.length != 15) {
        // 位数不对，返回错误信息
        type = false;
    } else {
        if (num.length == 18) {
            for (var i = 0; i < ratio.length; i++) {
                total += Number(ratio[i]) * Number(num[i]);
            }
            // 计算方式：前17位身份证号乘以对应的系数再除以11取余，用余数为索引去取最后一位对应的值，把值与身份证最后一位做比较
            if (verification[total % 11] != num[num.length - 1]) {
                // 末尾验证不过，返回错误信息
                type = false;
            } else {
                // 通过
                type = true;
            }
        }
    }
    return type;
}

function formatCurrency1(num) {
    var num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    var sign = (num == (num = Math.abs(num))),
        num = Math.floor(num * 100 + 0.50000000001),
        cents = num % 100,
        num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num);
}

/**
    * JS获取URL中参数值
    * param : 参数名
    * ex : getQueryString('status') 获取url中status对应的值
**/
function getQueryString (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
* 时间转化
* 参数: 时间戳,分隔符
* 用例: formatDay("1488185873000",yyyy/MM/dd)
**/
Date.prototype.Format = function(fmt) {
    var o = {
        "M+" : this.getMonth() + 1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth() + 3) / 3),
        "S" : this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
function formatDay (timeStamp,fmt){
    var dateStr = new Date(timeStamp).Format(fmt);
    return dateStr;
}

/**
* formatNum
**/
function formatNum(str, size, delimiter) {
    var _str = str.toString();
    var _size = size || 3,
        _delimiter = delimiter || ',';

    var regText = '\\d{1,}' + _size + '}(\\d{' + _size + '})+$';
    var reg = new RegExp(regText, 'g');
    return _str.replace(/^(-?)(\d+)((\.\d+)?)$/, function ($0, $1, $2, $3) {
        return $1 + $2.replace(reg, '$&,') + $3;
    })
}

const TDK = {
    title: '付仲阔博客 | 前端博客-前端译文-前端资讯',
    description: '博客主要分享前端业内资讯，翻译国外前端文章，分享个人文章的公共资源平台。',
    keywords: '前端博客，前端译文，前端资讯'
}

export {
    mobileValidate,
    emailValidate,
    pwdValidate,
    getQueryString,
    identification,
    formatDay,
    formatCurrency1,
    TDK
}
var runyearMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var normalMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_name = [
    'january',
    'Febrary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Auguest',
    'September',
    'October',
    'November',
    'December'
];
//右侧图片
var backgroundImg = [
    'http://prts.wiki/images/9/95/%E7%AB%8B%E7%BB%98_%E9%98%BF%E7%B1%B3%E5%A8%85%28%E8%BF%91%E5%8D%AB%29_2.png',
    'http://prts.wiki/images/c/c2/%E7%AB%8B%E7%BB%98_%E6%B8%A9%E8%92%82_2.png',
    'http://prts.wiki/images/7/72/%E7%AB%8B%E7%BB%98_%E6%B3%A5%E5%B2%A9_2.png',
    'http://prts.wiki/images/2/2e/%E7%AB%8B%E7%BB%98_%E5%8F%B2%E5%B0%94%E7%89%B9%E5%B0%94_2.png',
    'http://prts.wiki/images/7/77/%E7%AB%8B%E7%BB%98_%E5%9B%9B%E6%9C%88_2.png',
    'http://prts.wiki/images/6/6c/%E7%AB%8B%E7%BB%98_%E6%A3%AE%E8%9A%BA_2.png',
    'http://prts.wiki/images/2/20/%E7%AB%8B%E7%BB%98_%E8%96%84%E7%BB%BF_2.png'
];



// --------------------------------------------------------------
var calendar = document.querySelector('.calendar');
// 让日历可以获取焦点
calendar.tabindex = "0";

// 在获取之前需要先生成
// 左侧图片盒子生成                     我打错英文了，左右互换一下
var rightbox = document.createElement('div');
rightbox.className = 'rightbox';
calendar.appendChild(rightbox);

// 右侧盒子生成
var leftBox = document.createElement('div');
leftBox.className = 'leftBox';
calendar.appendChild(leftBox);

// 右侧盒子内部的东西生成

// head部分开始生成年份信息  左侧盒子第一个子div
var head = document.createElement('div');
head.className = 'head';
leftBox.appendChild(head);

var h2 = document.createElement('h2');
head.appendChild(h2);

var a_prev = document.createElement('a');
var a_next = document.createElement('a');
a_prev.href = 'javascript:;';
a_next.href = 'javascript:;';
a_prev.className = 'prev';
a_next.className = 'next';
a_prev.innerHTML = '&lt;';
a_next.innerHTML = '&gt;';
head.appendChild(a_prev);
head.appendChild(a_next);

var okbtn = document.createElement('button');
okbtn.innerHTML = '选择完成';
okbtn.className = 'okbtn';
head.appendChild(okbtn);
//head部分生成完毕

// body部分开始生成放的日历日期  左侧第二个子div
var body = document.createElement('div');
body.className = 'body';
leftBox.appendChild(body);

////body内的第一个子物体
var bodych = document.createElement('div');
bodych.className = 'weekHead body-list';
body.appendChild(bodych);

//////bodych里面的子物体
var week_ul = document.createElement('ul');
bodych.appendChild(week_ul);

////////添加li
weekname = ['MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN'
];
var weeknumber = 0;
for (var i = 0; i < weekname.length; i++) {
    weeknumber = document.createElement('li');
    weeknumber.innerHTML = weekname[i];
    week_ul.appendChild(weeknumber);
}

////body内的第二个子物体生成dateBody
var dateBody = document.createElement('div');
dateBody.className = 'dateBody body-list';
body.appendChild(dateBody);

//////body第二个子物体的子物体，负责生成准确的日子
var days = document.createElement('ul')
days.id = 'days';
dateBody.appendChild(days);

//body部分生成完毕

// title月份部分开始生成 leftbox第三个子元素
var title = document.createElement('div');
title.className = 'title';
body.appendChild(title);

////title里面的month子元素
var month = document.createElement('ul');
month.id = 'month';
title.appendChild(month);

//////生成十二个月份 month的子元素
var month_number_li = 0;
var month_number_a = 0;
for (var i = 1; i <= 12; i++) {
    month_number_li = document.createElement('li');
    month_number_a = document.createElement('a');
    month.appendChild(month_number_li);
    month_number_li.appendChild(month_number_a);
    month_number_a.href = 'javascript:;';
    month_number_a.innerHTML = i;
}
//title生成完成
//全部生成完成
//--------------------------------------------------------------------------






var days = document.getElementById("days");

// 日期获取
var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();

// 月份按钮获取
var btnmonth = '';

//年份按钮获取
var year_prev = document.querySelector('.prev');
var year_next = document.querySelector('.next');
var yearNumber = document.querySelector('h2');
// 年份监听开关
var dowmBotton_btn = true;

// 日历现实开关
var show_calendar = true;

// 右图div
var rightbox = document.querySelector('.rightbox');

//随机数方法
var lastnum = 0;
var num = 0;

//获取输入框
var inputbtn = document.querySelector('.inputbtn');
// 设置输入框为只读
inputbtn && inputbtn.setAttribute('readOnly', true);

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    num = Math.floor(Math.random() * (max - min + 1)) + min;
    // 防止重复一张图
    while (num == lastnum) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    lastnum = num;
    return num;
}

//获取每月开始的第一天是星期几
function dayStart(month, year) {
    var tmpDate = new Date(year, month, 0);

    return (tmpDate.getDay());
}
//获取每月最后一天是星期几
function daylast(month, year, totalDay) {
    var tmpDate = new Date(year, month, totalDay);
    return (tmpDate.getDay());
}

// 计算是否是闰年，因为天数不同
function dayMonth(month, year) {
    var tmp = year % 4;
    if (tmp == 0) {
        return (runyearMonth[month]);
    } else {
        return (normalMonth[month]);
    }
}
//当前月的按钮变色
function thisMonth(month) {

    for (var i = 0; i < btnmonth.length; i++) {
        btnmonth[i].style.background = '';
    }
    btnmonth[month].style.background = 'rgb(244,196,48)';
}

//改变rightBox图
function changeImg() {
    rightbox.style.backgroundImage = "url(" + backgroundImg[getRandom(0, backgroundImg.length - 1)] + ")";
    rightbox.style.backgroundSize = '350%'
    rightbox.style.backgroundPosition = 'center';
}

// 当按钮按下时执行的监听事件
function dowmBotton() {
    dowmBotton_btn = false;

    //月份监听事件
    for (var i = 0; i < btnmonth.length; i++) {
        btnmonth[i].addEventListener('click', function() {
            for (var j = 0; j < btnmonth.length; j++) {
                btnmonth[j].style.background = '';
            }
            changeImg()
            my_month = this.getAttribute('index');
            // refreshDate();
            // choiceDays();
            refreshDate();
        });
    }
    // 年份监听事件
    year_prev.addEventListener('click', function() {
        my_year--;
        console.log(my_year);
        refreshDate();

    });
    year_next.addEventListener('click', function() {
        my_year++;
        refreshDate();
    });
}

// 选择日期事件
function choiceDays() {
    if (inputbtn) {
        var daysbtn = days.querySelectorAll('li');
        for (var i = 0; i < daysbtn.length; i++) {
            if (daysbtn[i].className == 'lightgrey' || daysbtn[i].className == 'todayBox' || daysbtn[i].className == 'darkgrey') {
                daysbtn[i].addEventListener('click', function() {
                    // for (var j = 0; j < daysbtn.length; j++) {

                    //     if (daysbtn[j].className == 'todayBox') {
                    //         console.log(daysbtn[j].className);
                    //         daysbtn[j].className == 'darkgrey';
                    //     }

                    // }
                    my_day = this.querySelector('a').innerHTML;
                    this.className = 'todayBox';
                    inputbtn.value = my_year + '-' + my_month + '-' + my_day;
                    refreshDate();
                })
            }
        }
    }
}
// 当承当input输入事件时，会出现的焦点监听和按钮监听主要是用在input框
function inpyfocus() {
    if (inputbtn) {
        inputbtn.addEventListener('focus', function() {
            calendar.style.display = 'block';
        });
        okbtn.addEventListener('click', function() {
            calendar.style.display = 'none';
        })
    } else {
        okbtn.style.display = 'none';
    }
}

//给每个月份一个自定义的属性，方面后面调整月份
function giveTag() {
    btnmonth = document.getElementById("month").querySelectorAll('li');
    for (var i = 0; i < 12; i++) {
        btnmonth[i].setAttribute('index', i);
    }

}

function refreshDate() {
    inpyfocus();
    var str = "";
    // 获取这个月份的总天数
    var totalDay = dayMonth(my_month, my_year);
    // 获取该月第一天是星期几
    var firstDay = dayStart(my_month, my_year);
    // 获取本月最后一天是星期几
    var lastDay = daylast(my_month, my_year, totalDay);
    var myclass;
    // console.log(firstDay);
    for (var i = 0; i < firstDay; i++) {
        myclass = "class='nullword'";
        str += "<li " + myclass + "></li>"; //起始日创建空白节点
    }
    for (var i = 1; i <= totalDay; i++) {
        // 如果是已经过了的日期，用灰色显示
        //三种情况灰色，本年本月过去的，上年以前的，本年本月以前的
        // inputbtn是用来判断是否有需要输入的框
        if (i == my_day && inputbtn) {
            myclass = " class = 'todayBox'";
        } else if ((i < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year < my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())) {
            myclass = " class = 'lightgrey'";
            //如果是日，年，月，都是现在，那么这个就特殊处理一下
        } else if (!inputbtn && i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {
            myclass = " class = 'todayBox'";
            // 否则用黑色字
        } else {
            myclass = " class='darkgrey'";
        }
        str += "<li" + myclass + ">" + "<a href = 'javascript:;'  >" + i + "</a>" + "</li>";
    }
    // console.log(lastDay);
    if (lastDay == 0) {

    } else {
        for (var i = lastDay; i < 7; i++) {
            myclass = "class='nullword'";
            str += "<li " + myclass + "></li>"; //起始日创建空白节点
        }
    }

    giveTag();
    // 日期显示
    days.innerHTML = str;
    // 年份显示
    yearNumber.innerHTML = my_year;
    thisMonth(my_month);

    //按钮监听事件只用执行一次，防止监听事件执行多次
    dowmBotton_btn && dowmBotton();
    //选择日期事件
    choiceDays();
    if (inputbtn) {
        inputbtn.value = my_year + '-' + (parseInt(my_month) + 1) + '-' + my_day;
        if (show_calendar) {
            calendar.style.display = 'none';
            show_calendar = false;
        }

    }

}
// 事件遮罩，即点击外面隐藏日历
if (inputbtn) {
    document.addEventListener("click", function(e) {
        var onhere = false;
        var eBox = e.path;
        for (var i = 0; i < e.path.length; i++) {
            if (eBox[i].className == "calendar" || eBox[i].className == "inputbtn") {
                onhere = true;
            }
        }
        if (!onhere) {
            calendar.style.display = 'none';
        }
    })
}
refreshDate();
$(function (params) {
    var xue_button = document.getElementById('xue_button');
    var xue_content = document.getElementsByClassName('xue_content')[0];
    var xue_xin = document.getElementById('xue_xin');  //版心
    function xue_getClient() {
        return {
            clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        }
    }
    console.log('1');
    var xue_height = xue_getClient().clientHeight / 10;
    xue_xin.style.height = xue_getClient().clientHeight + "px";
    xue_xin.style.width = xue_getClient().clientWidth + "px";
    xue_content.style.marginTop = xue_height + 'px';
    xue_zhezhao = document.getElementsByClassName('xue_zhezhao')[0];
    var xue_bgcli = document.getElementById('xue_bgcli');
    var xue_quanping = document.getElementById('xue_quanping');
    var xue_li = document.querySelectorAll('.xue_five'); //获得包含图片的li标签
    
    xue_button.onclick = function () {
        xue_quanping.className = "xue_quanping2";
        xue_button.style.display = "none";
    }
    
    
    
    
    // console.dir(xue_li)
    for (var i = 0; i < xue_li.length; i++) {
        xue_li[i].setAttribute('index', i + 17);
        
        xue_li[i].onmouseover = function () {
    
            for (let j = 0; j < xue_li.length; j++) {
                xue_li[j].style.opacity = "0.5";
    
            }
            var index = this.getAttribute("index");
            this.style.opacity = "1";
        
            
            this.onclick = function () {
                xue_button.style.display = "block";
                xue_quanping.className = 'xue_quanping1';
                var xue_str = './imgs/xue_' + index + '.png'; //拼接出图片的链接
                xue_bgcli.style.background = "url(" + xue_str + ")" + ' no-repeat' + ' center ';
                var jianjai = 0.5;
                xue_bgcli.style.opacity = 0.2;
                var xue_time;
                xue_time = setInterval(function () {
                    if (xue_bgcli.style.opacity < 1) {
                        jianjai += 0.1;
                        xue_bgcli.style.opacity = jianjai;
                        // console.log(jianjai);
                    } else {
                        xue_bgcli.style.opacity = 1;
                        clearInterval(xue_time);
                    }
                }, 100)
    
                if (index == 17 || index == 23) {
                    var newindex = index - 16;
                    var xue_str = './xue_' + newindex + '.png'; //拼接出图片的链接
                } else {
                    xue_bgcli.style.backgroundSize = "cover";
                }
            }
        }
        xue_li[i].onmouseout = function () {
            for (let j = 0; j < xue_li.length; j++) {
                xue_li[j].style.opacity = "0.9";
            }
    
        }
    }
})

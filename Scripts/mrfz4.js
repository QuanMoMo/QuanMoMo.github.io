(function (w) {
    // 1------获取相应元素-------------------------------
    var lybg = document.getElementById('ly_bg');
    var lyimgs = document.getElementById('imgs');
    var lylis = document.getElementsByClassName('tupian');
    // var imgList = document.getElementsByTagName('img');
    var lynones = document.querySelectorAll('.none');
    var lyaList = document.getElementsByClassName('dian');
    var lycontent = document.getElementById('content');
    var lyxiangqingList = document.getElementsByClassName('xiangqing');
    var lyremoveList = document.getElementsByClassName('remove');


    //2------获取屏幕高度和宽度 兼容函数-------------------
    function getClient() {
        return {
            clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        }
    }

    //3------设置背景宽高 和 遮罩层宽高  都是根据屏幕大小而变化
    var heightAuto = new getClient(); // 创建构造函数
    lybg.style.height = heightAuto.clientHeight + 'px'; // 背景图的高为窗口高度
    lybg.style.width = heightAuto.clientWidth + 'px';// 背景图的宽度为窗口宽度
    var shang = -imgs.offsetHeight; // 创建一个变量储存imgs 盒子的高度
    lyimgs.style.top = shang + 'px';//设置初始进入距离是负屏幕的高度
    lycontent.style.top = shang + 'px';//设置初始进入距离是负屏幕的高度


    // 4------设置元素从上往下划入动画--------------------

    $(window).scroll(function () {   //开始监听滚动条
       
        
        var top = $(document).scrollTop();  //滚动条距离顶部的高度
        if (Math.ceil(top)==$('#story')[0].offsetTop) {
            console.log('到了');
            
            lyanimationSlow(lyimgs, 0)  // 当定位top距离为0时  就到达目的地
            $('#imgs').children().fadeIn(1500);
            

        }
        console.log(1111);
        console.log('top'+Math.ceil(top));
        console.log($('#story')[0].offsetTop);

    })
    // 封装缓动动画函数  
    function lyanimationSlow(ele, target) {

        // 3. 清空计时器
        clearInterval(ele.timeID);

        // 4. 设置计时器
        ele.timeID = setInterval(function () {

            // 5. 获取元素当前位置
            var position = ele.offsetTop;
            var position = position;
            // ***********************************************
            // 减去大盒子距离浏览器顶部的距离  固定距离

            // 6. 设置步长=====缓动=====越来越慢
            // 越靠近目标速度越慢====越靠近目标步长越小
            var step = Math.ceil((target - position) / 3);


            // 7. 修改距离
            position += step;


            // 8. 改变元素的位置
            ele.style.top = position + 'px';

            // 9. 当到达目标位置的时候,停止计时器
            if (position == target) {
                clearInterval(ele.timeID);
            }
        }, 50)
    };

    // 5------设置屏幕根据鼠标移动而移动动画---------------
    for (i = 0; i < lylis.length; i++) {
        lylis[i].style.transition = 'all' + ' 2s';
    }
    var lynewz;
    var lynewy;
    window.onmousemove = function (e) {
        var lyoldw = lynewz;
        // var oldy = newy;
        //写下鼠标的位置
        e = e || window.event;
        var getpagex = e.pageX;              //x轴
        var getpagey = e.pageY;              //y轴

        // 图片7-12
        if (getpagex > 0) {
            //如果当时取到的坐标大于0  则把这个坐标保存起来,并与下次的坐标判定,是否
            if (lyoldw > getpagex) {
                for (i = 6; i < lylis.length; i++) {
                    lylis[i].style.transform = "translate(" + '25px' + "," + '0' + ")";
                }
            } else {
                for (i = 6; i < lylis.length; i++) {
                    lylis[i].style.transform = "translate(" + '-25px' + "," + '0' + ")";
                }
            }
        };
        if (getpagey > 0) {
            //如果当时取到的坐标大于0  则把这个坐标保存起来,并与下次的坐标判定,是否
            if (lynewy > getpagey) {
                for (i = 6; i < lylis.length; i++) {
                    lylis[i].style.transform = "translate(" + '0x' + "," + '25px' + ")";
                }
            } else {
                for (i = 6; i < lylis.length; i++) {
                    lylis[i].style.transform = "translate(" + '0' + "," + '-25px' + ")";
                }
            }
        }


        // 白框图片 1-6
        if (getpagex > 0) {
            //如果当时取到的坐标大于0  则把这个坐标保存起来,并与下次的坐标判定,是否
            if (lyoldw > getpagex) {
                for (i = 0; i < lylis.length - 6; i++) {
                    lylis[i].style.transform = "translate(" + '15px' + "," + '0' + ")";
                }
            } else {
                for (i = 0; i < lylis.length - 6; i++) {
                    lylis[i].style.transform = "translate(" + '-15px' + "," + '0' + ")";
                }
            }
        };
        if (getpagey > 0) {
            //如果当时取到的坐标大于0  则把这个坐标保存起来,并与下次的坐标判定,是否
            if (lynewy > getpagey) {
                for (i = 0; i < lylis.length - 6; i++) {
                    lylis[i].style.transform = "translate(" + '0x' + "," + '15px' + ")";
                }
            } else {
                for (i = 0; i < lylis.length - 6; i++) {
                    lylis[i].style.transform = "translate(" + '0' + "," + '-15px' + ")";
                }
            }
        }
        lynewy = getpagey;
        lynewz = getpagex;
    }

    // 6------设置鼠标移入图片显示文字---------------------
    // 原生代码  只是简单的显示与消失 没有动画效果
    // for (var i = 0; i < lyaList.length; i++) {
    //     lyaList[i].setAttribute('index', i);
    //     lyaList[i].style.transition = 'all' + ' 0.5s';
    //     // 鼠标移入事件  文字显示
    //     lyaList[i].onmouseover = function () {
    //         var index = this.getAttribute('index');
    //         lynones[index].className += ' block';
    //     }

    //     // 鼠标移出事件  文字消失
    //     lyaList[i].onmouseout = function () {
    //         var index = this.getAttribute('index');
    //         lynones[index].className = 'none';

    //     }
    // }

    $('.dian').mouseenter(function () {

        $(this).children('.none').stop(true,false).slideDown(500);

    });
    $('.dian').mouseleave(function () {
        $(this).children('.none').fadeOut(300);

    });


    // 7------设置点击图片 内容消失,显示点击盒子的详情内容----
    for (var i = 6; i < lylis.length; i++) { // 因为前6个li标签是背景框  所有这里从第七个开始遍历
        // 给需要点击的li标签设置索引
        lylis[i].setAttribute('index', i);
        lylis[i].onclick = function () {
            // 点击事件开始的时候就循环给每个li标签加上none 类名让所有元素隐藏
            for (var i = 0; i < lyxiangqingList.length; i++) {
                lyxiangqingList[i].className = 'xiangqing none'
            }
            lyanimationSlow(lyimgs, shang)
            // 上面的内容往上滑 消失
            lyanimationSlow(lycontent, 0);
            // 然后把一开始就隐藏的内容往下拉  显示
            var index = this.getAttribute('index');
            lyxiangqingList[index - 6].className = 'xiangqing block'
        }
    }
    $('.xianshi').click(function () {
        $('.rightText').children().fadeIn(2000);
        $('.left').fadeIn(2000);
    })
    $('.remove').click(function () {
        $('.rightText').children().hide();
        $('.left').hide();
    })


    // 8------给X设置点击事件 让上下内容交替 -----------------
    for (var i = 0; i < lyremoveList.length; i++) {
        lyremoveList[i].onclick = function () {
            lyanimationSlow(lyimgs, 0)
            lyanimationSlow(lycontent, shang);
        }
    }

    w.getClient = getClient
}(window))


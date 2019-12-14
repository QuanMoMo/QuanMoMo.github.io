$(function () {
    // $('cj_news-container  a').attr('target','_blank');
    //tab切换
    var $tabBtns = $('.cj_news-tab a');
    //设置默认页
    var $newBlock = $('.cj_news-container .cj_news-block')
    $($newBlock[0]).show().siblings('.cj_news-block').hide();
    var tbIndex = 0;
    $tabBtns.click(function () {
        $(this).addClass('tab-btn').siblings('a').removeClass('tab-btn');
        tbIndex = $(this).index();
        $($newBlock[tbIndex]).show().siblings('.cj_news-block').hide();
    });

    //banner分页icon小动画 及轮播图
    var $newBanner = $('.cj_news-banner');
    var $pageBullets = $('.page-bullet');
    var $banner = $('.banner');
    var banWidth = $newBanner[0].clientWidth;

    $newBanner.mouseenter(function () {
        $pageBullets.height('5px');
    });
    $newBanner.mouseleave(function () {
        $pageBullets.height('3px');
    });


    //第一个分页icon添加默认色
    $($pageBullets[0]).addClass('bullet').siblings('span').removeClass('bullet');
    //分页icon切换轮播图
    var buIndex = 0;    //分页icon索引
    $pageBullets.click(function () {
        //点击分页icon时先清除之前的自动轮播定时器,再生成
        clearInterval(timeID);
        timeID = setInterval(function () {
            if (liIndex == 5) {
                $banner[0].style.left = 0;
                liIndex = 0;
            }
            liIndex++;
            $banner.animate({ left: `-${liIndex * banWidth}px` }, 500);
            $($pageBullets[liIndex]).addClass('bullet').siblings('span').removeClass('bullet');
            //同步分页icon颜色
            if (liIndex == 5) {
                $($pageBullets[0]).addClass('bullet').siblings('span').removeClass('bullet');
            } else {
                $($pageBullets[liIndex]).addClass('bullet').siblings('span').removeClass('bullet');
            }
        }, 3000)
        $(this).addClass('bullet').siblings('span').removeClass('bullet');
        buIndex = $(this).index();
        $banner.animate({ left: `-${buIndex * banWidth}px` }, 500)
        liIndex = buIndex;    //索引同步
        // setInterval(timeID);
    });

    //克隆第一个li标签追加到ul中
    var $newLi = $($('.banner>li')[0]).clone(true);
    $banner.append($newLi);

    //自动轮播
    var liIndex = 0;    //轮播图li标签索引
    var timeID;
    timeID = setInterval(function () {
        if (liIndex == 5) {
            $banner[0].style.left = 0;
            liIndex = 0;
        }
        liIndex++;
        $banner.animate({ left: `-${liIndex * banWidth}px` }, 500);
        $($pageBullets[liIndex]).addClass('bullet').siblings('span').removeClass('bullet');
        //同步分页icon颜色
        if (liIndex == 5) {
            $($pageBullets[0]).addClass('bullet').siblings('span').removeClass('bullet');
        } else {
            $($pageBullets[liIndex]).addClass('bullet').siblings('span').removeClass('bullet');
        }
    }, 3000)

    //新闻内容li标签淡入淡出
    var $item = $('.cj_news-block .item');
    var $bg = $('.cj_news-block .item .bg')
    for (var i = 0; i < $item.length; i++) {
        (function (i) {
            $($item[i]).mouseenter(function () {
                $bg.each(function () {
                    $($bg[i]).stop(true, false).fadeIn(300);
                })
            })
            $($item[i]).mouseleave(function () {
                $bg.each(function () {
                    $($bg[i]).stop(true, false).fadeOut(300);
                })
            })
        }(i))
    }
    //更多情报按钮遮幕 淡入淡出
    $('.cj_news .cj_news-jump .link').mouseenter(function () {
        $('.cj_news .cj_news-jump .bg').stop(true, false).fadeIn(300);
    })
    $('.cj_news .cj_news-jump .link').mouseleave(function () {
        $('.cj_news .cj_news-jump .bg').stop(true, false).fadeOut(300);
    })

})


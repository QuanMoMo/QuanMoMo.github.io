$(function () {
    // $('cj_news-container a').attr('target','_blank');
    //获取窗口可视化高度并赋值给body标签
    var $height1 = $(window).height();
    $('body').height($height1);

    //tab切换
    var $tabBtns = $('.cj_news-tab a');
    var $newBlock = $('.cj_news-container .cj_news-block')
    //设置默认页展示
    $($newBlock[0]).show().siblings('.cj_news-block').hide();
    var mlen = Math.ceil($($newBlock[0]).children.length / 9)
    for (var i = 0; i < mlen; i++) {
        $(`<span>${i + 1}</span>`).appendTo($('.cj_news-jump .page-btn'));
    }
    $($('.cj_news-jump .page-btn span')[0]).css({ backgroundColor: '#2bf', color: '#000' });


    //------------------------------------------------------


    //tab栏切换
    var tbIndex = 0;    //tab按钮索引

    $tabBtns.click(function () {
        // var btnIndex = 0;
        $(this).addClass('tab-btn').siblings('a').removeClass('tab-btn');
        tbIndex = $(this).index();
        $($newBlock[tbIndex]).show().siblings('.cj_news-block').hide();

        //生成数字按钮前先清除之前的数字按钮
        $('.cj_news-jump .page-btn').empty();

        //获取对应页面li标签的个数/9  向上取整来判断生成数字按钮的个数
        var len = Math.ceil(($newBlock[tbIndex].children.length) / 9);
        //动态生成追加数字按钮  
        for (var i = 0; i < len; i++) {
            $(`<span>${i + 1}</span>`).appendTo($('.cj_news-jump .page-btn'));
        }
        //给第一个数字按钮添加默认背景
        $($('.cj_news-jump .page-btn span')[0]).css({ backgroundColor: '#2bf', color: '#000' });
        //给数字按钮添加点击事件
        var numIndex = 0;                                  //设置数字按钮索引

        for (var i = 0; i < $('.cj_news-jump .page-btn span').length; i++) {
            $($('.cj_news-jump .page-btn span')[i]).click(function () {
                var btnnum = $(this).index() + 1;//当前点击第几个
                //当前tab下news所有li标签的个数
                var linum = $($newBlock[tbIndex]).find($('.item')).length;
                //排他
                for (var i = 0; i < $($newBlock[tbIndex]).find($('.item')).length; i++) {
                    $($($newBlock[tbIndex]).find($('.item'))[i]).hide();
                }
                //绑定
                for (var i = (btnnum - 1) * 9; i < btnnum * 9; i++) {
                    $($($newBlock[tbIndex]).find($('.item'))[i]).show()
                }

                var newNindex = $('.cj_news-jump .page-btn span').length

                //排他
                $(this).siblings('span').css({ backgroundColor: '', color: '#fff' });
                //设置背景色和文字颜色
                $(this).css({ backgroundColor: '#2bf', color: '#000' });

                //上一页,下一页点击次数同步
                btnIndex = $(this).index();
                //上一页,下一页按钮显示影藏的时机
                if ($(this).index() > 0) {
                    $('.cj_news-jump .left-btn').show();
                } else {
                    $('.cj_news-jump .left-btn').hide();
                }
                if ($(this).index() < newNindex - 1) {
                    $('.cj_news-jump .right-btn').show();
                } else {
                    $('.cj_news-jump .right-btn').hide();
                }
            });
        }
        //----------------------------------------------------------


        //判断下一页按钮和上一页按钮显示时机
        if ($('.cj_news-jump .page-btn span').length > 1) {
            //说明有两个以上的数字按钮
            $('.cj_news-jump .right-btn').show();

            //每次切换tab时先隐藏上一页按钮
            $('.cj_news-jump .left-btn').hide();

            //tab切换后先清除上一页下一页点击事件
            $('.cj_news-jump .right-btn').off('click');
            $('.cj_news-jump .left-btn').off('click');

            //给下一页,上一页按钮设置点击事件  并记录点击次数
            var btnIndex = 0;
            $('.cj_news-jump .right-btn').click(function () {
                // console.log(btnIndex);
                btnIndex++;
                var newNindex = $('.cj_news-jump .page-btn span').length
                $($('.cj_news-jump .page-btn span')[btnIndex]).siblings('span').css({ backgroundColor: '', color: '#fff' });
                $($('.cj_news-jump .page-btn span')[btnIndex]).css({ backgroundColor: '#2bf', color: '#000' });
                $('.cj_news-jump .left-btn').show();
                if (btnIndex == newNindex - 1) {
                    $('.cj_news-jump .right-btn').hide();
                }

                for (var i = 0; i < $($newBlock[tbIndex]).find($('.item')).length; i++) {
                    $($($newBlock[tbIndex]).find($('.item'))[i]).hide();
                }
                for (var i = btnIndex * 9; i < (btnIndex + 1) * 9; i++) {
                    $($($newBlock[tbIndex]).find($('.item'))[i]).show()
                }

            })

            $('.cj_news-jump .left-btn').click(function () {
                btnIndex--;
                $($('.cj_news-jump .page-btn span')[btnIndex]).siblings('span').css({ backgroundColor: '', color: '#fff' });
                $($('.cj_news-jump .page-btn span')[btnIndex]).css({ backgroundColor: '#2bf', color: '#000' });
                $('.cj_news-jump .right-btn').show();
                if (btnIndex == 0) {
                    $('.cj_news-jump .left-btn').hide();
                }

                for (var i = 0; i < $($newBlock[tbIndex]).find($('.item')).length; i++) {
                    $($($newBlock[tbIndex]).find($('.item'))[i]).hide();
                }
                for (var i = btnIndex * 9; i < (btnIndex + 1) * 9; i++) {
                    $($($newBlock[tbIndex]).find($('.item'))[i]).show()
                    console.log(i);
                }
            })

        } else {
            $('.cj_news-jump .right-btn').hide();
            $('.cj_news-jump .left-btn').hide();
        }


    });

    //-------------------------------------------

    //鼠标淡入淡出
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


})


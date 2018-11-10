//拿到各类元素
$(function () {
    var $a=$(".buttons a");
    var $s=$(".buttons span");
    var cArr=["p7","p6","p5","p4","p3","p2","p1",];
    var index=0;

//两边按钮切换图片
    $('.next').click(function () {
        nextimg();
    });
    $('.prev').click(function () {
        previmg();
    });

    function nextimg() {
        cArr.push(cArr[0]);//76543217
        cArr.shift();//6543217
        $('li').each(function (i) {
            $(this).removeClass().addClass(cArr[i]);
            //遍历li标签，添加盘p7-p1属性
        });
        index++;
        if(index>6){
            index=0;
        }
        btnshow();
    }
    function previmg() {
        cArr.unshift(cArr[6]);//17654321
        cArr.pop();//1765432
        $('li').each(function (i) {
            $(this).removeClass().addClass(cArr[i]);
            //遍历li标签，添加盘p7-p1属性
        });
        index--;
        if(index<0){
            index=6;
        }
        btnshow();
    }
    function btnshow(){
        $s.eq(index).addClass("blue").parent().siblings().children().removeClass("blue");
    }

//下边按钮切换图片
    $a.each(function () {
        $(this).click(function () {
            var numindex=$(this).index();
            var b=numindex-index;
            console.log(b);
            if (b==0){
                //点击的是当前图片
                return
            }else if(b>0){
                var newarr=cArr.splice(0,b);
                cArr=$.merge(cArr,newarr);
                $("li").each(function (i) {
                    $(this).removeClass().addClass(cArr[i]);
                });
                index=numindex;
                btnshow()
            }else if(b<0){
                cArr.reverse();
                var oldarr=cArr.splice(0,-b)
                cArr=$.merge(cArr,oldarr);
                cArr.reverse();
                $("li").each(function(i,e){
                    $(e).removeClass().addClass(cArr[i]);
                });
                index=numindex;
                btnshow();

            }
        })
    });
    //改变底下按钮的背景色
    function show(){
        $s.eq(index).addClass("blue").parent().siblings().children().removeClass("blue");
    }

    //点击class为p2的元素触发上一张照片的函数
    $(document).on("click",".p2",function(){
        previmg();
        return false;//返回一个false值，让a标签不跳转
    });

    //点击class为p4的元素触发下一张照片的函数
    $(document).on("click",".p4",function(){
        nextimg();
        return false;
    });

    //			鼠标移入box时清除定时器
    $(".box").mouseover(function(){
        clearInterval(timer);
    })

    //			鼠标移出box时开始定时器
    $(".box").mouseleave(function(){
        timer=setInterval(nextimg,4000);
    })

    //			进入页面自动开始定时器
    timer=setInterval(nextimg,4000);

})

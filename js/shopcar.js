$(function () {
    var myScroll
    var arr = []

    function isc() {

        var myScroll1 = new IScroll(".wrapper1", {
            scrollX: false,
            scrollY: true,
            snap: true,
            // click:true
        })

        $.each($(".slide-wrap"), function (index, val) {
            $(this).addClass("s-wrap" + index)
            myScroll = new IScroll(".s-wrap" + index, {
                scrollX: true,
                scrollY: false,
                probeType: 3,
                snap: true,
                click: true
            })
            arr.push(myScroll)
            //    console.log(arr)
        })
    }
    //页面加载时判断cookie
    function checkCookie1() {

        if (getCookie("user") != null) {
            //商品数据加载
            $(".main1").hide()
            function Ajax() {
                $.ajax({
                    type: "POST",
                    url: "api/shopcar.php",
                    dataType: "json",
                    success: function (data) {
                        // console.log(data)
                        var tpl = document.getElementById('tpl').innerHTML;
                        var html = ejs.render(tpl, {
                            list: data
                        });
                        $(".cart-content").html(html)
                        var html2 = data.length
                        $("#index_cart .W_footer_tag").html(html2)

                        isc()
                        Allprice()
                    }
                })
            }
            Ajax()
        }else{
            $("main").hide()
        }
    }
    checkCookie1()


    //编辑全部点击
    $(".car-right p").click(function () {
        $(this).toggleClass("h").siblings().toggleClass("h")
        $(".desc").toggleClass("h");
        $(".editor").toggleClass("h");

        $(".slide-scroller").toggleClass("w");
        $(".btns").toggleClass("h");

        $.each(arr, function (index, val) {
            // console.log(val)
            val.refresh();
        })

    })

    // 商品单选点击
    $(".W-cart").on('click', '.goods .cart-tik', function () {
        $(this).children(".icon-a-red-tik").toggleClass("h")
        //遍历每个店铺
        var $singleShop = $(this).parents(".shop-blocks").find(".goods .icon-a-red-tik");
        var $shopEle = $(this).parents(".shop-blocks").find(".shop-title .icon-a-red-tik");
        var $danShop = $(".goods .icon-a-red-tik")
        var $quanEle = $(".footer-bar .cart-tik .icon-a-red-tik")
        counting($singleShop, $shopEle);
        counting($danShop, $quanEle)
        Allprice()
    })
    // 店铺全选点击
    $(".W-cart").on('click', '.shop-title .cart-tik', function () {
        $(this).children(".icon-a-red-tik").toggleClass("h");
        $(this).parents(".shop-blocks").find(".goods .icon-a-red-tik").toggleClass("h");
        var $shopEle = $(".shop-blocks").find(".shop-title .icon-a-red-tik");
        var $quanEle = $(".footer-bar .cart-tik .icon-a-red-tik");
        counting($shopEle, $quanEle)
        Allprice()

    })
    // 底部全选点击
    $(".footer-bar").on('click', '.cart-tik', function () {
        var el = $(this).children(".icon-a-red-tik")
        if (el.hasClass("h")) {
            el.removeClass("h")
            $(".W-cart").find(".icon-a-red-tik").removeClass("h");
            console.log('remove')
        } else {
            el.addClass("h")
            $(".W-cart").find(".icon-a-red-tik").addClass("h");
            console.log('add')
        }
        Allprice()
    })

    //计数的函数
    function counting(obj, ele) {
        var count = 0;
        obj.each(function () {
            if (!$(this).hasClass("h")) {
                count++
            }
        })
        if (count == obj.length) {
            ele.removeClass("h");
        } else {
            ele.addClass("h");
        }
    }


    //计算总价钱
    function Allprice() {
        var totalPrice = 0;
        var arr = []
        $(".goods .icon-a-red-tik").each(function () {

            if (!$(this).hasClass("h")) {
                //获取每个商品的单价
                var singlePrice = parseFloat($(this).parents(".lines").find(".wbiaoPrice").html());
                // console.log($(this).parents(".lines").find(".wbiaoPrice").html())
                //获取每个商品的数量
                var goodsNum = parseInt($(this).parents(".lines").find(".quatity span").html());
                // console.log($(this).parents(".lines").find(".quatity span").html())
                //获取每个商品的小计
                var sub = (singlePrice * goodsNum);
                console.log(sub)
                arr.push(sub)
            }

        })
        // console.log(arr)
        $.each(arr, function (index, val) {
            // 获取选中的小计,计算总价钱
            // console.log(val)
            var priceNum = parseFloat(val);
            totalPrice += priceNum;
            totalPrice.toFixed(2);
            // console.log(totalPrice)
        })
        $("#payableAmount").text(totalPrice)
        $("#goodsAmount").text(totalPrice)
    }
    // Allprice()


    // 每个商品数量增时
    $(".W-cart").on("click", ".plus", function () {
        var goodsNum = $(this).prev().html();
        // console.log(goodsNum)
        goodsNum++;
        // console.log(goodsNum)
        $(this).prev().html(goodsNum);
        $(this).parents(".inner").find(".quatity span").html(goodsNum)
        Allprice();
        // 发起ajax请求
        var $goodsNum = $(this).prev().html();
        var $goodsID = $(this).parents(".goods").data("goodsid")
        console.log($goodsNum)
        $.ajax({
            type: "post",
            url: "api/cartAdd.php",
            data: {
                goodsNum: $goodsNum,
                goodsID: $goodsID
            },
            success: function (data) {
                if (data.code == 1) {
                    Allprice()
                } else {

                }

            }
        })
    })
    // 每个商品数量减时
    $(".W-cart").on("click", ".minus", function () {
        var goodsNum = $(this).next().html();
        goodsNum--;
        if (goodsNum == 0) {
            goodsNum = 1
        }
        $(this).next().html(goodsNum);
        $(this).parents(".inner").find(".quatity span").html(goodsNum)
        Allprice();
        // 发起ajax请求
        var $goodsNum = $(this).next().html();
        var $goodsID = $(this).parents(".goods").data("goodsid")
        $.ajax({
            type: "post",
            url: "api/cartAdd.php",
            data: {
                goodsNum: $goodsNum,
                goodsID: $goodsID
            },
            success: function (data) {
                if (data.code == 1) {
                    Allprice()
                } else {

                }
            }
        })
    })

    //删除商品函数
    function del() {
        var $cartMainLength = $(this).parents(".shop-blocks").children(".goods").length;
        var $goodsListLength = $(this).parents(".W-cart").children(".shop-blocks").length
        if ( $goodsListLength== 1 && $cartMainLength == 1) {
            $(this).parents(".shop-blocks").remove();
            $(".wrapper1").hide()
            $(".main1").show();
            
        }
        if ($cartMainLength == 1) {
            $(this).parents(".shop-blocks").remove();
        }
        $(this).parents(".goods").remove();
        Allprice();
    }

    //左滑删除商品
    $(".W-cart").on("tap", ".to-delete",del)
    $(".W-cart").on("tap", ".del",del)
})
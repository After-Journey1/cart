var myDetail = {
    isLogin: function () {
        return document.cookie.indexOf("m_c") >= 0 ? 1 : 0
    }(),
    updateIsLogin: function () {
        this.isLogin = function () {
            return document.cookie.indexOf("m_c") >= 0 ? 1 : 0
        }()
    },
}





globalCart = {
    // 获取购物车中商品的总数量
    getQuantity: function (suc) {
        // 将传入的参数与默认的配置进行合并
        var opts = {
            success: function () { }
        };
        var sets = $.extend(opts, suc);
        // 判断是不是登录状态,如果没有登录就将localstorage中的cart对象中的商品总数量传回去
        if (0 === wb.isLogin) {
            // 如果没有登录就将数据存到localstorage中
            (function () {
                var oldCart = $.parseJSON(localStorage.getItem("cart")), totalNum = 0;
                // 如果在localstorage中已经有了cart这个对象
                if (oldCart) {
                    for (var key in oldCart) {
                        if (oldCart[key].quantity) {
                            // 统计购物车中商品的总数量
                            totalNum += oldCart[key].quantity;
                        }
                    }
                    sets.success(totalNum);
                } else {
                    // 如果根本就没有cart这个对象
                    sets.success(0);
                }
            })();

        } else if (1 === wb.isLogin) {
            // 如果是登录状态，就从数据库中查找购物城中商品总数量
            (function () {
                $.ajax({
                    type: "get",
                    url: "api/dmCart.php",
                    dataType: "json",
                    success: function (data) {
                        if (data.info.error === 0) {
                            sets.success(data.data)
                        } else {
                            sets.success(0);
                        }
                    }
                })
            })();
        }
    }
}
// 加入购物车操作
e.cart = function () {
    // 查看当前商品详情页有没有购物车小图标
    // 如果有购物车小图标的话就查询商品总数量
    if ($(".detail_footer .icon-d-goodscart").length) {
        wb.globalCart.getQuantity({
            success: function (totalNum) {
                // 如果商品总数大于0就在购物车小图标右上角显示红色的数字
                if (totalNum > 0) {
                    $(".detail_footer .icon-d-goodscart i").text(totalNum);
                    $(".detail_footer .icon-d-goodscart i").addClass("red")
                } else {
                    $(".detail_footer .icon-d-goodscart i").hide();
                }
            }
        });
    }
    var addToCart = function () {
        var spIndex = $(".choice_content-a_title_bian").attr("data-index");
        var chooseNum = Number($("#count").val());
        var spPrice = Number($(".wbPrice").text());
        var $cartNum = $(".detail_footer .icon-d-goodscart i");
        wb.globalCart.add({
            goodsCode: spIndex,
            quantity: chooseNum,
            salePrice: spPrice,
            success: function (e) {
                1 === wb.isLogin && e ? e.info.error > 0 ? mui.toast(e.info.message || "网络异常", {
                    duration: 1500
                }) : (t.find(".wb_cart").addClass("w_title_rd") && t.find(".wb_cart i").text(o + a),
                    mui.toast("加入购物车成功", {
                        duration: 1e3
                    }),
                    $(".coice_content_cont_num").text(o),
                    i.text(Number(i.eq(0).text()) + o)) : 0 === wb.isLogin && (t.find(".wb_cart").addClass("w_title_rd") && t.find(".wb_cart i").text(o + a),
                        mui.toast("加入购物车成功", {
                            duration: 1e3
                        }),
                        $(".coice_content_cont_num").text(o),
                        i.text(Number(i.eq(0).text()) + o))
            }
        })
    };






    var e = function () {
        var e = $(".choice_content-a_title_bian").attr("data-index")
            , o = Number($("#count").val())
            , a = Number($(".W_title .wb_cart.w_title_rd i").text())//??????????????
            , n = Number($(".wbPrice").text())
            , i = $(".detail_footer .icon-d-goodscart i");
        wb.globalCart.add({
            goodsCode: e,
            quantity: o,
            salePrice: n,
            success: function (e) {
                1 === wb.isLogin && e ? e.info.error > 0 ? mui.toast(e.info.message || "网络异常", {
                    duration: 1500
                }) : (t.find(".wb_cart").addClass("w_title_rd") && t.find(".wb_cart i").text(o + a),
                    mui.toast("加入购物车成功", {
                        duration: 1e3
                    }),
                    $(".coice_content_cont_num").text(o),
                    i.text(Number(i.eq(0).text()) + o)) : 0 === wb.isLogin && (t.find(".wb_cart").addClass("w_title_rd") && t.find(".wb_cart i").text(o + a),
                        mui.toast("加入购物车成功", {
                            duration: 1e3
                        }),
                        $(".coice_content_cont_num").text(o),
                        i.text(Number(i.eq(0).text()) + o))
            }
        })
    };



    $(".js_cart").on("click", function () {
        addToCart();
        $(".tc_container_choice").fadeOut();
        $(".tc_content").removeClass("tc_bottom");
        $("body").css({
            overflow: "auto"
        })
    })


    $(".js_cart").on("click", function () {
        e(),
            $(".tc_container_choice").fadeOut(),
            $(".tc_content").removeClass("tc_bottom"),
            $("body").css({
                overflow: "auto"
            })
    })
}
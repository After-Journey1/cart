(function (global, $) {
    // 模拟用户登录的效果
    // document.cookie = "user=dm";
    var t = ["normal", "editing"], e = t[0];
    var n = 200, s;
    window.cart = {};
    cart.getSelected = function () {
        var t = $("#W-cart").children(".cart-content").children(".shop-blocks").children(".goods").children(".lines")
            , e = [];
        return t.each(function (t, r) {
            var a = $(this);
            if (a.children(".slide-wrap").find(".cart-tik").hasClass("on")) {
                e.push(a);
            }
        }),
            e
    }
    // 单个商品上的删除按钮的功能
    // 传递过来的是商品的id
    cart.goodsDelete = function (goodsCode) {
        function removeDel() {
            cart.scrolls[goodsCode].destroy(),
                cart.scrolls[goodsCode] = null,
                delete cart.scrolls[goodsCode],
                1 === i.children(".goods").children(".lines").length ? i.remove() : a.remove()
        }
        var a = $(".shop-blocks").find(".lines[data-goods-code=" + goodsCode + "]")
            , i = a.parents(".shop-blocks");


        if (0 === yb.isLogin) {
            // 从localstorage中删除数据
            // if (!yb.cart.removeGoodsFromStorage(e))
            //     return !1;
            var allProMsg = cart.getInfoFromStorage() || [];
            delete allProMsg[goodsCode];
            localStorage.cart = JSON.stringify(allProMsg);
            cart.updateStatus();
            removeDel()
        } else if (1 === yb.isLogin) {
            $.ajax({
                type: "get",
                url: "api/dmDelCart.php",
                dataType: "json",
                data: {
                    goodsCode: goodsCode
                },
                // beforeSend: function() {
                //     // mui.toast("loading", {
                //     //     duration: 1e8,
                //     //     type: "div"
                //     // })
                // },
                success: function (data) {
                    // if (t.info.error > 0)
                    //     return mui.wCloseAllToasts(),
                    //     403 === t.info.error ? (location.href = "/member/login?referrer=/cart",
                    //     !1) : (mui.toast(t.info.message || "网络错误", {
                    //         duration: 2e3,
                    //         type: "div"
                    //     }),
                    //     !1);
                    // mui.wCloseAllToasts(),
                    if (!data.error) {
                        removeDel()
                        console.log("删除成功")
                        yb.GnFooter.cartBadgeVal(data.length);
                        cart.updateStatus();
                    }
                    // wb.cart.goods.updateStatus()
                },
                error: function (t) {
                    console.log("sfasdfagfhdftghdfgh")
                }
            })
        }

    }
    // updateStatus是改变中总价钱和结算数量的
    cart.updateStatus = function () {
        var selected = cart.getSelected();
        var nowAll = $(".lines");
        0 == nowAll.length ? cart.emptyTips.show():"";
        if (selected.length <= 0) {
            // cart.emptyTips.show();
            cart.footer.prices({
                goodsAmount: 0,
                payableAmount: 0,
            });
            cart.footer.submitBtn.val(0);
            cart.footer.deleteBtn.grey();

        } else {
            var goodsAmount = 0, payableAmount = 0;
            $.each(selected, function (index, val) {
                goodsAmount += Number($(this).find(".quatity span").text());
                payableAmount += Number($(this).find(".quatity span").text()) * Number($(this).find(".wbiaoPrice").text().replace(",", ""));
            })
            cart.footer.prices({
                goodsAmount: payableAmount,
                payableAmount: payableAmount,
            });
            cart.footer.submitBtn.val(goodsAmount);
            cart.footer.deleteBtn.red()
        }
    }
    cart.setInfoToStorage=function(code,num){
        localStorage["cart"][code]["cnum"]=num;
        console.log(localStorage["cart"]["1"])
    }
    cart.updateQuantity = function (t, e) {
        if (t && t.quantity && isNaN(Number(t.quantity)))
            return !1;
        var r = {
            goodsCode: null,
            cartId: null,
            quantity: null
        }
            , a = $.extend(r, t);
            console.log(a)
        0 === yb.isLogin ? function () {
            var t = cart.setInfoToStorage(a.goodsCode, a.quantity);
            $(".lines[data-goods-code=" + t + "]").find(".bottom").children(".quatity").children("span").text(a.quantity)

                cart.updateStatus()
        }() : 1 === yb.isLogin && function () {
            o.ajax({
                type: "post",
                url: "/api/updateQuantity.php",
                dataType: "json",
                beforeSend: function () {
                    mui.toast("loading", {
                        duration: 1e8,
                        type: "div"
                    })
                },
                data: {
                    cartId: a.cartId,
                    quantity: a.quantity
                },
                success: e,
                error: function (t) { }
            })
        }()
    }
    // 从localstorage中查询购物车信息
    cart.getInfoFromStorage = function (t) {
        if (!t) {
            return $.parseJSON(localStorage.getItem("cart"));
        }
        if (localStorage.getItem("cart")) {
            var localCart = $.parseJSON(localStorage.getItem("cart")), totalNum = 0, allProMsg = [], allId = [];
            if ("quantity" === t) {
                for (var key in localCart) {
                    totalNum += localCart[key].quantity;
                }
                return totalNum;
            } else if ("array" === t) {
                $.each(localCart, function (index, value) {
                    allId.push(index)
                });
                return allId;
            } else if ("number" == typeof t) {
                return localCart[String(t)];
            } else {
                return localCart;
            }
        }

    }
    // 判断有没有登录然后选择从数据库或者是localstorage中查询购物车信息
    cart.goodsGet = function (cb) {
        console.log("dylcg")
        // 暂时不添加到数据库
        // 发ajax将local中的购物车信息添加到数据库中，成功之后展现购物车信息
        function localShowInfo() {
            $.ajax({
                type: "get",
                url: "api/dmCart.php",
                dataType: "json",
                beforeSend: function () {
                    console.log("loading");
                },
                data: {
                    unloginCartList: allProMsg.join()
                },
                success: function (data) {
                    console.log(data);
                    if (!data.error) {
                        $.each(data.list, function (key, val) {
                            console.log(key);
                            $.each(data.list[key], function (key2, val2) {
                                console.log(key2);
                                // 如果只是将localstorage中的商品id传到后台，就手动添加cnum键
                                if (allPrice) {
                                    $.each(allPrice, function (key3, val3) {
                                        if (key2 == key3) {
                                            data.list[key][key2]["cnum"] = allPrice[key3]["cnum"];
                                            console.log(allPrice[key3]["cnum"])
                                        }
                                    })
                                }
                            })
                        })
                    }else{
                        cart.emptyTips.show();
                    }

                    cb(data);
                },
                error: function () { }
            })
        }
        function mergeToKuShowInfo() {
            $.ajax({
                type: "get",
                url: "api/dmMergeToLoginCart.php",
                dataType: "json",
                beforeSend: function () {
                    // console.log("loading");
                },
                data: {
                    unloginCartList: cart.getInfoFromStorage()
                },
                success: function (data) {
                    console.log("成功")
                    localStorage.removeItem("cart"),
                        cb(data);
                },
                error: function (data) {
                    console.log("合并失败")
                }
            })
        }
        var allProMsg = [];
        allProMsg = cart.getInfoFromStorage("array") || [];
        var allPrice = cart.getInfoFromStorage();
        console.log(allProMsg);
        // 如果用户没有登录，而且local的cart中没有商品，就返回false
        if (0 === yb.isLogin && allProMsg.length <= 0) {
            return false;
        }
        // 待完善
        // 如果用户没有登录，但是local的cart中有商品，就发请求加到数据库的一个假的账户中，然后展示信息
        if (0 === yb.isLogin) {
            localShowInfo()
        } else if (1 === yb.isLogin) {
            console.log(allProMsg.length)
            // 如果用户登录了，同时local的cart中有商品，就发请求将local的cart的商品加到此用户的购物车信息中，然后展示信息
            if (allProMsg.length && allProMsg.length > 0) {
                mergeToKuShowInfo()
            } else {
                // 如果用户登录了，但是local的cart中没有商品，就发请求，从数据库调此用户的购物车信息，然后展示信息
                localShowInfo()
            }
        }
    };
    cart.removeDomByGoodsCode = function (code) {
        var e = $(".shop-blocks").find(".lines[data-goods-code=" + code + "]")
            , r = e.parents(".shop-blocks");
        cart.scrolls[code].destroy(),
            cart.scrolls[code] = null,
            delete cart.scrolls[code],
            1 === r.children(".goods").children(".lines").length ? r.remove() : e.remove()
    }
    cart.goodsGetSelected = function () {
        var $allGoods = $("#W-cart").children(".cart-content").children(".shop-blocks").children(".goods").children(".lines");
        var allSelectedGoods = [];
        $allGoods.each(function (index, ele) {
            var self = $(this);
            //遍历所有商品前面的选择框，如果有on
            if (self.children(".slide-wrap").find(".cart-tik").hasClass("on")) {
                var singleGoods = {};
                singleGoods.quantity = Number(self.find("span.quatity").children("span").text()) || 0;
                allSelectedGoods.push($.extend(singleGoods, {
                    goodsCode: Number(self.attr("data-goods-code")),
                    cartId: Number(self.attr("data-cart-id")),
                }))
            }
        })
        return allSelectedGoods;
    };
    cart.goodsBatchDelete = function () {
        console.log(4654645)
        var sel = cart.goodsGetSelected(), idarr = [];

        for (var i in sel) {
            idarr.push(sel[i]["goodsCode"]);
        }

        if (0 === yb.isLogin) {
            // 
        } else {
            $.ajax({
                type: "get",
                url: "./api/batchDelete.php",
                dataType: "json",
                data: {
                    cartIdList: idarr.join()
                },
                beforeSend: function () {

                },
                success: function (data) {
                    if (!data.error) {
                        console.log("批量删除成功333333333");
                        for (var i in sel) {
                            cart.removeDomByGoodsCode(sel[i].goodsCode);
                        }
                        yb.GnFooter.cartBadgeVal(data.length);

                        cart.updateStatus();
                    } else {
                        console.log("dfsfgsdhsdhsdfh")
                    }
                    // var o;
                    // if (mui.wCloseAllToasts(),
                    // 0 === t.info.error) {
                    //     mui.toast("批量删除成功", {
                    //         duration: 1e3,
                    //         type: "div"
                    //     });
                    //     for (o in e)
                    //         wb.cart.goods.removeDomByGoodsCode(e[o].goodsCode);
                    //     wb.cart.goods.updateStatus()
                    // } 
                },
                error: function (t) {
                    console.log("批量删除失败");
                }
            })
        }


    }
        ;
    cart.header = {
        editAllBtn: {
            hide: function () {
                $("#w-editAll").addClass("h")
            },
            show: function () {
                $("#w-editAll").removeClass("h")
            }
        }
        ,
        loginTips: {
            hide: function () {
                $("#W-cart-head").children(".login-tips").addClass("h"),
                    $("#W-cart").removeClass("paddingTop80")
            },
            show: function () {
                $("#W-cart-head").children(".login-tips").removeClass("h"),
                    $("#W-cart").addClass("paddingTop80")
            }
        }
    }
    cart.footer = {
        hide: function () {
            $("#W-cart-footer").children(".footer-bar.footer-bar-normal").addClass("h");
        },
        show: function () {
            $("#W-cart-footer").children(".footer-bar.footer-bar-normal").removeClass("h")
        },
        submitBtn: {
            val: function (t) {
                if ("number" == typeof t) {
                    if (t) {
                        $("#W-cart-footer .submit-btn").text("结算(" + t + ")");
                    } else {
                        $("#W-cart-footer .submit-btn").text("结算");
                    }
                } else {
                    console.log("aaa")
                }
            },
            submit: function () {
                var selectedGoods = cart.goodsGetSelected();
                if (selectedGoods.length === 0) {
                    console.log("请选择商品");
                    return false;
                }
                window.location.href = "dmConfirm.php";
            }
        },
        switchToEditMode: function () {
            $("#W-cart-footer").children(".footer-bar.footer-bar-normal").addClass("h");
            $("#W-cart-footer").children(".footer-bar.footer-bar-editing").removeClass("h");
        },
        switchToNormalMode: function () {
            // if (e === t[0])
            //     return !1;
            // e = t[0],
            $("#W-cart-footer").children(".footer-bar.footer-bar-editing").addClass("h"),
                $("#W-cart-footer").children(".footer-bar.footer-bar-normal").removeClass("h")
        },
        prices: function (t) {
            var e = {
                goodsAmount: null,
                payableAmount: null
            }
                , r = $.extend(e, t)
                , a = $("#W-cart-footer .detail").children("p");
            a.children("#payableAmount").text(r.payableAmount || 0);
            a.children("#goodsAmount").text(r.goodsAmount || 0);
        },
        deleteBtn: {
            red: function () {
                $("#W-cart-footer").find(".edit-btns .delete-btn").addClass("on")
            },
            grey: function () {
                $("#W-cart-footer").find(".edit-btns .delete-btn").removeClass("on")
            }
        },
    };
    cart.emptyTips = {
        show: function () {
            $("#W-cart").children(".empty-status").removeClass("h"),
                cart.header.editAllBtn.hide()
            $("#W-cart-footer").children(".footer-bar").addClass("h");
            $(".rewrite_right").addClass("h");
        },
        hide: function () {
            $("#W-cart").children(".empty-status").addClass("h"),
                cart.header.editAllBtn.show();
            $("#W-cart-footer").children(".footer-bar").addClass("h");
            $(".rewrite_right").removeClass("h");
        }
    };
    cart.editAll = function () {
        $(".shop-blocks").addClass("editing");
        for (var t in cart.scrolls)
            cart.scrolls[t].scrollTo(0, 0, n, IScroll.utils.ease.quadratic);
        setTimeout(function () {
            cart.scrolls[t].enabled = !1
        }, n + 10)
    };
    cart.editAllCancel = function () {
        $(".shop-blocks").removeClass("editing");
        for (var t in cart.scrolls)
            cart.scrolls[t].enabled = !0
    };
    cart.isShopSelectedAll = function (t) {
        var e = $(".shop-blocks[data-shop-code=" + t + "]");
        return e.find(".goods .cart-tik.on").length === e.find(".goods .cart-tik").length
    };
    cart.isSelectedAll = function () {
        return $(".shop-blocks .cart-tik.on").length === $(".shop-blocks .cart-tik").length
    };
    cart.select = {
        all: function () {
            var t = this
                , e = $("#W-cart-footer").find(".cart-tik");
            e.hasClass("on") || e.addClass("on"),
                $(".shop-blocks").each(function (e, r) {
                    var a = $(this);
                    t.shop(a.attr("data-shop-code"))
                })
        },
        shop: function (t) {
            if (!t)
                return !1;
            $(".shop-blocks[data-shop-code=" + t + "]").find(".cart-tik").addClass("on")
        }
    };
    cart.unSelect = {
        all: function () {
            var t = this
                , e = $("#W-cart-footer").find(".cart-tik");
            e.hasClass("on") && e.removeClass("on"),
                $(".shop-blocks").each(function (e, r) {
                    var a = $(this);
                    t.shop(a.attr("data-shop-code"))
                })
        },
        shop: function (t) {
            if (!t)
                return !1;
            $(".shop-blocks[data-shop-code=" + t + "]").find(".cart-tik").removeClass("on")
        },
        shopTitle: function (t) {
            if (!t)
                return !1;
            $(".shop-blocks[data-shop-code=" + t + "]").find(".shop-title .cart-tik").removeClass("on")
        },
        footerTitle: function () {
            $("#W-cart-footer").find(".cart-tik").removeClass("on")
        }
    }
    $(function () {
        function slideScrolls() {
            var proIscroll = {};
            $(".slide-wrap").each(function (index) {
                var goodsCode = $(this).parent(".lines").attr("data-goods-code");
                proIscroll[goodsCode] = new IScroll($(this).get(0), {
                    tap: !0,
                    scrollX: !0,
                    scrollY: !1,
                    mouseWheel: !1,
                    disableTouch: !1,
                    eventPassthrough: !0
                });
                proIscroll[goodsCode].on("scrollEnd", function () {
                    return 0 !== this.x && this.x !== this.maxScrollX && (this.x > this.maxScrollX / 2 ? (this.scrollTo(0, 0, 200, IScroll.utils.ease.quadratic),
                        !1) : void ((this.x <= this.maxScrollX / 2 || this.x > this.maxScrollX) && this.scrollTo(-120, 0, 200, IScroll.utils.ease.quadratic)))
                })
            });
            // 待完善
            $.extend(cart, {
                scrolls: proIscroll
            })
        }
        // 如果用户没有登录就让登录提示显示出来，同时，如果购物车中有东西就显示东西，如果购物车内没有东西就显示购物车位空
        if (0 === yb.isLogin) {
            cart.header.loginTips.show();
            cart.getInfoFromStorage() || cart.emptyTips.show();
        }
        // 得到购物车的数据，将数据用模板渲染上去，然后创建每一个商品的iscroll
        cart.goodsGet(function (data) {
            if (!data.error) {
                var html = ejs.render($("#tpl").html(), { list: data.list });
                $("#W-cart").children(".cart-content").html(html);
            } else {
                cart.emptyTips.show();
            }
            slideScrolls();
            // 改变底部导航中购物车图标右上角的数字
            yb.GnFooter.cartBadgeVal(data.length);
        })


        // 开始绑定各种点击事件

        // 点击单个店铺的全选按钮
        $("#W-cart").on("click", ".shop-title .cart-tik", function () {
            var t = $(this).parents(".shop-blocks").attr("data-shop-code");
            $(this).hasClass("on") ? cart.unSelect.shop(t) : cart.select.shop(t);
            cart.isSelectedAll() ? cart.select.all() : cart.unSelect.footerTitle();
            cart.updateStatus()
        })
            // 点击选中单个商品
            .on("click", ".goods .cart-tik", function () {
                var t = $(this)
                    , e = t.parents(".shop-blocks").attr("data-shop-code");
                t.toggleClass("on"),
                    cart.isShopSelectedAll(e) ? cart.select.shop(e) : cart.unSelect.shopTitle(e);
                cart.isSelectedAll() ? cart.select.all() : cart.unSelect.footerTitle();
                cart.updateStatus()
            })
            // 点击单个商品的右滑的删除以及编辑全部的删除
            .on("click", ".lines .to-delete,.lines .del", function (t) {
                var e = $(this)
                    , pa = e.parents(".lines")
                    , goodsCode = pa.attr("data-goods-code");
                //   , i = pa.attr("data-cart-id")
                cart.goodsDelete(goodsCode)
                cart.updateStatus()
            })
            .on("click", ".editor .calc-btns", function (t) {
                t.stopPropagation(),
                    t.preventDefault();
                var e = $(this)
                    , r = e.siblings(".val")
                    , a = parseInt(r.text())
                    , i = Number(e.parents("[data-goods-code]").attr("data-goods-code"));
                if (e.hasClass("plus")) {
                    ++a;
                    // e.siblings(".val").text(a);
                    // $(this).parents(".lines").find(".quatity span").text(a);
                    // cart.updateStatus()
                }
                else if (e.hasClass("minus")) {
                    if (1 === a)
                        return !1;
                    --a
                    // e.siblings(".val").text(a);
                    // $(this).parents(".lines").find(".quatity span").text(a);
                    // cart.updateStatus()
                }
                // 判断是否登录决定是操作数据库还是localstorage
                cart.updateQuantity({
                    cartId: Number(e.parents("[data-cart-id]").attr("data-cart-id")),
                    quantity: a,
                    goodsCode: i
                }, function (t) {
                    if (mui.wCloseAllToasts(),
                        0 === t.info.error){
                        r.text(a),
                            wb.cart.footer.prices(t.data.prices),
                            $(".lines[data-goods-code=" + t + "]").find(".bottom").children(".quatity").children("span").text(e.quantity)

                            wb.cart.goods.updateStatus();
                        }else {
                        if (403 === t.info.error)
                            return location.href = "/member/login?referrer=/cart",
                                !1;
                        mui.toast(t.info.message || "网络错误", {
                            duration: 1500,
                            type: "div"
                        })
                    }
                });
            });

        $("#w-editAll").on("click", function (t) {
            console.log(cart.goodsGetSelected());

            $(this).addClass("h"),
                $(this).siblings("#w-editFinish").removeClass("h"),
                cart.footer.switchToEditMode(),
                cart.editAll()
        });
        $("#w-editFinish").on("click", function (t) {
            $(this).addClass("h"),
                $(this).siblings("#w-editAll").removeClass("h"),
                cart.footer.switchToNormalMode(),
                cart.editAllCancel()
        })
        $("#W-cart-footer").on("click", ".cart-tik", function () {
            var t, e = $(this);
            e.hasClass("on") ? cart.unSelect.all() : cart.select.all(),
                t = cart.goodsGetSelected().length,
                "number" == typeof t && cart.footer.submitBtn.val(t),
                cart.updateStatus()
        }).on("click", "#batch-delete-btn", function () {
            cart.goodsBatchDelete();
        })


        /*      
              .on("click", "#batch-collect-btn", function() {
                  1 === isLogin ? cart.goods.batchAddToCollect() : mui.confirm("", "登录才能收藏，现在登录？", ["否", "是"], function(t) {
                      1 === t.index && (window.location.href = "/member/login/?referrer=" + location.pathname)
                  })
              }).on("click", ".submit-btn", function() {
                  cart.footer.submitBtn.submit()
              }) */

    })
})(window, jQuery)
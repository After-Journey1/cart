(function (global, $) {
    // 模拟用户登录的效果
    document.cookie = "user=dm";
    var t = ["normal", "editing"], e = t[0];
    var n = 200, s;
    var cart = {};
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
    cart.goodsDelete = function (goodsCode) {
        function r() {
            cart.scrolls[goodsCode].destroy(),
                cart.scrolls[goodsCode] = null,
                delete cart.scrolls[goodsCode],
                1 === i.children(".goods").children(".lines").length ? i.remove() : a.remove()
        }
        var a = $(".shop-blocks").find(".lines[data-goods-code=" + goodsCode + "]")
            , i = a.parents(".shop-blocks");
        r()
    }
    cart.updateStatus = function () {
        var selected = cart.getSelected();

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
    // 从localstorage中查询购物车信息
    cart.getInfoFromStorage = function (t) {
        if (!t) {
            return $.parseJSON(localStorage.getItem("cart"));
        }
        if (localStorage.getItem("cart")) {
            var localCart = $.parseJSON(localStorage.getItem("cart")), totalNum = 0, allProMsg = [];
            if ("quantity" === t) {
                for (var key in localCart) {
                    totalNum += localCart[key].quantity;
                }
                return totalNum;
            } else if ("array" === t) {
                $.each(localCart, function (index, value) {
                    allProMsg.push({
                        goodsCode: index,
                        quantity: value.quantity,
                        salePrice: value.salePrice
                    })
                });
                return allProMsg;
            } else if ("number" == typeof t) {
                return localCart[String(t)];
            } else {
                return null;
            }
        }

    }
    // 判断有没有登录然后选择从数据库或者是localstorage中查询购物车信息
    cart.goodsGet = function (cb) {
        // 发ajax将local中的购物车信息添加到数据库中，成功之后展现购物车信息
        function localAddTokuShowInfo() {
            $.ajax({
                type: "get",
                url: "api/dmCart.php",
                dataType: "json",
                beforeSend: function () {
                    console.log("loading");
                },
                data: {
                    unloginCartList: allProMsg
                },
                success: function (data) {
                    cb(data);
                },
                error: function () { }
            })
        }
        function mergeToKuShowInfo() {
            $.ajax({
                type: "post",
                url: "api/dmMergeToLoginCart.php",
                dataType: "json",
                beforeSend: function () {
                    console.log("loading");
                },
                data: {
                    unloginCartList: allProMsg
                },
                success: function (data) {
                    localStorage.removeItem("cart"),
                        localAddTokuShowInfo()
                },
                error: function (data) { }
            })
        }
        var allProMsg = [];
        allProMsg = cart.getInfoFromStorage("array") || [];
        // 如果用户没有登录，而且local的cart中没有商品，就返回false
        if (0 === yb.isLogin && allProMsg.length <= 0) {
            return false;
        }
        // 如果用户没有登录，但是local的cart中有商品，就发请求加到数据库的一个假的账户中，然后展示信息
        if (0 === yb.isLogin) {
            localAddTokuShowInfo()
        } else if (1 === yb.isLogin) {
            // 如果用户登录了，同时local的cart中有商品，就发请求将local的cart的商品加到此用户的购物车信息中，然后展示信息
            if (allProMsg.length && allProMsg.length > 0) {
                mergeToKuShowInfo()
            } else {
                // 如果用户登录了，但是local的cart中没有商品，就发请求，从数据库调此用户的购物车信息，然后展示信息
                localAddTokuShowInfo()
            }
        }
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
        },
        hide: function () {
            $("#W-cart").children(".empty-status").addClass("h"),
                cart.header.editAllBtn.show()
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
            var shopList=[];
            var goodsList={};
            if (!data.error) {
                $.each(data.list,function(index,value){
                    if(shopList.indexOf(value.dianpu)!=-1){
                        shopList.push(value.dianpu);
                    }
                    goodsList[value.dianpu]=$.extend(true,[],value);
                });
                var html = ejs.render($("#tpl").html(), { list: data.list });
                $("#W-cart").children(".cart-content").html(html);
            } else {
                cart.emptyTips.show();
            }

            // if (data.data.data.cartShopList.length > 0) {
            //     // 如果商店的长度大于0
            //     cart.header.editAllBtn.show();
            //     cart.footer.show();
            // } else {
            //     // 如果商店长度小于等于0就显示购物车为空
            //     cart.emptyTips.show();
            // }
            slideScrolls();
            // dmGnFooter.cartBadgeVal(data.data.length);
        })


        // 开始绑定各种点击事件
        $("#W-cart").on("click", ".shop-title .cart-tik", function () {
            var t = $(this).parents(".shop-blocks").attr("data-shop-code");
            $(this).hasClass("on") ? cart.unSelect.shop(t) : cart.select.shop(t);
            cart.isSelectedAll() ? cart.select.all() : cart.unSelect.footerTitle();
            cart.updateStatus()
        })
            .on("click", ".goods .cart-tik", function () {
                var t = $(this)
                    , e = t.parents(".shop-blocks").attr("data-shop-code");
                t.toggleClass("on"),
                    cart.isShopSelectedAll(e) ? cart.select.shop(e) : cart.unSelect.shopTitle(e);
                cart.isSelectedAll() ? cart.select.all() : cart.unSelect.footerTitle();
                cart.updateStatus()
            })
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
                    e.siblings(".val").text(a);
                    $(this).parents(".lines").find(".quatity span").text(a);
                    cart.updateStatus()
                }
                else if (e.hasClass("minus")) {
                    if (1 === a)
                        return !1;
                    --a
                    e.siblings(".val").text(a);
                    $(this).parents(".lines").find(".quatity span").text(a);
                    cart.updateStatus()
                }
            });


        $("#w-editAll").on("click", function (t) {
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
        })

        /*        .on("click", "#batch-delete-btn", function() {
                    cart.goods.batchDelete()
                }).on("click", "#batch-collect-btn", function() {
                    1 === isLogin ? cart.goods.batchAddToCollect() : mui.confirm("", "登录才能收藏，现在登录？", ["否", "是"], function(t) {
                        1 === t.index && (window.location.href = "/member/login/?referrer=" + location.pathname)
                    })
                }).on("click", ".submit-btn", function() {
                    cart.footer.submitBtn.submit()
                }) */

    })
})(window, jQuery)
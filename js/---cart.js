wb.extend(window.mui, {
    wCloseAllToasts: function() {
        $(".mui-toast-container.mui-active").trigger("click")
    }
}),
Handlebars.registerHelper("WB_GetImagesUrl", function(t, o, e) {
    return /^(http|https)/.test(t) ? t : "//" + o + "/" + t
}),
Handlebars.registerHelper("HBS_equal", function(t, o, e) {
    return t != o ? e.inverse(this) : e.fn(this)
}),
Handlebars.registerHelper("HBS_lessThanOrEqual", function(t, o, e) {
    if ("number" == typeof t && "number" == typeof o)
        return t <= o ? e.fn(this) : e.inverse(this)
}),
Handlebars.registerHelper("HBS_lessThan", function(t, o, e) {
    if ("number" == typeof t && "number" == typeof o)
        return t < o ? e.fn(this) : e.inverse(this)
}),
Handlebars.registerHelper("HBS_largerThan", function(t, o, e) {
    if ("number" == typeof t && "number" == typeof o)
        return t > o ? e.fn(this) : e.inverse(this)
}),
Handlebars.registerHelper("HBS_price", function(t) {
    return t.toString().length > 3 ? t = parseInt(t).toLocaleString() : t
}),
function(t, o) {
    function e() {
        this.editAll = function() {
            o(".shop-blocks").addClass("editing");
            for (var t in wb.cart.scrolls)
                wb.cart.scrolls[t].scrollTo(0, 0, n, IScroll.utils.ease.quadratic);
            setTimeout(function() {
                wb.cart.scrolls[t].enabled = !1
            }, n + 10)
        }
        ,
        this.editAllCancel = function() {
            o(".shop-blocks").removeClass("editing");
            for (var t in wb.cart.scrolls)
                wb.cart.scrolls[t].enabled = !0
        }
        ,
        this.isShopSelectedAll = function(t) {
            var e = o(".shop-blocks[data-shop-code=" + t + "]");
            return e.find(".goods .cart-tik.on").length === e.find(".goods .cart-tik").length
        }
        ,
        this.isSelectedAll = function() {
            return o(".shop-blocks .cart-tik.on").length === o(".shop-blocks .cart-tik").length
        }
        ,
        this.select = {
            all: function() {
                var t = this
                  , e = o("#W-cart-footer").find(".cart-tik");
                e.hasClass("on") || e.addClass("on"),
                o(".shop-blocks").each(function(e, r) {
                    var a = o(this);
                    t.shop(a.attr("data-shop-code"))
                })
            },
            shop: function(t) {
                if (!t)
                    return !1;
                o(".shop-blocks[data-shop-code=" + t + "]").find(".cart-tik").addClass("on")
            }
        },
        this.unSelect = {
            all: function() {
                var t = this
                  , e = o("#W-cart-footer").find(".cart-tik");
                e.hasClass("on") && e.removeClass("on"),
                o(".shop-blocks").each(function(e, r) {
                    var a = o(this);
                    t.shop(a.attr("data-shop-code"))
                })
            },
            shop: function(t) {
                if (!t)
                    return !1;
                o(".shop-blocks[data-shop-code=" + t + "]").find(".cart-tik").removeClass("on")
            },
            shopTitle: function(t) {
                if (!t)
                    return !1;
                o(".shop-blocks[data-shop-code=" + t + "]").find(".shop-title .cart-tik").removeClass("on")
            },
            footerTitle: function() {
                o("#W-cart-footer").find(".cart-tik").removeClass("on")
            }
        }
    }
    function r() {
        this.get = function(t) {
            function e() {
                o.ajax({
                    type: "post",
                    url: "/cart/getGoods",
                    dataType: "json",
                    beforeSend: function() {
                        mui.toast("loading", {
                            duration: 1e8,
                            type: "div"
                        })
                    },
                    data: {
                        unloginCartList: r
                    },
                    success: function(o) {
                        mui.wCloseAllToasts(),
                        t && t(o)
                    },
                    error: function(t) {}
                })
            }
            var r = [];
            if (r = wb.cart.getInfoFromStorage("array"),
            0 === wb.isLogin && r.length <= 0)
                return !1;
            0 === wb.isLogin ? e() : 1 === wb.isLogin && (r.length && r.length > 0 ? o.ajax({
                type: "post",
                url: "/cart/mergeToLoginCart",
                dataType: "json",
                beforeSend: function() {
                    mui.toast("loading", {
                        duration: 1e8,
                        type: "div"
                    })
                },
                data: {
                    unloginCartList: r
                },
                success: function(t) {
                    try {
                        if (403 === t.info.error)
                            return window.location.href = "/member/login/?referrer=" + location.pathname,
                            !1
                    } catch (t) {}
                    localStorage.removeItem("cart"),
                    e()
                },
                error: function(t) {}
            }) : e())
        }
        ,
        this.updateQuantity = function(t, e) {
            if (t && t.quantity && isNaN(Number(t.quantity)))
                return !1;
            var r = {
                goodsCode: null,
                cartId: null,
                quantity: null
            }
              , a = wb.extend(r, t);
            0 === wb.isLogin ? function() {
                var t = wb.cart.setInfoToStorage(a.goodsCode, {
                    quantity: a.quantity,
                    cart: a.cartId
                })
                  , e = [];
                o(t).each(function(t, o) {
                    e.push({
                        goodsCode: t,
                        quantity: o.quantity,
                        salePrice: o.salePrice
                    })
                }),
                wb.cart.goods.updateSubQuantity(a.goodsCode, {
                    quantity: a.quantity
                }),
                wb.cart.goods.updateStatus()
            }() : 1 === wb.isLogin && function() {
                o.ajax({
                    type: "post",
                    url: "/cart/updateQuantity",
                    dataType: "json",
                    beforeSend: function() {
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
                    error: function(t) {}
                })
            }()
        }
        ,
        this.updateStatus = function() {
            function t() {
                var t = e.getInvalidGoods();
                0 === e.getAvailableGoods().length && 0 === t.length && wb.cart.emptyTips.show()
            }
            var e = this
              , r = this.getSelected();
            0 === r.length && (wb.cart.unSelect.all(),
            wb.cart.footer.deleteBtn.grey()),
            r.length > 0 ? (o.ajax({
                type: "POST",
                url: "/cart/getStatus",
                dataType: "json",
                beforeSend: function() {
                    mui.toast("loading", {
                        duration: 1e8,
                        type: "div"
                    })
                },
                data: {
                    calcItemModelList: r
                },
                success: function(o) {
                    mui.wCloseAllToasts();
                    try {
                        if (403 === o.info.error)
                            return location.href = "/member/login?referrer=/cart",
                            !1
                    } catch (t) {}
                    wb.cart.footer.prices(o.data.prices),
                    wb.cart.footer.submitBtn.val(o.data.length),
                    t()
                },
                error: function(t) {}
            }),
            wb.cart.footer.deleteBtn.red()) : (wb.cart.footer.prices({
                goodsAmount: 0,
                payableAmount: 0,
                totalDiscount: 0
            }),
            wb.cart.footer.submitBtn.val(0),
            t())
        }
        ,
        this.delete = function(t, e) {
            function r() {
                wb.cart.scrolls[e].destroy(),
                wb.cart.scrolls[e] = null,
                delete wb.cart.scrolls[e],
                1 === i.children(".goods").children(".lines").length ? i.remove() : a.remove()
            }
            var a = o(".shop-blocks").find(".lines[data-goods-code=" + e + "]")
              , i = a.parents(".shop-blocks");
            if (0 === wb.isLogin) {
                if (!wb.cart.removeGoodsFromStorage(e))
                    return !1;
                r()
            } else
                1 === wb.isLogin && o.ajax({
                    type: "post",
                    url: "/cart/delete",
                    dataType: "json",
                    data: {
                        cartId: t
                    },
                    beforeSend: function() {
                        mui.toast("loading", {
                            duration: 1e8,
                            type: "div"
                        })
                    },
                    success: function(t) {
                        if (t.info.error > 0)
                            return mui.wCloseAllToasts(),
                            403 === t.info.error ? (location.href = "/member/login?referrer=/cart",
                            !1) : (mui.toast(t.info.message || "网络错误", {
                                duration: 2e3,
                                type: "div"
                            }),
                            !1);
                        mui.wCloseAllToasts(),
                        r(),
                        wb.cart.goods.updateStatus()
                    },
                    error: function(t) {}
                })
        }
        ,
        this.addToCollect = function(t, e) {
            if (0 === wb.isLogin)
                return mui.confirm("", "登录才能收藏，现在登录？", ["否", "是"], function(t) {
                    1 === t.index && (window.location.href = "/member/login/?referrer=" + location.pathname)
                }),
                !1;
            o.ajax({
                type: "post",
                url: "/cart/addToCollect",
                dataType: "json",
                data: {
                    cartId: t
                },
                beforeSend: function() {
                    mui.toast("loading", {
                        duration: 1e8,
                        type: "div"
                    })
                },
                success: function(t) {
                    mui.wCloseAllToasts(),
                    0 === t.info.error ? (mui.toast("收藏成功", {
                        duration: 1e3,
                        type: "div"
                    }),
                    wb.cart.goods.removeDomByGoodsCode(e),
                    wb.cart.goods.updateStatus()) : 403 === t.info.error && mui.confirm("", "登录才能收藏，现在登录？", ["否", "是"], function(t) {
                        1 === t.index && (window.location.href = "/member/login/?referrer=" + location.pathname)
                    })
                },
                error: function(t) {}
            })
        }
        ,
        this.getSelected = function() {
            var t = o("#W-cart").children(".cart-content").children(".shop-blocks").children(".goods").children(".lines")
              , e = [];
            return t.each(function(t, r) {
                var a = o(this);
                if (a.children(".slide-wrap").find(".cart-tik").hasClass("on")) {
                    var i = {};
                    a.children(".activity").length > 0 ? i.activityCode = Number(a.children(".activity").attr("data-activity-code")) : i.activityCode = 0,
                    i.quantity = Number(a.find("span.quatity").children("span").text()) || 0,
                    e.push(o.extend(i, {
                        goodsCode: Number(a.attr("data-goods-code")),
                        cartId: Number(a.attr("data-cart-id")),
                        isPresell: "2" === a.find(".inner .desc .presellBadge[data-sale-type]").attr("data-sale-type")
                    }))
                }
            }),
            e
        }
        ,
        this.getAvailableGoods = function() {
            var t = o("#W-cart").children(".cart-content").children(".shop-blocks").children(".goods").children(".lines")
              , e = [];
            return t.each(function(t, r) {
                var a = o(this);
                e.push({
                    goodsCode: Number(a.attr("data-goods-code")),
                    cartId: Number(a.attr("data-cart-id")),
                    goodsName: o.trim(a.find(".desc .words").text()),
                    wbiaoPrice: Number(a.find(".price .wbiaoPrice").text().replace(/,/gi, "")),
                    quantity: Number(a.find(".bottom .quatity").children("span").text())
                })
            }),
            e
        }
        ,
        this.getInvalidGoods = function() {
            var t = o("#invalidGoods").children(".lines")
              , e = [];
            return t.each(function(t, r) {
                var a = o(this);
                e.push({
                    goodsCode: Number(a.attr("data-goods-code")),
                    cartId: Number(a.attr("data-cart-id"))
                })
            }),
            e
        }
        ,
        this.getGoodsByShopCode = function(t) {
            if (!t || isNaN(Number(t)))
                return !1;
            var e = o(".shop-blocks[data-shop-code=" + t + "]").children(".goods").children(".lines")
              , r = [];
            return e.each(function(t, e) {
                var a = o(this);
                r.push({
                    goodsCode: Number(a.attr("data-goods-code")),
                    cartId: Number(a.attr("data-cart-id"))
                })
            }),
            r
        }
        ,
        this.batchDelete = function() {
            var t, e = this.getSelected(), r = [];
            for (t in e)
                r.push(e[t].cartId);
            if (0 === r.length)
                return !1;
            0 === wb.isLogin ? function() {
                var t;
                for (t in e)
                    wb.cart.goods.removeDomByGoodsCode(e[t].goodsCode),
                    wb.cart.removeGoodsFromStorage(e[t].goodsCode)
            }() : 1 === wb.isLogin && function() {
                o.ajax({
                    type: "post",
                    url: "/cart/batchDelete",
                    dataType: "json",
                    data: {
                        cartIdList: r
                    },
                    beforeSend: function() {
                        mui.toast("loading", {
                            duration: 1e8,
                            type: "div"
                        })
                    },
                    success: function(t) {
                        var o;
                        if (mui.wCloseAllToasts(),
                        0 === t.info.error) {
                            mui.toast("批量删除成功", {
                                duration: 1e3,
                                type: "div"
                            });
                            for (o in e)
                                wb.cart.goods.removeDomByGoodsCode(e[o].goodsCode);
                            wb.cart.goods.updateStatus()
                        } else
                            403 === t.info.error && mui.toast("请先登录", {
                                duration: 1e3,
                                type: "div"
                            })
                    },
                    error: function(t) {}
                })
            }()
        }
        ,
        this.batchAddToCollect = function() {
            var t, e = this.getSelected(), r = [];
            for (t in e)
                r.push(e[t].cartId);
            if (0 === r.length)
                return !1;
            o.ajax({
                type: "post",
                url: "/cart/batchAddToCollect",
                dataType: "json",
                data: {
                    cartIdList: r
                },
                beforeSend: function() {
                    mui.toast("loading", {
                        duration: 1e8,
                        type: "div"
                    })
                },
                success: function(o) {
                    if (mui.wCloseAllToasts(),
                    0 === o.info.error) {
                        mui.toast("收藏成功", {
                            duration: 1e3,
                            type: "div"
                        });
                        for (t in e)
                            wb.cart.goods.removeDomByGoodsCode(e[t].goodsCode)
                    } else
                        403 === o.info.error && mui.confirm("", "登录才能收藏，现在登录？", ["否", "是"], function(t) {
                            1 === t.index && (window.location.href = "/member/login/?referrer=" + location.pathname)
                        })
                },
                error: function(t) {}
            })
        }
        ,
        this.batchDeleteInvalidGoods = function() {
            var t, e = this.getInvalidGoods(), r = [];
            for (t in e)
                r.push(e[t].cartId);
            if (0 === r.length)
                return !1;
            0 === wb.isLogin ? function() {
                var t;
                for (t in e)
                    wb.cart.removeGoodsFromStorage(e[t].goodsCode)
            }() : 1 === wb.isLogin && function() {
                o.ajax({
                    type: "post",
                    url: "/cart/batchDelete",
                    dataType: "json",
                    data: {
                        cartIdList: r
                    },
                    beforeSend: function() {
                        mui.toast("loading", {
                            duration: 1e8,
                            type: "div"
                        })
                    },
                    success: function(t) {
                        mui.wCloseAllToasts(),
                        0 === t.info.error ? (mui.toast("清空失效商品成功", {
                            duration: 1e3,
                            type: "div"
                        }),
                        o("#invalidGoods").remove()) : 403 === t.info.error ? mui.toast("请先登录", {
                            duration: 1e3,
                            type: "div"
                        }) : mui.toast(t.info.message || "网络错误", {
                            duration: 1e3,
                            type: "div"
                        })
                    },
                    error: function(t) {}
                })
            }()
        }
        ,
        this.removeDomByGoodsCode = function(t) {
            var e = o(".shop-blocks").find(".lines[data-goods-code=" + t + "]")
              , r = e.parents(".shop-blocks");
            wb.cart.scrolls[t].destroy(),
            wb.cart.scrolls[t] = null,
            delete wb.cart.scrolls[t],
            1 === r.children(".goods").children(".lines").length ? r.remove() : e.remove()
        }
        ,
        this.updateSubQuantity = function(t, e) {
            o(".lines[data-goods-code=" + t + "]").find(".bottom").children(".quatity").children("span").text(e.quantity)
        }
    }
    function a() {
        var t = ["normal", "editing"]
          , e = t[0];
        this.hide = function() {
            o("#W-cart-footer").children(".footer-bar.footer-bar-normal").addClass("h")
        }
        ,
        this.show = function() {
            o("#W-cart-footer").children(".footer-bar.footer-bar-normal").removeClass("h")
        }
        ,
        this.submitBtn = {
            val: function(t) {
                return "number" == typeof t && (t ? void o("#W-cart-footer .submit-btn").text("结算(" + t + ")") : (o("#W-cart-footer .submit-btn").text("结算"),
                t))
            },
            submit: function() {
                var t, e = wb.cart.goods.getSelected(), r = !1;
                if (0 === e.length)
                    return mui.toast("请选择商品", {
                        duration: 1500
                    }),
                    !1;
                if (e.length > 1) {
                    for (t in e)
                        if (e[t].isPresell) {
                            r = !0;
                            break
                        }
                    if (r)
                        return mui.toast("商品中包含预售商品，请把预售商品单独提交结算！", {
                            duration: 2e3
                        }),
                        !1
                }
                o.cookie("order_confirm", JSON.stringify(e), {
                    expires: 86400,
                    path: "/"
                }),
                window.location.href = "/order/confirm"
            }
        },
        this.deleteBtn = {
            red: function() {
                o("#W-cart-footer").find(".edit-btns .delete-btn").addClass("on")
            },
            grey: function() {
                o("#W-cart-footer").find(".edit-btns .delete-btn").removeClass("on")
            }
        },
        this.prices = function(t) {
            var e = {
                goodsAmount: null,
                totalDiscount: null,
                payableAmount: null
            }
              , r = o.extend(e, t)
              , a = o("#W-cart-footer .detail").children("p");
            a.children("#payableAmount").text(r.payableAmount || 0),
            a.children("#goodsAmount").text(r.goodsAmount || 0),
            r.totalDiscount ? a.find("#totalDiscount").text(r.totalDiscount).parent("span").removeClass("h") : a.find("#totalDiscount").parent("span").addClass("h")
        }
        ,
        this.switchToEditMode = function() {
            return e !== t[1] && (e = t[1],
            o("#W-cart-footer").children(".footer-bar.footer-bar-normal").addClass("h"),
            o("#W-cart-footer").children(".footer-bar.footer-bar-editing").removeClass("h"),
            !0)
        }
        ,
        this.switchToNormalMode = function() {
            if (e === t[0])
                return !1;
            e = t[0],
            o("#W-cart-footer").children(".footer-bar.footer-bar-editing").addClass("h"),
            o("#W-cart-footer").children(".footer-bar.footer-bar-normal").removeClass("h")
        }
    }
    function i() {
        this.editAllBtn = {
            hide: function() {
                o("#w-editAll").addClass("h")
            },
            show: function() {
                o("#w-editAll").removeClass("h")
            }
        },
        this.loginTips = {
            hide: function() {
                o("#W-cart-head").children(".login-tips").addClass("h"),
                o("#W-cart").removeClass("paddingTop80")
            },
            show: function() {
                o("#W-cart-head").children(".login-tips").removeClass("h"),
                o("#W-cart").addClass("paddingTop80")
            }
        }
    }
    var n = 200
      , s = {
        data: null,
        getActivitiesByGoodsCode: function(t) {
            if (!this.data || !t)
                return !1;
            var e, r, a = {
                list: []
            }, i = this.data.cartShopList;
            for (e in i) {
                if (a.list.length > 0)
                    break;
                for (r in i[e].cartGoodsList)
                    if (Number(t) === i[e].cartGoodsList[r].goodsCode) {
                        o.extend(a, {
                            selectedActivityCode: i[e].cartGoodsList[r].activityCode,
                            selectedActivityName: i[e].cartGoodsList[r].activityName,
                            selectedActivityTypeName: i[e].cartGoodsList[r].selectedActivityTypeName,
                            list: i[e].cartGoodsList[r].activityList
                        });
                        break
                    }
            }
            return a
        }
    };
    o(function() {
        function t() {
            var t = {};
            o(".slide-wrap").each(function(e) {
                var r = o(this).parent(".lines").attr("data-goods-code");
                t[r] = new IScroll(o(this).get(0),{
                    tap: !0,
                    scrollX: !0,
                    scrollY: !1,
                    mouseWheel: !1,
                    disableTouch: !1,
                    eventPassthrough: !0
                }),
                t[r].on("scrollEnd", function() {
                    return 0 !== this.x && this.x !== this.maxScrollX && (this.x > this.maxScrollX / 2 ? (this.scrollTo(0, 0, 200, IScroll.utils.ease.quadratic),
                    !1) : void ((this.x <= this.maxScrollX / 2 || this.x > this.maxScrollX) && this.scrollTo(-120, 0, 200, IScroll.utils.ease.quadratic)))
                })
            }),
            wb.extend(wb.cart, {
                scrolls: t
            })
        }
        wb.extend(wb, {
            cart: {
                getInfoFromStorage: function(t) {
                    if (!t)
                        return o.parseJSON(localStorage.getItem("cart"));
                    var e, r = 0, a = o.parseJSON(localStorage.getItem("cart")), i = [];
                    if ("quantity" === t) {
                        for (e in a)
                            r += a[e].quantity;
                        return r
                    }
                    return "array" === t ? (o.each(a, function(t, o) {
                        i.push({
                            goodsCode: t,
                            quantity: o.quantity,
                            salePrice: o.salePrice
                        })
                    }),
                    i) : "number" == typeof t ? a[String(t)] : null
                },
                setInfoToStorage: function(t, e) {
                    var r = this.getInfoFromStorage();
                    return r[String(t)] ? (o.extend(r[String(t)], e || {}),
                    localStorage.setItem("cart", JSON.stringify(r)),
                    this.getInfoFromStorage()) : (r[String(t)] = e || {},
                    this.getInfoFromStorage())
                },
                removeGoodsFromStorage: function(t) {
                    var o = this.getInfoFromStorage();
                    return !!o[String(t)] && (delete o[String(t)],
                    localStorage.setItem("cart", JSON.stringify(o)),
                    !0)
                },
                getCouponByShopCode: function(t, e) {
                    if (!t || isNaN(Number(t)))
                        return !1;
                    var r, a = wb.cart.goods.getGoodsByShopCode(t), i = [];
                    if (a.length > 0)
                        for (r in a)
                            i.push(a[r].goodsCode);
                    o.ajax({
                        type: "POST",
                        url: "/cart/getMutiGoodsCouponList",
                        dataType: "json",
                        data: {
                            goodsCodes: i,
                            siteRange: 3
                        },
                        beforeSend: function() {
                            mui.toast("loading", {
                                duration: 1e8,
                                type: "div"
                            })
                        },
                        success: function(t) {
                            e && e(t)
                        },
                        error: function(t) {}
                    })
                },
                emptyTips: {
                    show: function() {
                        o("#W-cart").children(".empty-status").removeClass("h"),
                        wb.cart.header.editAllBtn.hide()
                    },
                    hide: function() {
                        o("#W-cart").children(".empty-status").addClass("h"),
                        wb.cart.header.editAllBtn.show()
                    }
                }
            },
            errorTips: function(t, e) {
                var r = {
                    403: null
                }
                  , a = o.extend(r, e);
                return 403 === t.info.error ? a[403] ? (a[403](),
                !1) : (window.location.href = "/member/login?referrer=" + location.pathname + location.search,
                !1) : 400 === t.info.error ? (mui.toast(t.info.message || "网络错误", {
                    duration: 2e3
                }),
                !1) : 500 === t.info.error ? (mui.toast("服务异常，请稍后再试", {
                    duration: 2e3
                }),
                !1) : 404 === t.info.error ? (mui.toast("网络异常，请稍后再试", {
                    duration: 2e3
                }),
                !1) : void 0
            }
        }),
        wb.extend(wb.cart, new e, {
            goods: new r,
            footer: new a,
            header: new i
        }),
        wb.extend(wb, {
            gnFooter: new wb.GnFooter
        }),
        0 === wb.isLogin && wb.cart.header.loginTips.show(),
        0 !== wb.isLogin || wb.cart.getInfoFromStorage() || wb.cart.emptyTips.show(),
        wb.cart.goods.get(function(e) {
            if (e.info.error > 0)
                return !1;
            if (!e.data.data)
                return mui.wCloseAllToasts(),
                mui.toast("网络错误，请稍后再试"),
                !1;
            var r = o("#cart-goods-temp").html().replace(/<%/g, "{{").replace(/%>/g, "}}")
              , a = Handlebars.compile(r);
            wb.extend(s, {
                data: e.data.data
            }),
            o("#W-cart").children(".cart-content").html(a(e.data)),
            e.data.data.cartShopList.length > 0 && (wb.cart.header.editAllBtn.show(),
            wb.cart.footer.show()),
            0 === e.data.length && 0 === e.data.data.invalidGoodsList.length && wb.cart.emptyTips.show(),
            t(),
            wb.gnFooter.cartBadgeVal(e.data.length),
            function(t, o) {
                var e, r = window.wb.cart.goods.getAvailableGoods(), a = [];
                for (e in r)
                    a.push({
                        id: r[e].goodsCode,
                        vendorId: "",
                        name: r[e].goodsName,
                        price: r[e].wbiaoPrice,
                        quantity: r[e].quantity
                    });
                t[o] = "function" == typeof t[o] ? t[o] : function() {
                    (t[o].c = t[o].c || []).push(arguments)
                }
                ,
                _qha("send", {
                    et: 32,
                    goods: a
                })
            }(window, "_qha")
        }),
        o("#W-popUpPanel-coupon").on("click", ".wb_back", function() {
            mui("#W-popUpPanel-coupon").popover("hide")
        }).on("click", ".coupons-inner", function() {
            var t = Number(o(this).attr("data-coupon-code"));
            0 === wb.isLogin ? window.location.href = "/member/login?referrer=" + location.pathname + location.search : 1 === wb.isLogin && o.ajax({
                type: "POST",
                url: "/goods/front/receive",
                dataType: "json",
                data: {
                    couponCode: t,
                    siteRange: 3
                },
                beforeSend: function() {
                    mui.toast("loading", {
                        duration: 1e8,
                        type: "div"
                    })
                },
                success: function(e) {
                    mui.wCloseAllToasts();
                    var r = o("#W-popUpPanel-coupon").find("[data-coupon-code=" + t + "]");
                    return r.hasClass("grey") ? (mui.toast("你已领取，请到个人中心-我的优惠券查看", {
                        duration: 1500,
                        type: "div"
                    }),
                    !1) : e.info.error > 0 ? 403 === e.info.error ? (window.location.href = "/member/login?referrer=" + location.href,
                    !1) : (mui.toast(e.info.error || "网络错误", {
                        duration: 1500,
                        type: "div"
                    }),
                    !1) : (mui.toast("领取成功", {
                        duration: 1500,
                        type: "div"
                    }),
                    r.removeClass("brown").addClass("grey"),
                    void r.find(".gotedStatus").text("已经领取"))
                },
                error: function(t) {}
            })
        }),
        o("#W-panel-off").on("click", ".wb_back", function() {
            mui("#W-panel-off").popover("hide")
        }),
        o("#W-cart").on("click", ".shop-blocks .shop-title .tips-r", function() {
            var t = o(this).parents(".shop-blocks[data-shop-code]").attr("data-shop-code");
            wb.cart.getCouponByShopCode(Number(t), function(t) {
                if (mui.wCloseAllToasts(),
                t.info.error > 0)
                    return 403 === t.info.error && mui.confirm("", "登录才能，现在登录？", ["否", "是"], function(t) {
                        1 === t.index && (window.location.href = "/member/login/?referrer=" + location.pathname)
                    }),
                    500 === t.info.error && mui.toast("服务异常，请稍后再试", {
                        duration: 1500,
                        type: "div"
                    }),
                    404 === t.info.error && mui.toast("网络异常，请稍后再试", {
                        duration: 1500,
                        type: "div"
                    }),
                    400 === t.info.error && mui.toast(t.info.message || "网络异常，请稍后再试", {
                        duration: 1500,
                        type: "div"
                    }),
                    !1;
                if (0 === t.data.length)
                    return mui.toast("该店铺无可用券", {
                        duration: 1500,
                        type: "div"
                    }),
                    !1;
                var e = o("#coupons-template").html().replace(/<%/g, "{{").replace(/%>/g, "}}")
                  , r = Handlebars.compile(e);
                0 === t.info.error && o("#W-popUpPanel-coupon").find(".coupons").html(r(t)),
                mui("#W-popUpPanel-coupon").popover("show"),
                window.setTimeout(function() {
                    document.querySelector("#W-popUpPanel-coupon").removeEventListener(mui.EVENT_MOVE, mui.preventDefault)
                }, 500)
            })
        }).on("click", ".activity .act-more-btn", function() {
            var t = o(this).parents(".lines").attr("data-goods-code")
              , e = s.getActivitiesByGoodsCode(Number(t));
            o(e.list).each(function(t, e) {
                var r = o("#W-panel-off").find(".content")
                  , a = r.children(".lines.h").clone();
                a.children("p").text(e.activityName),
                a.attr("data-act-code", e.activityCode),
                r.append(a.removeClass("h")),
                r.children(".lines.h").remove(),
                r.children(".lines").eq(0).addClass("on")
            }),
            mui("#W-panel-off").popover("show")
        }).on("click", ".goods-tips .more-btn", function() {
            mui("#W-panel-off").popover("show")
        }).on("click", ".shop-title .cart-tik", function() {
            var t = o(this).parents(".shop-blocks").attr("data-shop-code");
            o(this).hasClass("on") ? wb.cart.unSelect.shop(t) : wb.cart.select.shop(t),
            wb.cart.isSelectedAll() ? wb.cart.select.all() : wb.cart.unSelect.footerTitle(),
            wb.cart.goods.updateStatus()
        }).on("click", ".goods .cart-tik", function() {
            var t = o(this)
              , e = t.parents(".shop-blocks").attr("data-shop-code");
            t.toggleClass("on"),
            wb.cart.isShopSelectedAll(e) ? wb.cart.select.shop(e) : wb.cart.unSelect.shopTitle(e),
            wb.cart.isSelectedAll() ? wb.cart.select.all() : wb.cart.unSelect.footerTitle(),
            wb.cart.goods.updateStatus()
        }).on("click", ".lines .to-delete,.lines .del", function(t) {
            var e = o(this)
              , r = e.parents(".lines")
              , a = r.attr("data-goods-code")
              , i = r.attr("data-cart-id");
            wb.cart.goods.delete(i, a)
        }).on("click", ".lines .to-collection", function(t) {
            var e = o(this)
              , r = e.parents(".lines")
              , a = r.attr("data-goods-code")
              , i = r.attr("data-cart-id");
            wb.cart.goods.addToCollect(i, a)
        }).on("click", ".editor .calc-btns", function(t) {
            t.stopPropagation(),
            t.preventDefault();
            var e = o(this)
              , r = e.siblings(".val")
              , a = parseInt(r.text())
              , i = Number(e.parents("[data-goods-code]").attr("data-goods-code"));
            if (e.hasClass("plus"))
                ++a;
            else if (e.hasClass("minus")) {
                if (1 === a)
                    return !1;
                --a
            }
            wb.cart.goods.updateQuantity({
                cartId: Number(e.parents("[data-cart-id]").attr("data-cart-id")),
                quantity: a,
                goodsCode: i
            }, function(t) {
                if (mui.wCloseAllToasts(),
                0 === t.info.error)
                    r.text(a),
                    wb.cart.footer.prices(t.data.prices),
                    wb.cart.goods.updateSubQuantity(i, {
                        quantity: a
                    }),
                    wb.cart.goods.updateStatus();
                else {
                    if (403 === t.info.error)
                        return location.href = "/member/login?referrer=/cart",
                        !1;
                    mui.toast(t.info.message || "网络错误", {
                        duration: 1500,
                        type: "div"
                    })
                }
            })
        }).on("click", "#clearInvalidGoodsBtn", function() {
            wb.cart.goods.batchDeleteInvalidGoods()
        }),
        o("#W-panel-off").on("click", ".content .lines", function() {
            var t = o(this);
            t.siblings().removeClass("on"),
            t.addClass("on")
        }),
        o("#w-editAll").on("click", function(t) {
            o(this).addClass("h"),
            o(this).siblings("#w-editFinish").removeClass("h"),
            wb.cart.footer.switchToEditMode(),
            wb.cart.editAll()
        }),
        o("#w-editFinish").on("click", function(t) {
            o(this).addClass("h"),
            o(this).siblings("#w-editAll").removeClass("h"),
            wb.cart.footer.switchToNormalMode(),
            wb.cart.editAllCancel()
        }),
        o("#W-cart-footer").on("click", ".cart-tik", function() {
            var t, e = o(this);
            e.hasClass("on") ? wb.cart.unSelect.all() : wb.cart.select.all(),
            t = wb.cart.goods.getSelected().length,
            "number" == typeof t && wb.cart.footer.submitBtn.val(t),
            wb.cart.goods.updateStatus()
        }).on("click", "#batch-delete-btn", function() {
            wb.cart.goods.batchDelete()
        }).on("click", "#batch-collect-btn", function() {
            1 === wb.isLogin ? wb.cart.goods.batchAddToCollect() : mui.confirm("", "登录才能收藏，现在登录？", ["否", "是"], function(t) {
                1 === t.index && (window.location.href = "/member/login/?referrer=" + location.pathname)
            })
        }).on("click", ".submit-btn", function() {
            wb.cart.footer.submitBtn.submit()
        }),
        o.cookie("order_confirm") && o.removeCookie("order_confirm", {
            path: "/"
        }),
        o.cookie("order_group") && o.removeCookie("order_group", {
            path: "/"
        }),
        o.cookie("isUseCoupon") && o.removeCookie("isUseCoupon", {
            path: "/"
        }),
        o.cookie("invoice_info") && o.removeCookie("invoice_info", {
            path: "/order"
        })
    })
}(window, jQuery);


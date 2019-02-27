!function() {
    !function() {
        var e, t, o, a = [/\/shoubiao(?:-o([1234]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html$/, /\/(?:([a-z\-]+)\-watches\/?)?(?:list(?:-(?=\d))(\d+(?:-\d+)*)(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html)?$/, /\/([a-z\-]+)\-watches\/?index(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html$/, /\/([a-z\-]+)\-watches\/?list(?:(?:-(?=\d))(\d+(?:-\d+)*))?-s(\d+)(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html$/, /\/peijian\/biaodai\/index(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html$/, /\/(peijian\/biaodai\/?)?(?:list(?:-(?=\d))(\d+(?:-\d+)*)(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html)?$/, /\/(?:([a-z\-]+)\-biaodai\/?)?(?:list(?:-(?=\d))?(\d+(?:-\d+)*)?(?:-s(\d+))?(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html)?$/, /\/([a-z\-]+)\-biaodai\/?index(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html$/, /\/card(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html$/, /\/(card\/?)?(?:list(?:-(?=\d))(\d+(?:-\d+)*)(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html)?$/, /\/(?:([a-z\-]+)\-card\/?)?(?:list(?:-(?=\d))?(\d+(?:-\d+)*)?(?:-s(\d+))?(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html)?$/, /\/([a-z\-]+)\-card\/?index(?:-o([123]))?(?:-b(1))?(?:-p([2-9]|[1-9]\d+))?\.html$/], n = 0, i = a.length, r = !1;
        try {
            for (e = document.referrer.split("?")[0]; n < i; n++)
                if (a[n].test(e)) {
                    r = !0;
                    break
                }
            t = location.pathname.match(/^\/goods\/([\d]+)/),
            o = t ? t[1] : ""
        } catch (e) {}
        r ? window.localStorage && wb.trackRecm({
            bhv_type: "search_click",
            act_obj: o,
            content: decodeURIComponent(window.localStorage.getItem("recmDataFromSearch"))
        }) : (wb.trackRecm({
            bhv_type: "click",
            act_obj: o
        }),
        window.localStorage && window.localStorage.removeItem("recmDataFromSearch"))
    }();
    var e = {}
      , t = $(".W_title")
      , o = new Swiper(".swiper-container-content",{
        paginationClickable: !0,
        observer: !0,
        observeParents: !0,
        autoHeight: !0,
        noSwiping: !0,
        noSwipingClass: "stop-swiping",
        onSlideChangeEnd: function(a) {
            $("html,body").scrollTop(0);
            var n = o.activeIndex;
            t.find(".wb_goods_tab li").eq(n).children("a").addClass("on").parents().siblings().children("a").removeClass("on"),
            2 == a.activeIndex && e.evaluateImg()
        }
    });
    e.evaluateImg = function() {
        $(".load-evaluate").find("li").children("img").each(function() {
            var e = $(this)
              , t = e.attr("evaluate-img");
            e.attr("src", t),
            e.removeAttr("evaluate-img")
        })
    }
    ,
    e.title = function() {
        t.find(".wb_goods_tab li").on("click", function() {
            $("html,body").scrollTop(0),
            o.slideTo($(this).index(), 1e3, !1),
            $(this).children("a").addClass("on").parents().siblings().children("a").removeClass("on"),
            2 == $(this).index() && e.evaluateImg()
        }),
        t.find(".wb_more").on("click", function() {
            $(".ol_show").slideToggle()
        }),
        $(window).scroll(function() {
            $(window).scrollTop() >= 50 && $(".ol_show").hide()
        })
    }
    ,
    e.carousel = function() {
        new Swiper(".swiper-container-carousel",{
            paginationClickable: !0,
            pagination: ".swiper-pagination-carousel",
            autoplayDisableOnInteraction: !1,
            observer: !0,
            observeParents: !0,
            lazyLoading: !0,
            lazyLoadingOnTransitionStart: !0
        })
    }
    ,
    e.carouselClick = function() {
        $(".pr_carousel .swiper-slide").on("click", function() {
            $(".load-carousel").find(".swiper-slide").children("img").each(function() {
                var e = $(this)
                  , t = e.attr("banner-img");
                e.attr("src", t),
                e.removeAttr("banner-img")
            }),
            e.carouselMax().slideTo($(this).index() + 1, 1e3, !1),
            $(".carousel_popup").show(),
            $("body").css({
                overflow: "hidden"
            })
        }),
        $(".carousel_popup").on("click", function() {
            $(this).hide(),
            $("body").css({
                overflow: "auto"
            })
        })
    }
    ,
    e.carouselMax = function() {
        return new Swiper(".swiper-container_carouselMax",{
            pagination: ".carousel_popup_num",
            paginationType: "fraction",
            loop: !0,
            observer: !0,
            observeParents: !0
        })
    }
    ,
    e._mainHeight = function() {
        var e = $(".W_goods_detail_title").height();
        $(".W_detail").css("margin-top", e)
    }
    ,
    e.eject = function(e, t, o) {
        $(e).on("click", function() {
            $(o).fadeIn(),
            $(".tc_content").addClass("tc_bottom"),
            $("body").css({
                overflow: "hidden"
            })
        }),
        $(t).on("click", function() {
            $(o).fadeOut(),
            $(".tc_content").removeClass("tc_bottom"),
            $("body").css({
                overflow: "auto"
            })
        })
    }
    ,
    e.eject(".coupons_stages", ".tc_button_b,.tc_bg", ".tc_container_fq"),
    e.eject(".coupons_voucher", ".tc_button_b,.tc_bg", ".tc_container_juan"),
    e.eject(".coupons_promotion", ".tc_button_b,.tc_bg", ".tc_container_cx"),
    e.eject(".flaw", ".tc_button_b,.tc_bg", ".tc_container_xc"),
    e.eject(".ys_content", ".tc_button_b,.tc_bg", ".tc_container_ys"),
    e.eject(".pr_coice", ".choice_content-a_ico,.tc_bg", ".tc_container_choice"),
    e.eject(".js_share", ".fx_button,.tc_bg", ".tc_container_fx"),
    e.eject(".combination_ico", ".js_combination,.tc_bg", ".tc_container_zh"),
    e.eject(".W_combination .more", ".purchase_title,.icon-a-close03,.tc_bg", ".tc_container_rq"),
    e.eject("#brand", ".tc_container_brand .button,.tc_container_brand .brandPopup .title i,.tc_bg", ".tc_container_brand"),
    e.eject(".rareClick", ".tc_container_rare .tc_bg,.tc_container_rare .tc_button_b", ".tc_container_rare"),
    e.time = function() {
        function e() {
            var e = $(".pr_activity")
              , t = new Date
              , o = e.attr("data-endDate").replace(/\-/g, "/")
              , a = new Date(o).getTime() - t.getTime()
              , n = 0
              , i = 0
              , r = 0
              , c = 0;
            a >= 0 && (n = Math.floor(a / 1e3 / 60 / 60 / 24),
            i = Math.floor(a / 1e3 / 60 / 60 % 24),
            r = Math.floor(a / 1e3 / 60 % 60),
            c = Math.floor(a / 1e3 % 60));
            var s = function(e, t) {
                e < 10 ? $(t).html("0" + e) : $(t).html(e)
            };
            s(n, ".t_d"),
            s(i, ".t_h"),
            s(r, ".t_m"),
            s(c, ".t_s")
        }
        "true" == $(".activityId").attr("data-value") && setInterval(e, 1e3)
    }
    ,
    e.choice = function() {
        var e, t = $("#count"), o = Number(t.attr("data-realCount")) + Number(t.attr("data-virtualCount"));
        $(".choice_content_b_num_b").find("span").on("click", function() {
            var a = $(this);
            if (e = Math.floor(t.val()),
            "add" == a.attr("data-type")) {
                if (5 === Number(a.attr("data-saleType")))
                    return mui.toast("不能选择数量", {
                        duration: 1e3
                    }),
                    !1;
                e >= o ? (mui.toast("库存不足", {
                    duration: 1e3
                }),
                t.val(o)) : (t.val(++e),
                a.siblings("span").removeClass("boder_colour"))
            } else
                e > 1 && (2 == e && a.addClass("boder_colour"),
                t.val(--e))
        }),
        $(".cont").change(function() {
            var e = $(this).val();
            e > 1 && e < o ? $(this).siblings(".reduce").removeClass("boder_colour") : e > o ? (mui.toast("库存不足", {
                duration: 1e3
            }),
            $(this).val(o)) : e < 1 && ($(this).val("1"),
            mui.toast("输入值不能小于1", {
                duration: 1e3
            }))
        }),
        $(".choice_content_b_content").find("span").on("click", function() {
            $(this).addClass("colour").siblings().removeClass("colour")
        })
    }
    ,
    e.stages = function() {
        var e = Number($(".wbPrice").text())
          , t = (e / 12).toFixed(1);
        $(".coupons_stages_contnet_price").text(t)
    }
    ,
    e.pageToggleHeight = function(e) {
        var t = e.height();
        $(".detailsPage").parent(".swiper-wrapper").height(t)
    }
    ,
    e.voucher = function() {
        $(".juan_contnet").find(".juan_contnet_a").each(function() {
            var e = $(this);
            "true" == e.attr("data-index") && (e.addClass("juan_contnet_c"),
            e.find(".juan_text_tag").addClass("juan_text_tag2"),
            e.find(".juan_tag").text("已领取") && e.find(".juan_tag").addClass("juan_tag2"),
            e.find(".juan_tag").removeClass("js_coupon_juan"))
        }),
        $(".juan_contnet").find(".juan_contnet_a").each(function() {
            var e = $(this);
            "false" == e.attr("data-value") && (e.addClass("juan_contnet_c"),
            e.find(".juan_text_tag").addClass("juan_text_tag2"),
            e.find(".juan_tag").text("不可领") && e.find(".juan_tag").addClass("juan_tag2"),
            e.find(".juan_tag").removeClass("js_coupon_juan"))
        })
    }
    ,
    e.stringSubstr = function(e) {
        e.find(".evaluate_content_a_name").each(function() {
            var e = $(this);
            e.text().length >= 20 && e.text(e.text().substr(0, 20) + "...")
        })
    }
    ,
    e.stringSubstr($(".evaluate_content")),
    e.bottomHeight = function() {
        $(".detail_footer").each(function() {
            if ($(this).is(":visible")) {
                var e = $(this).height();
                $(".W_detail").css("margin-bottom", e + "px")
            }
        })
    }
    ,
    e.evaluate = function() {
        $(".evaluate_more_whole").on("click", function() {
            e.evaluateImg(),
            $("html,body").scrollTop(0);
            var a = t.find("#wb_goods_tab li").length - 2;
            o.slideTo(a, 1e3, !1),
            t.find("#wb_goods_tab li").eq(a).children("a").addClass("on").parents().siblings().children("a").removeClass("on")
        });
        var a = new Swiper(".swiper-container_evaluate",{
            pagination: ".evaluate_popup_num",
            paginationType: "fraction",
            observer: !0,
            observeParents: !0
        });
        $(".evaluate_content .evaluate_content_c").find("li").on("click", function() {
            $("body").css({
                overflow: "hidden"
            }),
            $(".evaluate_popup").on("touchmove", function(e) {
                e.preventDefault()
            }, !1);
            var e = $(this)
              , t = e.parent(".evaluate_content_c").find("li").length;
            $(".evaluate_popup .evaluate_popup_content").find(".swiper-wrapper").empty(),
            $(".evaluate_popup").show(),
            a.slideTo($(this).index(), 1e3, !1);
            for (var o = 0; o < t; o++) {
                var n = $(this).parent(".evaluate_content_c").find("li").eq(o).attr("data-index")
                  , i = "<div class=swiper-slide><img src=" + n + " alt=''></div>";
                $(".evaluate_popup .evaluate_popup_content").find(".swiper-wrapper").append(i)
            }
            $(".evaluate_popup .evaluate_popup_content").find(".swiper-slide").on("click", function() {
                $("body").css({
                    overflow: "auto"
                }),
                $(".evaluate_popup").off("touchmove"),
                $(".evaluate_popup").hide()
            })
        })
    }
    ,
    e.star = function() {
        $(".evaluate_content").find(".evaluate_content_a_ico").each(function() {
            var e = $(this);
            if (e.find(".icon-a-goods-wuxing").length <= 1)
                for (var t = e.attr("data-index"), o = 0; o < t; o++)
                    e.append("<span class='icon-a-goods-wuxing'></span>")
        })
    }
    ,
    e.down = function() {
        var t = $(".W_goods_detail_title")
          , o = $(".W_goods_detail_titleTwo")
          , a = $(".inner-wraps")
          , n = $(".W_detail .product")
          , i = $(".returnTop")
          , r = new DrapDown({
            contantWrap: $("#main-contant"),
            innerWrapsClass: ".inner-wraps",
            slideDownCallback: function() {
                a.eq(1).show() && t.hide() && o.show(),
                e.pageToggleHeight(a.eq(1)),
                n.addClass("stop-swiping"),
                i.removeClass("h")
            },
            slideUpCallback: function() {
                a.eq(1).hide() && t.show() && o.hide(),
                e.pageToggleHeight(a.eq(0)),
                n.removeClass("stop-swiping"),
                i.addClass("h")
            },
            trigerValue: 300,
            scrollDuration: 400
        });
        i.click(function() {
            r.slideUp(),
            $("html,body").animate({
                scrollTop: 0
            }, 1e3)
        })
    }
    ,
    e.heart = function() {
        $(".detail_footer_ico3").on("click", function() {
            var e = $(this)
              , t = $(".choice_content-a_title_bian").attr("data-index")
              , o = e.attr("data-index");
            $(this).hasClass("icon-d-goods-xin2") ? wb.corsAjax({
                subWbDomain: "h5api",
                cache: !1,
                url: "/goods/collect/deleteCollect",
                data: {
                    collectId: o
                },
                success: function(e) {
                    0 == e.info.error ? ($(".detail_footer_ico3").removeClass("icon-d-goods-xin2"),
                    mui.toast("取消成功", {
                        duration: 3e3
                    })) : mui.toast("取消失败", {
                        duration: 3e3
                    })
                },
                error: function() {
                    mui.toast("取消失败", {
                        duration: 3e3
                    })
                }
            }) : 1 == wb.isLogin ? wb.corsAjax({
                subWbDomain: "h5api",
                cache: !1,
                url: "/goods/collect/addCollect",
                data: {
                    code: t,
                    type: 1
                },
                success: function(t) {
                    0 == t.info.error ? (e.attr("data-index", t.data.collectCode),
                    $(".detail_footer_ico3").addClass("icon-d-goods-xin2"),
                    mui.toast("收藏成功", {
                        duration: 3e3
                    })) : mui.toast("收藏失败", {
                        duration: 3e3
                    })
                },
                error: function() {
                    mui.toast("收藏失败", {
                        duration: 3e3
                    })
                }
            }) : location.href = wb.fillUpUserModuleUrl("/member/login/", {
                domain: wb.domains().mu
            })
        })
    }
    ,
    e.coupon = function() {
        $(".js_coupon_juan").on("click", function() {
            var e = $(this)
              , t = e.attr("data-index");
            1 == wb.isLogin ? wb.corsAjax({
                subWbDomain: "h5api",
                cache: !1,
                url: "/goods/front/receive",
                data: {
                    couponCode: t,
                    siteRange: 3
                },
                success: function(t) {
                    0 == t.info.error ? (mui.toast("领取成功", {
                        duration: 1e3
                    }),
                    e.parents(".juan_contnet_a").addClass("juan_contnet_c"),
                    e.siblings(".juan_text").find(".juan_text_tag").addClass("juan_text_tag2"),
                    e.text("已领取") && e.addClass("juan_tag2")) : mui.toast("领取失败", {
                        duration: 1e3
                    })
                },
                error: function() {
                    mui.toast("领取失败", {
                        duration: 1e3
                    })
                }
            }) : location.href = wb.fillUpUserModuleUrl("/member/login/", {
                domain: wb.domains().mu
            })
        })
    }
    ,
    e.purchase = function() {
        var e = function(e) {
            var t, o = Math.floor($("#count").val()), a = $(".choice_content-a_title_bian").attr("data-index");
            wb.corsAjax({
                subWbDomain: "h5api",
                cache: !1,
                url: "/goods/front/getActivityForGoodsDetailInfo",
                data: {
                    goodsCode: a,
                    quantity: o
                },
                success: function(o) {
                    t = o.data ? o.data.bestActivityCode : 0,
                    !!e && e(t)
                },
                error: function() {
                    mui.toast("服务异常，请稍后再试", {
                        duration: 1e3
                    }),
                    !!e && e(0)
                }
            })
        };
        $(".js_purchase").on("click", function() {
            var t = $(this);
            e(function(e) {
                var o, a = $(".purchase_cont").find("li"), n = [], i = [];
                t.hasClass("popularity") ? (o = 1,
                a.each(function() {
                    var e = $(this);
                    e.children("span.choose").hasClass("icon-a-white-tik") || e.find("span.choose").hasClass("icon-a-mj_yixuan") && i.push({
                        goodsCode: e.attr("data-goods-code"),
                        groupwareCode: e.attr("data-ware-code"),
                        quantity: 1,
                        groupwareGoodsCode: $(".choice_content-a_title_bian").attr("data-index"),
                        version: e.attr("data-version")
                    }),
                    $.cookie("order_group", JSON.stringify(i), {
                        expires: 1,
                        path: "/"
                    })
                })) : o = Math.floor($("#count").val()),
                n.push({
                    goodsCode: $(".choice_content-a_title_bian").attr("data-index"),
                    activityCode: e,
                    quantity: o,
                    cartId: 0
                }),
                $.cookie("order_confirm", JSON.stringify(n), {
                    expires: 1,
                    path: "/"
                }),
                location.href = wb.fillUpUserModuleUrl("/order/confirm/", {
                    domain: wb.domains().m
                })
            });
            var o = new Date;
            o.setTime(o.getTime() + 36e5),
            $.cookie("avoid_login") && $.removeCookie("avoid_login", {
                path: "/",
                domain: wb.tools.psl().domain
            }),
            $.cookie("buy_now", 1, {
                expires: o,
                path: "/",
                domain: wb.tools.psl().domain
            })
        })
    }
    ,
    e.deposit = function() {
        $(".js_deposit").on("click", function() {
            var e = [{
                goodsCode: $(".choice_content-a_title_bian").attr("data-index"),
                activityCode: 0,
                quantity: Math.floor($("#count").val()),
                cartId: 0
            }];
            $.cookie("order_confirm", JSON.stringify(e), {
                expires: 1,
                path: "/"
            }),
            location.href = wb.fillUpUserModuleUrl("/order/confirm/", {
                domain: wb.domains().m
            });
            var t = new Date;
            t.setTime(t.getTime() + 36e5),
            $.cookie("avoid_login") && $.removeCookie("avoid_login", {
                path: "/",
                domain: wb.tools.psl().domain
            }),
            $.cookie("buy_now", 1, {
                expires: t,
                path: "/",
                domain: wb.tools.psl().domain
            })
        })
    }
    ,
    e.cart = function() {
        $(".detail_footer .icon-d-goodscart").length && wb.globalCart.getQuantity({
            success: function(e) {
                e > 0 ? ($(".detail_footer .icon-d-goodscart i").text(e),
                $(".detail_footer .icon-d-goodscart i").addClass("red")) : $(".detail_footer .icon-d-goodscart i").hide()
            }
        });
        var e = function() {
            var e = $(".choice_content-a_title_bian").attr("data-index")
              , o = Number($("#count").val())
              , a = Number($(".W_title .wb_cart.w_title_rd i").text())
              , n = Number($(".wbPrice").text())
              , i = $(".detail_footer .icon-d-goodscart i");
            wb.globalCart.add({
                goodsCode: e,
                quantity: o,
                salePrice: n,
                success: function(e) {
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
        $(".js_cart").on("click", function() {
            e(),
            $(".tc_container_choice").fadeOut(),
            $(".tc_content").removeClass("tc_bottom"),
            $("body").css({
                overflow: "auto"
            })
        })
    }
    ,
    e.share = function() {
        var e = $(".share_text").text()
          , t = $(".choice_content-a_img").children("img").attr("src")
          , o = location.href
          , a = new wb.Logger
          , n = $(".wbLogger")
          , i = {
            event: "shareGoods",
            eventPage: "goodsDetailPage",
            eventPageType: "h5",
            eventProps: {
                shareCode: n.attr("viewCode"),
                shareName: n.attr("viewName"),
                brandCode: n.attr("brandCode"),
                brandName: n.attr("brandName"),
                shopCode: n.attr("shopCode"),
                shopName: n.attr("shopName"),
                wbiaoPrice: n.attr("wbiaoPrice"),
                categoryCode: n.attr("categoryCode")
            }
        };
        $(".sina_share").on("click", function() {
            i.eventProps = wb.extend(i.eventProps, {
                shareChannel: 4
            }),
            a.log0.send(i);
            var n = {
                title: e,
                pic: t
            };
            o = "http://service.weibo.com/share/share.php?title=" + n.title + "&pic=" + n.pic + "&url=" + n.url,
            window.open(o)
        }),
        $(".tencent_share").on("click", function() {
            i.eventProps = wb.extend(i.eventProps, {
                shareChannel: 4
            }),
            a.log0.send(i);
            var n = {
                title: e,
                pic: t
            };
            o = "http://share.v.t.qq.com/index.php?c=share&a=index&appkey=221680&title=" + n.title + "&pic=" + n.pic + "&url=" + n.url,
            window.open(o)
        }),
        $(".qzone_share").on("click", function() {
            i.eventProps = wb.extend(i.eventProps, {
                shareChannel: 6
            }),
            a.log0.send(i);
            var n = {
                title: e,
                pics: t,
                url: o
            };
            o = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=" + n.title + "&pics=" + n.pics + "&url=" + n.url,
            window.open(o)
        })
    }
    ,
    e.addFootprint = function() {
        var e = $(".choice_content-a_title_bian").attr("data-index");
        wb.corsAjax({
            subWbDomain: "h5api",
            cache: !1,
            url: "/goods/footprint/addFootprint",
            data: {
                goodsCode: e
            }
        })
    }
    ,
    e.customerService = function() {
        var e = $(".W_detail_main .shop_more .CUSTOMER-SERVICE").attr("data-index")
          , t = $(".choice_content-a_title_bian").attr("data-index");
        wb.itemparam = wb.itemid = t,
        wb.wbCustomerService || wb.extend(wb, {
            wbCustomerService: new wb.WbCustomerService({
                customerServiceCode: e
            })
        }),
        $(".CUSTOMER-SERVICE").click(function() {
            wb.wbCustomerService && wb.wbCustomerService.open()
        }),
        wb.mjCustomerService || wb.extend(wb, {
            mjCustomerService: new wb.WbCustomerService({
                customerServiceCode: "wx_1000_1521086459453"
            })
        }),
        $(".MJ-CUSTOMER-SERVICE").click(function() {
            wb.mjCustomerService && wb.mjCustomerService.open()
        })
    }
    ,
    e.paging = function() {
        var t = $(".choice_content-a_title_bian").attr("data-index")
          , o = function(o, a, n, i) {
            var r = Number($(a).attr("data-index") / 10 - 1)
              , c = 0
              , s = !0;
            $(i).on("click", function() {
                if (s) {
                    var a = $(this);
                    c++;
                    var i = Number(c);
                    wb.corsAjax({
                        subWbDomain: "h5api",
                        cache: !1,
                        url: "/goods/paging",
                        data: {
                            parem: i,
                            goodsCode: t,
                            img: o
                        },
                        success: function(t) {
                            var o = function() {
                                $(n).append(t.html),
                                e.pageToggleHeight(a.parents(".gnTabs_block").parents(".swiper-slide")),
                                e.stringSubstr($(".evaluate_content")),
                                e.evaluate(),
                                e.star()
                            };
                            0 == t.info.error && (c < r ? o() : (o(),
                            s = !1,
                            a.hide()))
                        },
                        error: function() {
                            mui.toast("请求失败", {
                                duration: 1e3
                            })
                        }
                    })
                }
            })
        };
        o(0, "#evaluate_total", "#evaluate_total_content", ".detail_more"),
        o(1, "#evaluate_total_img", "#evaluate_total_img_content", ".detail_more_img")
    }
    ,
    e.combination = function() {
        new Swiper(".swiper-combination",{
            slidesPerView: 4,
            spaceBetween: 20,
            observer: !0,
            observeParents: !0,
            nextButton: ".zh_content_ico"
        })
    }
    ,
    e.removeByValue = function(e, t) {
        for (var o = 0; o < e.length; o++)
            if (e[o] == t) {
                e.splice(o, 1);
                break
            }
    }
    ,
    e.popularity = function() {
        var t = $(".purchase_cont")
          , o = t.find("li")
          , a = []
          , n = []
          , i = []
          , r = []
          , c = t.find("li").eq(0).find(".sp2").children("b").html();
        t.on("click", "li span.icon-a-mj_yixuan", function() {
            var t = $(this);
            if (t.hasClass("icon-a-white-tik")) {
                t.removeClass("icon-a-white-tik");
                for (var s = 1; s < o.length; s++)
                    if (!o.eq(s).find("span.choose").hasClass("icon-a-white-tik")) {
                        var d, l = o.eq(s).find("span.sp2").children("b").html(), u = o.eq(s).find("p.p1 span").children("em").html(), p = [], h = [], _ = {};
                        _ = {
                            value: s,
                            text: l
                        },
                        d = {
                            value: s,
                            text: u
                        },
                        p.push(_),
                        h.push(d);
                        for (var b = 0; b < p.length; b++)
                            -1 == n.indexOf(p[b].value) && (n.push(p[b].value),
                            a.push(p[b].text));
                        for (var b = 0; b < h.length; b++)
                            -1 == i.indexOf(h[b].value) && (i.push(p[b].value),
                            r.push(h[b].text))
                    }
                for (var g = Number(c), m = 0, v = 0; v < a.length; v++)
                    g += Number(a[v]);
                for (var f = 0; f < r.length; f++)
                    m += Number(r[f]);
                e.CartFooter(g, m)
            } else {
                t.addClass("icon-a-white-tik");
                var w = t.siblings("a").find("p.p2").find("span.sp2").children("b").html()
                  , C = t.siblings("a").find("p.p1").find("span").children("em").html()
                  , x = t.parents("li").index();
                e.removeByValue(a, w),
                e.removeByValue(n, x),
                e.removeByValue(r, C),
                e.removeByValue(i, x);
                var k = Number(c)
                  , y = 0;
                if (a.length < 1)
                    k = 0;
                else {
                    for (var S = 0; S < a.length; S++)
                        k += Number(a[S]);
                    for (var j = 0; j < r.length; j++)
                        y += Number(r[j])
                }
                e.CartFooter(k, y)
            }
        })
    }
    ,
    e.CartFooter = function(e, t) {
        var o = $(".purchase_footer");
        o.children(".sp1").find("em").text(e || 0),
        o.children(".sp2").find("em").text(t || 0)
    }
    ,
    e.store = function() {
        $(".store-title").find("li").on("click", function() {
            $(this).addClass("on").siblings().removeClass("on"),
            $(".store-content").find("li").eq($(this).index()).removeClass("h").siblings().addClass("h"),
            e.pageToggleHeight($(".store"))
        });
        new Swiper(".swiper-container-store",{
            loop: !0,
            pagination: ".swiper-pagination",
            paginationClickable: !0,
            autoplayDisableOnInteraction: !1,
            observer: !0,
            observeParents: !0
        });
        $(".storeStars").each(function() {
            var e = $(this)
              , t = e.attr("data-index");
            if (t >= 1)
                for (var o = 0; o < t; o++) {
                    e.append("<span class='fl'></span>")
                }
        })
    }
    ,
    e.goodsList = function() {
        new Swiper(".swiper-container-goodsList",{
            slidesPerView: 3,
            slidesPerColumn: 2,
            slidesPerGroup: 6,
            spaceBetween: 10,
            pagination: ".swiper-pagination",
            paginationClickable: !0,
            autoplayDisableOnInteraction: !1,
            observer: !0,
            observeParents: !0
        });
        $(".view-goodsList").find(".swiper-slide").on("click", function() {
            var e = $(this).attr("data-code")
              , t = $(this).attr("data-name")
              , o = $(this).attr("data-brandCode")
              , a = $(this).attr("data-brandn")
              , n = $(this).attr("data-shopCode")
              , i = $(this).attr("data-shopName")
              , r = $(this).attr("data-wbiao")
              , c = $(this).attr("data-catalog")
              , s = new wb.Logger
              , d = $(".wbLogger")
              , l = {
                event: "viewRcmdGoods",
                eventPage: "goodsDetailPage",
                eventPageType: "h5",
                eventProps: {
                    viewCode: e,
                    viewName: t,
                    rcmdBrandCode: o,
                    rcmdBrandName: a,
                    rcmdShopCode: n,
                    rcmdShopName: i,
                    rcmdWbiaoPrice: r,
                    rcmdCategoryCode: c,
                    relatedGoodsCode: d.attr("viewCode"),
                    relatedGoodsName: d.attr("viewName")
                }
            };
            s.log0.send(l),
            window.location.href = "/goods/" + e + ".html"
        })
    }
    ,
    e.servicePopup = function() {
        var e = $(".servicePopup")
          , t = Number(e.attr("data-enableSwitch"))
          , o = e.attr("data-dateRange")
          , a = Number(e.attr("data-goodsScanCount"))
          , n = Number(e.attr("data-residenceTime"))
          , i = $.cookie("storageKefu") ? JSON.parse($.cookie("storageKefu")) : {};
        if (0 === t || 1 === Number(i.close))
            return !1;
        console.log("进来了啊"),
        $.cookie("storageKefu", JSON.stringify(Object.assign(i, {
            num: i.range && i.range !== o ? 1 : (Number(i && i.num) || 0) + 1,
            range: o,
            close: 0
        })), {
            path: "/goods/"
        }),
        a <= Number(i.num) && setTimeout(function() {
            e.removeClass("h")
        }, 1e3 * n),
        $(".clickService").on("click", function() {
            var t = Number($(this).attr("data-index"));
            e.addClass("h"),
            $.cookie("storageKefu", JSON.stringify({
                close: 1,
                num: 0,
                range: ""
            }), {
                path: "/goods/"
            }),
            (new wb.Logger).log2.send({
                event: 1 === t ? "refuseContactCustomService" : "passiveContactCustomService",
                eventPage: "goodsDetailPage",
                eventProps: {}
            })
        })
    }
    ,
    e.init = function() {
        e.carousel(),
        e.title(),
        e.eject(),
        e.time(),
        e.carouselMax(),
        e.carouselClick(),
        e.choice(),
        e.heart(),
        e.stages(),
        e.voucher(),
        e.bottomHeight(),
        e.evaluate(),
        e.coupon(),
        e.purchase(),
        e.deposit(),
        e.cart(),
        e.share(),
        e.addFootprint(),
        e.customerService(),
        e.down(),
        e.paging(),
        e.star(),
        e.combination(),
        e._mainHeight(),
        e.popularity(),
        e.store(),
        e.goodsList(),
        e.servicePopup()
    }
    ,
    e.init(),
    new wb.GnTab({
        tabNavId: "#evaluate",
        tabConId: "#evaluate_content",
        callback: function(t) {
            if (e.pageToggleHeight($(".evaluate")),
            1 == t) {
                $(".load-evaluateTwo").find("li").children("img").each(function() {
                    var e = $(this)
                      , t = e.attr("evaluate-img");
                    e.attr("src", t),
                    e.removeAttr("evaluate-img")
                })
            }
        }
    }),
    new wb.GnTab({
        tabNavId: "#details",
        tabConId: "#details_content",
        callback: function(t) {
            e.pageToggleHeight($(".detailsPage"))
        }
    }),
    new wb.GnTab({
        tabNavId: "#details_two",
        tabConId: "#details_content_two",
        callback: function(t) {
            e.pageToggleHeight($(".inner-wrapsTwo"))
        }
    }),
    $(function() {
        $("img").wPreLoad("data-wpps"),
        $.cookie("buy_now") && $.removeCookie("buy_now", {
            path: "/",
            domain: wb.tools.psl().domain
        }),
        $.cookie("avoid_login") && $.removeCookie("avoid_login", {
            path: "/",
            domain: wb.tools.psl().domain
        }),
        JSON.parse(localStorage.getItem("nologin_address")) && localStorage.removeItem("nologin_address"),
        $.cookie("isUseCoupon") && $.removeCookie("isUseCoupon", {
            path: "/"
        }),
        $.cookie("invoice_info") && $.removeCookie("invoice_info", {
            path: "/order"
        }),
        $(".W_common_con .con_box .W_ntalk .icon-d-right-kf").remove(),
        $(".W_common_con").height($(".con_box").height());
        var e = $(window).width() > 640 ? 580 : $(window).width() - 60;
        $(".W_common_con .con_box .W_ntalk .ntalk_txt").css({
            left: "-" + e + "px"
        }),
        $.cookie("order_confirm") && $.removeCookie("order_confirm", {
            path: "/"
        }),
        $.cookie("order_group") && $.removeCookie("order_group", {
            path: "/"
        }),
        wb.wbPageService || wb.extend(wb, {
            wbPageService: new wb.WbCustomerService
        }),
        $(".wb_open--kf").click(function() {
            var e = $(this);
            wb.wbPageService && wb.wbPageService.open({
                customerServiceCode: e.attr("kf-service-code")
            })
        })
    });
    try {
        location.pathname.match(/^\/([a-z0-9\-]+)-g([0-9]+)\.html(?:\&[a-z0-9=]+)?$/) && wb.setTrackData({
            k: location.pathname.match(/^\/([a-z0-9\-]+)-g([0-9]+)\.html(?:\&[a-z0-9=]+)?$/)[2]
        }),
        location.pathname.match(/\/goods\/([0-9]+)/) && wb.setTrackData({
            k: location.pathname.match(/\/goods\/([0-9]+)/)[1]
        }),
        wb.setTrackData({
            m: $(".detail_footer_content").find("a.p2[href]").attr("href").match(/\/shop\/(\d+)((\/)?)$/)[1],
            l: $("#details_two").find(".click_brand").attr("data-index"),
            c2: "3"
        })
    } catch (e) {
        console.log("track-error", e.message)
    }
    var a = new wb.Logger
      , n = $(".wbLogger")
      , i = {
        version: null,
        cip: null,
        latitud: null,
        longitud: null,
        event: "viewGoods",
        eventTime: null,
        eventPage: "goodsDetailPage",
        eventPageType: "h5",
        eventProps: {
            viewCode: n.attr("viewCode"),
            viewName: n.attr("viewName"),
            brandCode: n.attr("brandCode"),
            brandName: n.attr("brandName"),
            shopCode: n.attr("shopCode"),
            shopName: n.attr("shopName"),
            wbiaoPrice: n.attr("wbiaoPrice"),
            categoryCode: n.attr("categoryCode")
        }
    }
      , r = location.href.split("#")[0];
    $.cookie("talentId") && (r = location.href.split("#")[0].indexOf("?") > -1 ? location.href.split("#")[0] + "&dr=" + $.cookie("talentId") : location.href.split("#")[0] + "?dr=" + $.cookie("talentId"));
    var c = "https:" == document.location.protocol ? "https:" : "http:"
      , s = {
        title: $(".share_text").text(),
        desc: "我在万表网发现了一个不错的商品 赶快来看看吧!",
        link: r,
        imgUrl: c + $(".choice_content-a_img").children("img").attr("src"),
        success: function() {}
    };
    wbiao.weiXinShare(function() {
        wx.onMenuShareTimeline(wb.extend(s, {
            success: function() {
                i.eventProps = wb.extend(i.eventProps, {
                    shareChannel: 2
                }),
                a.log0.send(i)
            }
        })),
        wx.onMenuShareAppMessage(wb.extend(s, {
            success: function() {
                i.eventProps = wb.extend(i.eventProps, {
                    shareChannel: 1
                }),
                a.log0.send(i)
            }
        })),
        wx.onMenuShareQQ(wb.extend(s, {
            success: function() {
                i.eventProps = wb.extend(i.eventProps, {
                    shareChannel: 5
                }),
                a.log0.send(i)
            }
        })),
        wx.onMenuShareWeibo(wb.extend(s, {
            success: function() {
                i.eventProps = wb.extend(i.eventProps, {
                    shareChannel: 4
                }),
                a.log0.send(i)
            }
        })),
        wx.onMenuShareQZone(wb.extend(s, {
            success: function() {
                i.eventProps = wb.extend(i.eventProps, {
                    shareChannel: 6
                }),
                a.log0.send(i)
            }
        }))
    }),
    a.log0.send(i)
}();
!function() {
    function e() {
        !function() {
            var e, n, t, o, i, c, a;
            n = window.location.pathname.replace(/\/$/gi, ""),
            t = n.split(/\//gi),
            i = new RegExp("member").test(t[1]),
            c = new RegExp("order").test(t[1]),
            a = new RegExp("pay").test(t[1]),
            o = ["/goods/appdetails", "/maintenance/mjreceived"],
            e = $(window).width() > 640 ? 636 : $(window).width() - 4,
            $(".W_common_con .con_box").css({
                right: "-" + e + "px"
            }),
            !(o.indexOf(n) < 0) || c || a || i && t[2] ? $(".W_common_con .con_box .W_ntalk").remove() : (wb.corsAjax({
                subWbDomain: "h5api",
                url: "/pub/ntalkWorks/",
                success: function(e) {
                    0 == e.info.error && $(".W_ntalk .ntalk_txt .kf_txt").html(e.data.mTitle)
                }
            }),
            "/" == window.location.pathname || new RegExp("index.html").test(window.location.pathname) || ($(".W_common_con .con_box .W_ntalk").fadeIn(),
            setTimeout(function() {
                $(".W_ntalk .ntalk_txt").fadeIn()
            }, 5e3),
            setTimeout(function() {
                $(".W_ntalk .ntalk_txt").addClass("hide_ntalk").fadeOut()
            }, 1e4))),
            $(".W_common_con").height($(".con_box").height())
        }()
    }
    $(function() {
        wbiao.extend(wb, {
            wbKeFu: new e
        }),
        wb.wbCustomerService || wb.extend(wb, {
            wbCustomerService: new wb.WbCustomerService
        }),
        $(".W_common_con").on("click", ".W_ntalk", function() {
            if (1 === wb.isWbApp)
                return wb.getServiceCode({
                    shopCode: 2,
                    success: function(e) {
                        try {
                            wb.webView(function(n) {
                                n.callHandler("wbApp-consult", {
                                    navTitle: "表哥",
                                    groupId: e,
                                    sourceUrl: window.location.href,
                                    sourceTitle: "表妹"
                                })
                            })
                        } catch (e) {}
                    }
                }),
                !1;
            wb.wbCustomerService && wb.wbCustomerService.open()
        })
    })
}();

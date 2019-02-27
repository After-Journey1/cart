!function() {
    $(".W_title .CUSTOMER-SERVICE").length && !wb.wbCustomerService && ($(".W_pt_shopHeader .wb_shop_box").length ? wb.extend(wb, {
        wbCustomerService: new wb.WbCustomerService({
            customerServiceCode: $("#service-code").attr("service-code")
        })
    }) : wb.extend(wb, {
        wbCustomerService: new wb.WbCustomerService
    })),
    $(".W_title .CUSTOMER-SERVICE").click(function() {
        wb.wbCustomerService && wb.wbCustomerService.open()
    }),
    $(".W_title .wb_cart").length && wb.globalCart.getQuantity({
        success: function(e) {
            e > 0 && ($(".W_title .wb_cart").addClass("w_title_rd"),
            $(".W_title .wb_cart i").text(e))
        }
    })
}();
!function() {
    wb.extend(wb, {
        GnFooter: function() {
            this.cartBadgeVal = function(e) {
                var t = $("#W_footer").children("a").eq(3).children(".W_footer_tag")
                  , n = Number(t.text());
                if ("number" == typeof e && 0 === e && (t.addClass("h"),
                t.text(e)),
                !e)
                    return Number(n);
                e && "number" == typeof e && !isNaN(parseInt(e)) && (t.removeClass("h"),
                t.text(e))
            }
            ,
            this.cartBadgePlus = function(e) {
                if (!e || "number" == typeof e || !isNaN(parseInt(e))) {
                    var t = parseInt(e) || 1
                      , n = $("#W_footer").children("a").eq(3).children(".W_footer_tag")
                      , r = parseInt(n.text()) || 0;
                    r += t,
                    n.removeClass("h"),
                    n.text(r)
                }
            }
            ,
            this.cartBadgeMinus = function(e) {
                if (!e || "number" == typeof e || !isNaN(parseInt(e))) {
                    var t = -Math.abs(parseInt(e)) || -1;
                    this.cartBadgePlus(t),
                    this.cartBadgeVal() <= 0 && $("#W_footer").children("a").eq(3).children(".W_footer_tag").addClass("h")
                }
            }
        }
    });
    var e = {};
    e.click = function() {
        if (1 === wb.isWbApp) {
            var e = function(e, t) {
                $(e).on("click", function(e) {
                    e.preventDefault(),
                    wb.webView(function(e) {
                        e.callHandler(t)
                    })
                })
            };
            e("#index_home", "wbApp-toHome"),
            e("#index_classify", "wbApp-toShoubiao"),
            e("#index_find", "wbApp-toDiscovery"),
            e("#index_cart", "wbApp-toCart"),
            e("#index_member", "wbApp-toProfile")
        }
    }
    ,
    e.ke = function() {
        wb.wbCustomerService || wb.extend(wb, {
            wbCustomerService: new wb.WbCustomerService
        }),
        $(".W_footer .CUSTOMER-SERVICE").click(function() {
            wb.wbCustomerService && wb.wbCustomerService.open()
        })
    }
    ,
    e.init = function() {
        e.click(),
        e.ke()
    }
    ,
    e.init()
}();

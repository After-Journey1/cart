
var yb = {
    isLogin: function () {
        console.log("调用了islogin")
        return document.cookie.indexOf("userId") >= 0 ? 1 : 0
    }(),
    updateIsLogin: function () {
        this.isLogin = function () {
            return document.cookie.indexOf("userId") >= 0 ? 1 : 0
        }()
    },
    GnFooter:{
        cartBadgeVal:function(e){
            var t = $("#W_footer").children("a").eq(3).children(".W_footer_tag")
            , n = Number(t.text());
          if ("number" == typeof e && 0 === e && (t.addClass("h"),
          t.text(e)),
          !e)
              return Number(n);
          e && "number" == typeof e && !isNaN(parseInt(e)) && (t.removeClass("h"),
          t.text(e))
        },
        cartBadgePlus:function(e){
            if (!e || "number" == typeof e || !isNaN(parseInt(e))) {
                var t = parseInt(e) || 1
                  , n = $("#W_footer").children("a").eq(3).children(".W_footer_tag")
                  , r = parseInt(n.text()) || 0;
                r += t,
                n.removeClass("h"),
                n.text(r)
            }
        },
        cartBadgeMinus:function(e){
            if (!e || "number" == typeof e || !isNaN(parseInt(e))) {
                var t = -Math.abs(parseInt(e)) || -1;
                this.cartBadgePlus(t),
                this.cartBadgeVal() <= 0 && $("#W_footer").children("a").eq(3).children(".W_footer_tag").addClass("h")
            }
        }
    }
}

// GnFooter: function() {
//     this.cartBadgeVal = function(e) {
//         var t = $("#W_footer").children("a").eq(3).children(".W_footer_tag")
//           , n = Number(t.text());
//         if ("number" == typeof e && 0 === e && (t.addClass("h"),
//         t.text(e)),
//         !e)
//             return Number(n);
//         e && "number" == typeof e && !isNaN(parseInt(e)) && (t.removeClass("h"),
//         t.text(e))
//     }
//     ,
//     this.cartBadgePlus = function(e) {
//         if (!e || "number" == typeof e || !isNaN(parseInt(e))) {
//             var t = parseInt(e) || 1
//               , n = $("#W_footer").children("a").eq(3).children(".W_footer_tag")
//               , r = parseInt(n.text()) || 0;
//             r += t,
//             n.removeClass("h"),
//             n.text(r)
//         }
//     }
//     ,
//     this.cartBadgeMinus = function(e) {
//         if (!e || "number" == typeof e || !isNaN(parseInt(e))) {
//             var t = -Math.abs(parseInt(e)) || -1;
//             this.cartBadgePlus(t),
//             this.cartBadgeVal() <= 0 && $("#W_footer").children("a").eq(3).children(".W_footer_tag").addClass("h")
//         }
//     }
// }
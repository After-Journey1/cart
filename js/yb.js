var yb = {
    isLogin: function () {
        console.log("调用了islogin")
        return document.cookie.indexOf("user") >= 0 ? 1 : 0
    }(),
    updateIsLogin: function () {
        this.isLogin = function () {
            return document.cookie.indexOf("user") >= 0 ? 1 : 0
        }()
    },
}
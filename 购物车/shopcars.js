var time = new Date();
console.log(time);
console.log(time.getFullYear());
console.log(time.getMonth()+1);
console.log(time.getDate());
console.log(time.getHours());
console.log(time.getMinutes());
//加载商品
function loadShops(){
    $(function(){
        $.ajax({
            type:'get',
            url:'api/loadshop.php',
            dataType:'json',
            success:function(data){
                // console.log(data.data);
                if(data.code == 0){
                    var m = ejs.render($('#shop-data').html(),{msg:data.data});
                    $('.list').append(m);
                }else{
                    alert('空空如也！');
                } 
            }
        })
    })
};
loadShops();
FastClick.attach(document.body);
//删除商品
function delShops(ele){
    if (ele.checked) {
        var n = $(ele).parent();
        $('.submit-btn').on('tap',function(){
            n.remove();
        })
    }
}
//编辑
var flag = true;
$('.operation').on('tap',function(){
    if(flag){
        flag = false;
        $(this).html('完成');
        $('.total-num').hide();
        $('.submit-btn').css({background:'#ff6700'}).html('删除所选');
        $('.checkbox').each(function () {
            $(this).on('tap', function () {
                delShops(this);
            })
            delShops(this);
        })
    }else{
        flag = true;
        $(this).html('编辑');
        $('.total-num').show();
        $('.submit-btn').css({background:'#f21c1c'}).html('去结算');
    }
})
//全选
function checkAll() {
    $('.check-all').on('click', function () {
        $('.checkbox').each(function () {
            this.checked = $('.check-all').get(0).checked;
        })
        allNumPrice();

    })
};
checkAll();
//单选--完成--全选
function singleSelect() {
    $('.list').on('tap','.checkbox',function(){
        var $n = 0;
        $('.checkbox').each(function (s, val2) {
            if (val2.checked) {
                $n++;
            }
        })
        if ($('.checkbox').length == $n) {
            $('.check-all').get(0).checked = true;
        } else {
            $('.check-all').get(0).checked = false;
        }
        allNumPrice();
    })
};
singleSelect();
// 数量加
function addNum() {
    $('.list').on('tap','.add-btn',function(){
        var num = $(this).prev().html();
        num++;
        $(this).prev().html(num);
        allNumPrice();  
    })
};
addNum();
// 数量减
function minNum() {
    $('.list').on('tap','.minus-btn',function(){
        var num = $(this).next().html();
        num --;
        if (num <= 1) {
            num = 1;
        }
        $(this).next().html(num);
        allNumPrice();
    })
};
minNum();
//计算总数和价格
function allNumPrice(){
    var $allNum = 0, $allPrice = 0;
    $('.checkbox').each(function (i, val) {
        if (this.checked) {
            var $sinN = parseInt($('.num').eq(i).html());
            var $sinP = parseInt($('.price').eq(i).html()) * $sinN;
            $allNum += $sinN;
            $allPrice += $sinP;  
        }
    })
    $('.all-num').html($allNum);
    $('.all-price').html($allPrice.toFixed(2));      
}
//点击加入购物车
function recSubmit(){
    $('.recommend').on('tap','.rec-shop',function(){
        var img = $(this).parent().parent().siblings().attr('src');
        var name = $(this).parent().siblings().html();
        var price = $(this).siblings().children().html();
        var data = '?img='+img+'&name='+name+'&price='+price;
        console.log(data)
        $.ajax({
            type:'get',
            url:'api/shopcars.php',
            data:data,
            dataType:'',
            success:function(data){
                console.log(data)
            }
        })
    })
}
recSubmit();


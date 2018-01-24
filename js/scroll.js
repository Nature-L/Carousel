/**
 * by : nature
 * tel : 18810153051
 * scroll
 */
!function (global) {
    global.Scroll = function () {
        var scrollList = document.querySelector(".scroll-list");
        var range = document.documentElement.clientWidth;
        if(scrollList){
            var initChilds = scrollList.children;
            if(initChilds){
                for(var i=0, l=initChilds.length; i<l; i++){
                    initChilds[i].style.width = range + "px";
                    initChilds[i].style.left = range*i + "px";
                    initChilds[i]._index = i;
                }
                scrollList.style.width = initChilds.length * range + "px";
            }
        }
        var index = 0;
        function left(callback) {
            var left = scrollList.style.left.substring(0, scrollList.style.left.indexOf("p"));
            var childs = document.querySelectorAll(".scroll-child");
            if(childs.length <= 1 || left != 0){
                return;
            }
            if(index >= childs.length){
                index = 0;
            }
            Timer.stop();
            scrollList.style.left = -range + "px";
            scrollList.style.transition = "left 1s linear";
            setTimeout(function () {
                for(var i=0, l=childs.length; i<l; i++){
                    childs[i].style.left = childs[i].style.left.substring(0, childs[i].style.left.indexOf("p")) - range + "px";
                }
                childs[index].style.left = (childs.length-1) * range + "px";
                scrollList.style.left = 0;
                scrollList.style.transition = "left 0s";
                index++;
            }, 1000);
            if(callback){
                callback();
            }
            Timer.start();
        }
        function right(callback) {
            var left = scrollList.style.left.substring(0, scrollList.style.left.indexOf("p"));
            var childs = document.querySelectorAll(".scroll-child");
            if(childs.length <= 1 || left != 0){
                return;
            }
            index--;
            if(index < 0){
                index = childs.length - 1;
            }
            Timer.stop();
            childs[index].style.left = -range + 'px';
            scrollList.style.left = range + "px";
            scrollList.style.transition = "left 1s linear";
            setTimeout(function () {
                for(var i=0, l=childs.length; i<l; i++){
                    childs[i].style.left = (Number(childs[i].style.left.substring(0, childs[i].style.left.indexOf("p"))) + range) + "px";
                }
                scrollList.style.left = 0;
                scrollList.style.transition = "left 0s";
            }, 1000);
            if(callback){
                callback();
            }
            Timer.start();
        }
        return{
            left: left,
            right: right
        }
    }();
    var Timer = {
        TT: null,
        start: function () {
            this.TT = setInterval(Scroll.left, 5000);
        },
        stop: function () {
            clearInterval(this.TT);
        }
    };
    Timer.start();
}(this);
/**
 * 单机五子棋
 */

var goBang = new GoBang(15, 15),
    mouseBox = H.Dom.getByClass('mouseBox')[0];

goBang.init();
bindEvent();

function bindEvent() {
    // 绑定鼠标事件
    var chessBoxs = H.Dom.getByClass('chessBox');
    for (var i = 0, len = chessBoxs.length; i < len; i++) {
        (function (index) {
            var _this = chessBoxs[index];
            H.Events.addEvent(_this, 'mouseover', function () {
                showMouseTip(_this, goBang);
            });

            H.Events.addEvent(_this, 'mouseout', function () {
                clearMouseTip(_this);
            });

            // 落子事件
            H.Events.addEvent(_this, 'click', function () {
                // 下棋
                playChess(_this, goBang, function () {

                    // TODO 判断胜负
                    winOrLose();

                    if (goBang.winOrLose) {

                    }
                });

                // TODO 电脑下棋
            });
        })(i);
    }
}


// 显示提示
function showMouseTip(obj, goBang) {
    var x = obj.getAttribute('data-x'),
        y = obj.getAttribute('data-y');
    // 无落子，可以下棋
    if (goBang.martix[x][y] < 0) {

        H.Dom.setStyle(mouseBox, 'display:block;');
        obj.appendChild(mouseBox);
    }
}

// 隐藏鼠标提示
function clearMouseTip(obj) {
    mouseBox.style.display = "none";
}

/**
 * 下棋步骤
 * @param  {Object} obj    当期落子对象chessBox
 * @param  {Object} goBang 五子棋对象
 * @return {[type]}        [description]
 */
function playChess(obj, goBang, callback) {
    var x = obj.getAttribute('data-x'),
        y = obj.getAttribute('data-y');
    if (goBang.martix[x][y] < 0) {
        // TODO 落子判断，添加黑白子DOM元素
        var chessType = goBang.currentPlayer, //0白子，1黑子
            chess = H.Dom.createElement('div', {
                'class': 'piece'
            });
        chess.style.display = 'block';
        if (chessType) {
            // PC黑子
            H.Dom.addClass(chess, 'black');
        } else {
            H.Dom.addClass(chess, 'white');
        }
        obj.appendChild(chess);
        goBang.currentPlayer = +!chessType;
        goBang.martix[x][y] = goBang.currentPlayer;

        if (callback && typeof callback == 'function') {
            callback();
        }
    }
}

/**
 * 根据当前落子坐标，判断胜负
 * @return {[type]} [description]
 */
function winOrLose(){

}

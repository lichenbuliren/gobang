/**
 * 单机五子棋
 */

var GoBang = new GoBang(14, 14);
GoBang.init();

// 绑定鼠标事件
var chessBoxs = H.Dom.getByClass('chessBox');
for (var i = 0, len = chessBoxs.length; i < len; i++) {
    var _this = chessBoxs[i],
        x = _this.getAttribute('data-x'),
        y = _this.getAttribute('data-y'),
        mouseBox = H.Dom.getByClass('mouseBox')[0];
        mouseBox.cssText = 'top: ' + x*40 + 'px;left:' + y*40 + 'px;display:block;';
    H.Events.addEvent(_this, 'mouseover', function () {
        _this.appendChild(mouseBox);
    });
}
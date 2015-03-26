/**
 * 封装五子棋对象
 * 1、使用二维数组来表示棋盘落子情况，0表示没有落子，1表示落子。
 * 2、落子权重规则：计算落子六个方向（LT,T,RT,RB,B,LB），四格范围内的棋子，
 *    所有权重相加，就是当前棋子的权重值，去权重值最高的点落子。
 * 3、胜负判断：如果落子之后，有五个相连，判断获胜。
 * 4、进攻防守：判断当前落子黑白的权重值。有落子
 * 估值权重见images/weight.png图片
 *
 * 参考书籍：智能五子棋算法的设计实现（王长飞，蔡强，李海生）
 * @param {number} row 棋盘初始化行数
 * @param {number} col 棋盘初始化列数
 */
function GoBang(rows, cols) {

    this.rows = rows || 14;
    this.cols = cols || 14;

    // 当前下棋手，0代表PC,1代表玩家
    this.currentPlayer = 0;

    // 三维数组，用来存储计算机棋型数据
    // computer[this.rows][this.cols][i]
    // 其中i为0-4，0表示水平方向，1代表竖直方向，2代表45°角方向，3代表135°角方向
    this.computer = [];
    this.player = [];

    // 记录上一次白子落子坐标
    this.xPrev1 = 0;
    this.yPrev1 = 0;
    // 记录上一次黑子落子坐标
    this.xPrev2 = 0;
    this.yPrev2 = 0;

    this.moves = [];

    // 棋盘矩阵,0表示无子，1表示白子，2表示黑子
    this.martix = [];

    /**
     * 棋子对象
     * @param {number} x 落点X轴坐标
     * @param {number} y 落点Y轴坐标
     */
    function Point(x, y) {
        this.x = x || 0;
        this.y = y || 0;

        // 是否落子
        this.state = false;
        // 白子权重
        this.whiteWeight = 0;
        // 黑子权重
        this.blackWeight = 0;
    }
}

GoBang.prototype.init = function () {

    var chessboardBox = H.Dom.getByClass('chessboardBox')[0],
        // 落子容器
        pieceBox = H.Dom.getByClass('pieceBox')[0],
        chessboard = H.Dom.createElement('table', {
            'class': 'chessboard_bg',
            'style': 'cellPadding:0,cellSpacing:0;'
        }),
        chessBox = '',
        row, cell, count = 0;
    // 初始化矩阵,绘制背景表格
    for (var i = 0; i < this.rows; i++) {
        this.martix[i] = [];
        row = chessboard.insertRow(0);
        for (var j = 0; j < this.cols; j++) {
            this.martix[i][j] = 0;
            cell = row.insertCell(0);
            cell.innerHTML = i + '*' + j;
        }
    }

    // 初始化棋盘
    var _rows = this.rows + 1,
        _cols = this.cols + 1;
    for (var i = 0; i < _rows; i++) {
        for (var j = 0; j < _cols; j++) {
            chessBox += '<div class="chessBox" data-x="' + j + '" data-y="' + i + '">' + count++ + '</div>'
        };
    };
    pieceBox.innerHTML = chessBox;
    chessboardBox.appendChild(chessboard);
}
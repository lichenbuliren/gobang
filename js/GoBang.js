/**
 * 封装五子棋对象
 * @param {number} row 棋盘初始化行数
 * @param {number} col 棋盘初始化列数
 */
function GoBang(rows, cols) {

    // 棋盘大小
    this.chessBoardSize = 15;
    // 保存落子情况,二维数组，i表示行，j表示列
    this.chessState = [];
    this.gameOver = false;

    this.init = function () {

    };

    this.startGame = startGame;

    this.pauseGame = pauseGame;

    this.resetGame = resetGame;

    this.restartGame = restartGame;
}

GoBang.prototype.init = function(){
    
}
module MaruBatsu {
    /** 先手・後手を表す */
    export enum Piece {
        Maru,
        Batsu
    }

    /** ゲーム盤の管理・進行を行うクラス */
    export class GameLogic {
        SIDE = 3;
        board: Piece[][];
        turn: Piece;

        constructor(public el: HTMLElement) {

        }
        /** ゲームの初期設定を行いゲームを開始する */
        start(): void {
            this.el.innerHTML = '';
            this.turn = Piece.Maru;
            this.board = [];
            for (var i = 0; i < this.SIDE; i++) {
                this.board.push([]);
            }
            for (var y = 0; y < this.SIDE; y++) {
                for (var x = 0; x < this.SIDE; x++) {
                    this.board[x][y] = null;
                    this.addPiece(x, y);
                }
            }
        }

        /** 1マスに相当するHTML要素を作成し追加する */
        addPiece(x: number, y: number): void {
            var div = document.createElement('div');
            div.addEventListener('click', () => {
                this.put(x, y, div);
            });
            div.className = 'piece';
            if(x === 0) {
                div.className += ' head';
            }
            this.el.appendChild(div);
        }

        /** 1手指す */
        put(x: number, y: number, el: HTMLElement): void {
            if (this.board[x][y] !== null) {
                // 既に何か置かれていたら無視する
                return;
            }
            var current = this.turn;
            this.board[x][y] = this.turn;

            //表示の変更と指し手の交代
            if (this.turn === Piece.Maru) {
                el.innerText = '◯';
                this.turn = Piece.Batsu;
            } else {
                el.innerText = '×';
                this.turn = Piece.Maru;
            }

            //勝者になったかのチェックと結果表示
            if (this.isWinner(current)) {
                if (current === Piece.Maru) {
                    alert('◯の勝ち！');
                } else {
                    alert('×の勝ち！');
                }
            }
        }

        /** 勝敗をチェック */
        isWinner(turn: Piece): boolean {
            //縦横の判定
            for (var i = 0; i < this.SIDE; i++) {
                var v = true;
                var h = true;
                for (var j = 0; j < this.SIDE; j++) {
                    if (this.board[i][j] !== turn) {
                        v = false;
                    }
                    if (this.board[j][i] !== turn) {
                        h = false;
                    }
                }
                if (v || h) {
                    return true;
                }
            }

            //斜めの判定
            var c = true;
            var r = true;
            for (var i = 0; i < this.SIDE; i++) {
                if (this.board[i][i] !== turn) {
                    c = false;
                }
                if (this.board[i][this.SIDE - i - 1] !== turn) {
                    r = false;
                }
            }
            if (c || r) {
                return true;
            }

            return false;
        }
    }
}

window.onload = () => {
    var el = document.getElementById('game');
    var logic = new MaruBatsu.GameLogic(el);
    logic.start();
}

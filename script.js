
    const submitBtn = document.getElementById('submit');
    const setup     = document.getElementById('setup');
    const game      = document.getElementById('game');
    const message   = document.querySelector('.message');
    const cells     = document.querySelectorAll('.cell');

    const WINS = [
      [1,2,3],[4,5,6],[7,8,9],
      [1,4,7],[2,5,8],[3,6,9],
      [1,5,9],[3,5,7]
    ];

    let players = ['',''];
    let current = 0; // 0 = player1 (X), 1 = player2 (O)
    let board   = {}; // id -> 'x' or 'o'
    let over    = false;

    submitBtn.addEventListener('click', () => {
      const p1 = document.getElementById('player1').value.trim();
      const p2 = document.getElementById('player2').value.trim();
      if (!p1 || !p2) { alert('Please enter both player names.'); return; }
      players = [p1, p2];
      current = 0;
      board   = {};
      over    = false;
      cells.forEach(c => { c.textContent = ''; c.classList.remove('taken','winner'); });
      setup.style.display = 'none';
      game.style.display  = 'flex';
      message.textContent = `${players[0]}, you're up`;
    });

    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (over || cell.classList.contains('taken')) return;
        const id     = cell.id;
        const mark   = current === 0 ? 'x' : 'o';
        board[id]    = mark;
        cell.textContent = mark;
        cell.classList.add('taken');

        const win = checkWin(mark);
        if (win) {
          win.forEach(i => document.getElementById(String(i)).classList.add('winner'));
          message.textContent = `${players[current]} congratulations you won!`;
          over = true;
        } else if (Object.keys(board).length === 9) {
          message.textContent = "It's a draw!";
          over = true;
        } else {
          current = current === 0 ? 1 : 0;
          message.textContent = `${players[current]}, you're up`;
        }
      });
    });

    function checkWin(mark) {
      for (const combo of WINS) {
        if (combo.every(i => board[String(i)] === mark)) return combo;
      }
      return null;
    }
  
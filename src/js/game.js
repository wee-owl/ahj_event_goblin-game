import { BOARD_SIZE, LOSE_COUNT, WIN_COUNT } from './const';

export default class Game {
  constructor(element) {
    this.element = element;
    this.cells = [];
    this.hit = 0;
    this.appear = 0;
  }

  initGame() {
    this.renderTitle();
    this.renderArea(BOARD_SIZE);
    this.renderBtn();
    this.startGame();
  }

  renderTitle() {
    const gameTitle = document.createElement('h1');
    gameTitle.classList.add('game__title');
    gameTitle.textContent = 'Goblin Game';
    this.element.append(gameTitle);
  }

  renderArea(size) {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game__container');
    gameContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    this.element.append(gameContainer);
    const gameCell = '<div class="game__cell"></div>';
    gameContainer.insertAdjacentHTML('afterbegin', gameCell.repeat(BOARD_SIZE ** 2));
    this.container = gameContainer;
    this.cells = Array.from(this.container.children);
  }

  renderBtn() {
    const btn = document.createElement('button');
    btn.classList.add('game__btn');
    btn.setAttribute('type', 'button');
    btn.setAttribute('click', 'false');
    btn.textContent = 'Start Game';
    this.element.append(btn);
  }

  startGame() {
    const btn = document.querySelector('.game__btn');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.hit = 0;
      this.appear = 0;
      if (document.querySelector('.game__result')) {
        document.querySelector('.game__result').remove();
        this.container.style.pointerEvents = '';
        btn.setAttribute('click', 'false');
      }
      if (btn.getAttribute('click') === 'false') {
        this.renderGoblin();
        btn.setAttribute('click', 'true');
      }
    });
    this.renderClick();
  }

  renderGoblin() {
    const arr = [...Array(BOARD_SIZE ** 2)].map((_, i = 0) => i + 1);
    let current = 0;
    const timerId = setInterval(() => {
      // eslint-disable-next-line no-console
      console.log('Hit:', this.hit, 'Miss:', this.appear);
      this.stopGame();
      if (document.querySelector('.game__result')) {
        clearInterval(timerId);
      }
      let random = Math.abs(Math.floor(Math.random() * arr.length) - 1);
      if (current === random) random = Math.abs(random - 1);
      this.cells.forEach((cell) => cell.classList.remove('game__cell-active'));
      this.cells[random].classList.add('game__cell-active');
      this.appear += 1;
      current = random;
    }, 700);
  }

  renderClick() {
    this.container.addEventListener('click', (e) => {
      const cell = e.target.closest('.game__cell');
      if (!cell) return;
      if (cell.classList.contains('game__cell-active')) {
        this.hit += 1;
        this.appear = 0;
        cell.classList.add('game__cell-hit');
        setTimeout(() => cell.classList.remove('game__cell-hit'), 400);
      } else {
        cell.classList.add('game__cell-miss');
        setTimeout(() => cell.classList.remove('game__cell-miss'), 400);
      }
    });
  }

  stopGame() {
    if (this.hit === WIN_COUNT) this.renderResult('win');
    if (this.appear === LOSE_COUNT) this.renderResult('lose');
  }

  renderResult(text) {
    const result = document.createElement('p');
    result.classList.add('game__result');
    let message;
    if (text === 'win') {
      message = `
        You win!
        Number of hits: ${this.hit}
      `;
    } else {
      message = `
        You lose!
        Number of misses: ${this.appear}
      `;
    }
    result.innerText = message;
    this.element.append(result);
    this.container.style.pointerEvents = 'none';
  }
}

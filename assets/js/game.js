class Player {
  constructor() {
    this.batu = document.getElementsByClassName("batu");
    this.kertas = document.getElementsByClassName("kertas");
    this.gunting = document.getElementsByClassName("gunting");
  }
}

const Computer = (Base) =>
  class extends Base {
    randomPick = (max) => Math.floor(Math.random() * max);
  };

class Player_1 extends Player {
  constructor(batu, kertas, gunting) {
    super(batu, kertas, gunting);
    this.#initiation();
  }

  #initiation() {
    this.batu[0].id = "batu-player";
    this.kertas[0].id = "kertas-player";
    this.gunting[0].id = "gunting-player";
  }
}

class Player_2 extends Computer(Player) {
  constructor(batu, kertas, gunting) {
    super(batu, kertas, gunting);
    this.#initiation();
  }

  #initiation() {
    this.batu[1].id = "batu-com";
    this.kertas[1].id = "kertas-com";
    this.gunting[1].id = "gunting-com";
  }
}

class Rules {
  constructor() {
    this.resultText = document.createElement("h1");
    this.resultContainer = document.getElementById("vs_result");
    this.user_choice;
    this.com_choice;
  }

  logger = (text) => {
    console.log(text);
  };

  _defaultState = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.remove("versus_result");
    this.resultText.innerHTML = "VS";
    this.resultContainer.appendChild(this.resultText);
  };

  _hasilMenang = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "PLAYER 1 WIN";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Hasil : PLAYER 1 Menang");
  };

  _hasilKalah = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "COM WIN";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Hasil : COM Menang");
  };

  _hasilDraw = () => {
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.add("draw");
    this.resultText.innerHTML = "DRAW";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Hasil : Draw!");
  };

  decision = (userChoice, comChoice) => {
    if (userChoice === comChoice) {
      return this._hasilDraw();
    } else if ((userChoice === "batu" && comChoice === "gunting") || (userChoice === "kertas" && comChoice === "batu") || (userChoice === "gunting" && comChoice === "kertas")) {
      return this._hasilMenang();
    } else {
      return this._hasilKalah();
    }
  };
}

class Game extends Rules {
  constructor(user_choice, com_choice) {
    super(user_choice, com_choice);
    this.resetResult = document.getElementById("reset");
    this.#initiation();
  }

  #initiation() {
    this.user = new Player_1();
    this.com = new Player_2();
    this._defaultState();
    this.resetButton();
  }

  getUserPick = (choice) => {
    this.user_choice = choice;
    this.logger(`Player 1 Pilih: ${this.user_choice}`);
    return this.user_choice;
  };

  getComPick = (choice) => {
    this.com_choice = choice;
    this.logger(`Com Pilih: ${this.com_choice}`);
    return this.com_choice;
  };

  setPlayerListener = () => {
    this.user.batu[0].onclick = () => {
      this.getUserPick("batu");
      this.user.batu[0].classList.add("active");
      this.user.kertas[0].classList.remove("active");
      this.user.gunting[0].classList.remove("active");
      this.removePlayerListener();
      this.finalResult();
    };

    this.user.kertas[0].onclick = () => {
      this.getUserPick("kertas");
      this.user.batu[0].classList.remove("active");
      this.user.kertas[0].classList.add("active");
      this.user.gunting[0].classList.remove("active");
      this.removePlayerListener();
      this.finalResult();
    };

    this.user.gunting[0].onclick = () => {
      this.getUserPick("gunting");
      this.user.batu[0].classList.remove("active");
      this.user.kertas[0].classList.remove("active");
      this.user.gunting[0].classList.add("active");
      this.removePlayerListener();
      this.finalResult();
    };
  };

  setComListener(choice) {
    switch (choice) {
      case "batu":
        this.getComPick("batu");
        this.com.batu[1].classList.add("active");
        this.com.kertas[1].classList.remove("active");
        this.com.gunting[1].classList.remove("active");
        break;
      case "kertas":
        this.getComPick("kertas");
        this.com.batu[1].classList.remove("active");
        this.com.kertas[1].classList.add("active");
        this.com.gunting[1].classList.remove("active");
        break;
      case "gunting":
        this.getComPick("gunting");
        this.com.batu[1].classList.remove("active");
        this.com.kertas[1].classList.remove("active");
        this.com.gunting[1].classList.add("active");
        break;
      default:
        break;
    }
  }

  removePlayerListener = () => {
    document.getElementsByClassName("batu")[0].disabled = true;
    document.getElementsByClassName("kertas")[0].disabled = true;
    document.getElementsByClassName("gunting")[0].disabled = true;
  };

  result = () => {
    setInterval(() => {
      if (this.user_choice && this.com_choice) {
        this.decision(this.user_choice, this.com_choice);
      }
      this.user_choice = null;
      this.com_choice = null;
    }, 400);
  };

  finalResult() {
    switch (this.com.randomPick(3)) {
      case 2:
        this.setComListener("batu");
        this.result();
        break;
      case 1:
        this.setComListener("kertas");
        this.result();
        break;
      case 0:
        this.setComListener("gunting");
        this.result();
        break;
      default:
        break;
    }
  }

  resetButton() {
    this.resetResult.onclick = () => {
      this.logger("Game mulai kembali");
      this._defaultState();
      document.querySelectorAll(".choice").forEach((userButton) => {
        userButton.classList.remove("active");
        userButton.disabled = false;
      });
    };
  }

  play() {
    this.logger("Ayo Mainkan Game");
    this.setPlayerListener();
  }
}

const game = new Game();
game.play();

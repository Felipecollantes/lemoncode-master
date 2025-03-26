// 5. Slot Machine

class SlotMachine {
  constructor() {
    this.coins = 0;
  }

  play() {
    this.coins++;
    
    const reel1 = Math.random() >= 0.5;
    const reel2 = Math.random() >= 0.5;
    const reel3 = Math.random() >= 0.5;
    
    if (reel1 && reel2 && reel3) {
      const wonCoins = this.coins;
      this.coins = 0;
      return `Congratulations!!!. You won ${wonCoins} coins!!`;
    } 

    return "Good luck next time!!";
    
  }
}

const machine1 = new SlotMachine();
console.log(machine1.play());
console.log(machine1.play());
console.log(machine1.play());
console.log(machine1.play());
console.log(machine1.play()); 
console.log(machine1.play());
console.log(machine1.play());
console.log(machine1.play());
console.log(machine1.play());
console.log(machine1.play());
console.log(machine1.play());
console.log(machine1.play());
console.log(machine1.play());

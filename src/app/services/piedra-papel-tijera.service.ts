import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PiedraPapelTijeraService {

  constructor() { }

  public play(playerChoice: string): string {
    const computerChoice = this.generateComputerChoice();

    if (playerChoice === computerChoice) {
      return 'Empate';
    }

    type Choice = 'Piedra' | 'Papel' | 'Tijera';

    const winningCombos: { [key in Choice]: Choice } = {
      Piedra: 'Tijera',
      Papel: 'Piedra',
      Tijera: 'Papel',
    };

    function isValidChoice(choice: string): choice is Choice {
      return Object.keys(winningCombos).includes(choice as Choice);
    }

    const winner = isValidChoice(playerChoice) ? winningCombos[playerChoice] : undefined;

    if (winner) {
      // Potential fix: Check if winner is the computer's choice
      return winner === computerChoice ? 'Perdiste' : 'Ganaste';
    } else {
      return 'Perdiste';
    }
  }

  private generateComputerChoice(): string {
    const choices = ['Piedra', 'Papel', 'Tijera'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
}

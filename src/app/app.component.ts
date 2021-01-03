import { Component, OnInit } from '@angular/core';
import { DIES } from '../assets/constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Boggle';
  board: string[][] = [];

  ngOnInit(): void {
    this.shakeBoard();
  }

  shakeBoard(): void {
    let diesCopy = JSON.parse(JSON.stringify(DIES));
    const board: string[][] = [];
    for (let row = 0; row < 4; row++) {
      const r = [];
      for (let col = 0; col < 4; col++) {
        const die = Math.floor(Math.random() * diesCopy.length);
        const face = Math.floor(Math.random() * 6);
        const faceValue = diesCopy[die][face];
        r.push(faceValue);
        diesCopy = diesCopy.slice(0, die).concat(diesCopy.slice(die + 1));
      }
      board.push(r);
    }
    this.board = board;
  }
}

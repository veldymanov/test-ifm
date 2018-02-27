import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pazzle',
  templateUrl: './pazzle.component.html',
  styleUrls: ['./pazzle.component.scss']
})
export class PazzleComponent implements OnInit {

  private photoPieces: HTMLElement[] = [];
  private photoPiecesZIndexes: string[] = [];

  constructor() {}

  ngOnInit() {
    this.getPhotoPieces();
    this.randomPhotoPieces();
    this.photoPieces.forEach( (piece, index) => {
      this.dragDrop(piece);
      this.photoPiecesZIndexes[index] = piece.style.zIndex;
    });
  }

  getPhotoPieces() {
    for (let i = 0; i < 9; i++) {
      this.photoPieces[i] = <HTMLElement>document.querySelector(`.js-piece-${i + 1}`);
    }
  }

  randomPhotoPieces() {
    const elWidth = this.photoPieces[0].offsetWidth;
    this.photoPieces.forEach(piece => piece.style.cssText = this.randomizePieces(elWidth));
  }

  randomizePieces(elWidth) {
    return `
      left: ${Math.floor( 2 * elWidth * Math.random() )}px;
      top: ${ Math.floor( (250 - elWidth) * Math.random() )}px;
      z-index: ${ Math.floor( 10 * Math.random() )};
    `;
  }

  dragDrop(elem) {
    elem.addEventListener('mousedown', (event: MouseEvent) => {
      const style = window.getComputedStyle(elem);
      const left0 = parseInt(style.getPropertyValue('left'), 10);
      const top0 = parseInt(style.getPropertyValue('top'), 10);
      const zIndex0 = style.getPropertyValue('z-index');
      const deltaX0 =  left0 - event.pageX;
      const deltaY0 = top0 - event.pageY;

      document.onmousemove = function(e) {
        e.preventDefault();

        elem.style.cssText = `
          left: ${e.pageX + deltaX0}px;
          top: ${e.pageY + deltaY0}px;
          z-index: 10;
        `;
      };

      elem.onmouseup = function(e) {
        e.preventDefault();

        elem.style.cssText = `
          left: ${left0}px;
          top: ${top0}px;
          z-index: ${zIndex0};
        `;

        document.onmousemove = null;
        elem.onmouseup = null;
      };
    });
  }
}

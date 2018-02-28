import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pazzle',
  templateUrl: './pazzle.component.html',
  styleUrls: ['./pazzle.component.scss']
})
export class PazzleComponent implements OnInit {

  private dragablePieces: HTMLElement[] = [];
  private dropTargets: HTMLElement[] = [];
  private elemBelow: HTMLElement | undefined;
  private elemBelowPieceN: string | undefined;

  constructor() {}

  ngOnInit() {
    this.getDropTargets();
    this.createDragablePieces();
  }

  getDropTargets() {
    this.dropTargets = <HTMLElement[]>[].slice.call(document.querySelectorAll(`.js-drop-target`));

  }

  createDragablePieces() {
    this.dragablePieces = <HTMLElement[]>[].slice.call(document.querySelectorAll(`.js-dragable-box`));
    this.randomDragablePieces();

    this.dragablePieces.forEach( (piece) => this.dragDrop(piece));
  }

  randomDragablePieces() {
    const elWidth = this.dragablePieces[0].offsetWidth;
    this.dragablePieces.forEach(piece => piece.style.cssText = randomizePieces());

    function randomizePieces() {
      return `
        left: ${Math.floor( 2 * elWidth * Math.random() )}px;
        top: ${ Math.floor( (250 - elWidth) * Math.random() )}px;
        z-index: ${ Math.floor( 10 * Math.random() )};
      `;
    }
  }

  dragDrop(dragableElem) {
    dragableElem.addEventListener('mousedown', (event: MouseEvent) => {
      const body = document.querySelector('body');
      const style = window.getComputedStyle(dragableElem);
      const left0 = parseInt(style.getPropertyValue('left'), 10);
      const top0 = parseInt(style.getPropertyValue('top'), 10);
      const zIndex0 = style.getPropertyValue('z-index');
      const deltaX0 =  left0 - event.pageX;
      const deltaY0 = top0 - event.pageY;

      dragableElem.style.zIndex = 9999;

      document.onmousemove = (e) => {
        move(e);

        // achieve element below dragable
        dragableElem.style.visibility = 'hidden';
        this.elemBelow = <HTMLElement>document.elementFromPoint(e.clientX, e.clientY);
        dragableElem.style.visibility = 'visible';

        this.elemBelowPieceN = this.elemBelow.dataset.piece;
        // hover
        this.unhoverAllDropTargets();
        if (this.elemBelow.classList.contains('js-drop-target')) {
          this.elemBelow.style.backgroundColor = 'rgba(100, 100, 100, 0.5)';
        }
      };

      // prevent mouseleave the dragable element
      body.onmouseleave = (e) => {
        cancelMove(e);
        removeMouseEvents();
      };

      dragableElem.onmouseup = (e) => {
        if (dragableElem.dataset.piece === this.elemBelowPieceN) {
          this.elemBelow.appendChild(dragableElem);
        }

        this.elemBelow = undefined;
        cancelMove(e);
        this.unhoverAllDropTargets();
        removeMouseEvents();
      };

      function move(e) {
        e.preventDefault();

        dragableElem.style.cssText = `
          left: ${e.pageX + deltaX0}px;
          top: ${e.pageY + deltaY0}px;
          z-index: 9999;
        `;
      }

      function cancelMove(e) {
        e.preventDefault();

        dragableElem.style.cssText = `
          left: ${left0}px;
          top: ${top0}px;
          z-index: zIndex0;
        `;
      }

      function removeMouseEvents() {
        body.onmouseleave = null;
        document.onmousemove = null;
        dragableElem.onmouseup = null;
      }
    });
  }

  unhoverAllDropTargets() {
    this.dropTargets.forEach(dropTarget => dropTarget.style.backgroundColor = 'rgba(100, 100, 100, 1)');
  }

}
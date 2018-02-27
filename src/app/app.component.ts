import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private piece1: HTMLElement;
  private piece2: HTMLElement;
  private piece3: HTMLElement;
  private piece4: HTMLElement;
  private piece5: HTMLElement;
  private piece6: HTMLElement;
  private piece7: HTMLElement;
  private piece8: HTMLElement;
  private piece9: HTMLElement;

  constructor() {}

  ngOnInit() {
    this.piece1 = <HTMLElement>document.querySelector('.js-piece-1');
    this.piece2 = <HTMLElement>document.querySelector('.js-piece-2');
    this.piece3 = <HTMLElement>document.querySelector('.js-piece-3');
    this.piece4 = <HTMLElement>document.querySelector('.js-piece-4');
    this.piece5 = <HTMLElement>document.querySelector('.js-piece-5');
    this.piece6 = <HTMLElement>document.querySelector('.js-piece-6');
    this.piece7 = <HTMLElement>document.querySelector('.js-piece-7');
    this.piece8 = <HTMLElement>document.querySelector('.js-piece-8');
    this.piece9 = <HTMLElement>document.querySelector('.js-piece-9');

    this.piece1.style.cssText = `left: 10px; top: 10px`;
    this.piece2.style.cssText = `left: 20px; top: 20px`;
    this.piece3.style.cssText = `left: 30px; top: 30px`;
    this.piece4.style.cssText = `left: 40px; top: 40px`;
    this.piece5.style.cssText = `left: 50px; top: 50px`;
    this.piece6.style.cssText = `left: 60px; top: 60px`;
    this.piece7.style.cssText = `left: 70px; top: 70px`;
    this.piece8.style.cssText = `left: 80px; top: 80px`;
    this.piece9.style.cssText = `left: 90px; top: 90px`;

    this.dragDrop(this.piece1);
  }

  dragDrop(elem) {
    console.log(elem);

    elem.addEventListener('mousedown', function(event) {
      const style = window.getComputedStyle(elem);

      const left0 = parseInt(style.getPropertyValue('left'), 10);
      const top0 = parseInt(style.getPropertyValue('top'), 10);

      const deltaX0 =  left0 - event.pageX;
      const deltaY0 = top0 - event.pageY;

      // $(".js-iframe-container").children(".js-iframe").css( "zIndex", -2 );
      // $(".js-iframe-container").children(".js-deleteFrame").css( "zIndex", -2 );
      // over the rest
      // $(elem).children(".js-iframe").css( "zIndex", -1 );
      // $(elem).children(".js-deleteFrame").css( "zIndex", -1 );
/*
      document.onmousemove = function(e) {
        e.preventDefault();
        moveAt(e);
      };

      elem.onmouseup = function() {
        e.preventDefault();
        document.onmousemove = null;
        elem.onmouseup = null;
      };

      function moveAt(e) {
        $(elem).css({
          'left': e.pageX + deltaX0 + 'px',
          'top': e.pageY + deltaY0 + 'px'
        });
      }
*/
    });
  }
}

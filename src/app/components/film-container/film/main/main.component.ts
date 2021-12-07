import { Component, OnInit } from '@angular/core';
import { CFilmService } from '../../../../services/components/c-film.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private cFilmService: CFilmService) {}

  index() {
    this.cFilmService.loadIndex();
  }
  ngOnInit(): void {
    const imagines: string[] = [
      'assets/img/carrucel/fondo_1.jpg',
      'assets/img/carrucel/fondo_2.jpg',
      'assets/img/carrucel/fondo_3.jpg',
      'assets/img/carrucel/fondo_4.jpg',
    ];
    var containerCarrucel: any = document.getElementById('container_carrucel');
    var position: number = 0;
    function createImagines() {
      for (var i: number = 0; i < imagines.length; i++) {
        var section: any = document.createElement('section');
        // section.classList.add('filter', 'blur-md', 'contrast-200');
        section.id = `section_${i}`;
        containerCarrucel.appendChild(section);
        var img: any = document.createElement('img');
        img.className =
          'hidden invisible m-auto object-none max-w-2xl max-h-60';
        img.src = imagines[i];
        section.appendChild(img);
      } // filter blur-md contrast-200
      var sections: any = containerCarrucel.querySelectorAll('section');
      var section: any = sections[0];
      var img: any = section.querySelector('img');
      img.classList.remove('hidden', 'invisible');
      img.classList.add('block', 'visible');
    }

    function changeSlide(): void {
      var sections: any = containerCarrucel.querySelectorAll('section');

      if (position === sections.length - 1) {
        var section: any = sections[0];
        var img: any = section.querySelector('img');
        img.classList.remove('hidden', 'invisible');
        img.classList.add('block', 'visible');

        var section: any = sections[sections.length - 1];
        var img: any = section.querySelector('img');
        img.classList.remove('block', 'visible');
        img.classList.add('hidden', 'invisible');

        position = 0;
      } else {
        var section: any = sections[position];
        var img: any = section.querySelector('img');
        img.classList.remove('block', 'visible');
        img.classList.add('hidden', 'invisible');

        var section: any = sections[position + 1];
        var img: any = section.querySelector('img');
        img.classList.remove('hidden', 'invisible');
        img.classList.add('block', 'visible');

        position++;
      }
    }

    function showSlide(time: number): void {
      setInterval(changeSlide, time);
    }

    async function createCarrucel(): Promise<any> {
      return await createImagines();
    }

    showSlide(500);
    createCarrucel();
  }
}

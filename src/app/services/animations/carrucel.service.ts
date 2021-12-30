import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Films } from 'src/app/models/films.interface';
import { FilmsService } from '../db/films.service';

@Injectable({
  providedIn: 'root',
})
export class CarrucelService {
  api_domain: string;
  constructor(private filmsService: FilmsService) {
    this.api_domain = environment.api_domain;
  }
  carrucel(): void {
    var imagines: string[] = [];

    var containerCarrucel: any = document.getElementById('container_carrucel');
    containerCarrucel.className = 'relative ';
    var position: number = 0;
    function createImagines() {
      var sectionContainer: any = document.createElement('section');
      sectionContainer.id = `section_container`;
      sectionContainer.className = 'relative ';
      containerCarrucel.appendChild(sectionContainer);

      var sectionBack: any = document.createElement('section');
      sectionBack.id = `section_back`;
      sectionBack.className =
        'hidden invisible saturate-200 relative sm:p-9 h-40 sm:h-425 ';
      sectionContainer.appendChild(sectionBack);

      var section: any = document.createElement('section');
      section.id = `section_slide`;
      section.className =
        'hidden invisible absolute opacity-90 -top-0 sm:p-9 h-40 sm:h-425 w-full';
      sectionContainer.appendChild(section);

      var img: any = document.createElement('img');
      var imgBack: any = document.createElement('img');

      imgBack.className =
        'hidden invisible object-cover relative h-full w-full filter saturate-150 blur-lg ';
      img.className = 'hidden invisible object-cover relative h-full w-full ';

      img.src = imagines[imagines.length - 1];
      imgBack.src = imagines[imagines.length - 1];

      sectionBack.appendChild(imgBack);
      section.appendChild(img);

      if (imagines.length == 1) {
        var img: any = section.querySelector('img');
        section.classList.remove('hidden', 'invisible');
        section.classList.add('block', 'visible');
        img.classList.remove('hidden', 'invisible');
        img.classList.add('block', 'visible');

        var img: any = sectionBack.querySelector('img');
        sectionBack.classList.remove('hidden', 'invisible');
        sectionBack.classList.add('block', 'visible');
        img.classList.remove('hidden', 'invisible');
        img.classList.add('block', 'visible');
      }
    }

    function changeSlidesSections(element: string, id: string): void {
      var sections: any = containerCarrucel.querySelectorAll(
        `${element} #${id}`
      );
      if (position + 1 === sections.length) {
        var section: any = sections[0];
        section.classList.remove('hidden', 'invisible');
        section.classList.add('block', 'visible', 'sm:p-9');

        var img: any = section.querySelector('img');
        img.classList.remove('hidden', 'invisible');
        img.classList.add('block', 'visible');

        if (position != 0) {
          var section: any = sections[position];
          section.classList.add('hidden', 'invisible');
          section.classList.remove('block', 'visible', 'sm:p-9');

          var img: any = section.querySelector('img');
          img.classList.remove('block', 'visible');
          img.classList.add('hidden', 'invisible');

          position = 0;
        }
      } else {
        var section: any = sections[position];
        section.classList.remove('sm:p-9');
        section.classList.add('hidden', 'invisible');
        section.classList.remove('block', 'visible', 'sm:p-9');

        var img: any = section.querySelector('img');
        img.classList.remove('block', 'visible');
        img.classList.add('hidden', 'invisible');

        position = sections.length != 0 ? (position += 1) : position;

        var section: any = sections[position];
        section.classList.remove('hidden', 'invisible');
        section.classList.add('block', 'visible', 'sm:p-9');

        var img: any = section.querySelector('img');
        img.classList.remove('hidden', 'invisible');
        img.classList.add('block', 'visible');
      }
    }

    function changeSlide(): void {
      let sharePosition: number = position;
      changeSlidesSections('section', 'section_slide');
      position = sharePosition;
      changeSlidesSections('section', 'section_back');
    }
    function showSlide(time: number): void {
      setInterval(changeSlide, time);
    }

    async function createCarrucel(): Promise<any> {
      return await createImagines();
    }

    this.filmsService.getAllFilms().subscribe((data: any) => {
      if (data['data'].length != 0) {
        data['data'].forEach((film: Films) => {
          imagines[imagines.length] = this.api_domain + film.cover_page_url;
          createCarrucel();
        });
        showSlide(1500);
      }
    });
  }
}

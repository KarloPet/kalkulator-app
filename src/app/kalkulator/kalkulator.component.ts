import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { cjenik, CiscenjeTip } from '../cjenik'
import { dodatneUslugeCjenik } from '../dodatneUsluge';
import { lokacijeCjenik } from '../lokacije';

@Component({
  selector: 'app-kalkulator',
  imports: [FormsModule, CommonModule],
  templateUrl: './kalkulator.component.html',
  styleUrl: './kalkulator.component.css',
  standalone: true
})
export class KalkulatorComponent {



  
  cijena: number | null = null;

  vrsteNekretnina = [
    'APARTMAN',
    'KUĆA ZA ODMOR',
    'VILA',
    'STUDIO',
    'GARSONIJERA',
    'SOBA',
    'KUĆANSTVO SA UKUĆANIMA',
    'KAMP/MONTAŽNA KUĆICA',
    'POSLOVNI PROSTORI',
    'ČIŠĆENJE NAKON RADOVA'
  ];

  vrsteCiscenja = [
    'OSNOVNO',
    'OSNOVNO/NAKON GOSTIJU',
    'GENERALNO'
  ];

  lokacije = Object.entries(lokacijeCjenik).map(([naziv, cijena]) => ({
    naziv,
    cijena
  }));


  forma = {
    vrstaNekretnine: '',
    kvadratura: null,
    vrstaCiscenja: '',
    dodatno: {
      towelArt: false,
      poklonPaketi: false,
      deluxePaketiZaGoste: false,
      setPosteljine: false,
      prozori: false,

      brojKrevetaTowelArt: null,
      brojSetovaPosteljine: null,
      povrsinaProzora: null,
      brojPoklonPaketa: null,
      brojDeluxePaketZaGoste: null
    }
  }

  isNaUpit(): boolean {
    return this.forma.vrstaNekretnine === 'POSLOVNI PROSTORI';
  }

  getVrsteCiscenja(): string[] {
    const gostOpcije = [
      'APARTMAN',
      'KUĆA ZA ODMOR',
      'VILA',
      'STUDIO',
      'GARSONIJERA',
      'SOBA'
    ];

    if (gostOpcije.includes(this.forma.vrstaNekretnine)) {
      return ['OSNOVNO/NAKON GOSTIJU', 'GENERALNO'];
    }

    return ['OSNOVNO', 'GENERALNO'];
  }


  izracunaj() {

    if (!this.forma.vrstaNekretnine || !this.forma.kvadratura || !this.forma.vrstaCiscenja) {
      alert('Molimo unesite sve osnovne informacije.');
      return;
    }

    const { vrstaNekretnine, kvadratura, vrstaCiscenja, dodatno } = this.forma;

    if (!kvadratura) {
      console.warn('Kvadratura nije unesena');
      return;
    }
    
    

    const cijenaPoM2 = this.getCijenaPoM2(vrstaNekretnine, kvadratura, vrstaCiscenja);
    if (cijenaPoM2 === null) {
      console.warn('Nema definirane cijene za ovu kombinaciju.');
      return;
    }

    let ukupno = kvadratura * cijenaPoM2;


    const poljaUsluga = [
      {
        uvjet: this.forma.dodatno.towelArt,
        kolicina: this.forma.dodatno.brojKrevetaTowelArt,
        poruka: 'Unesite broj kreveta za Towel Art.',
        cijena: dodatneUslugeCjenik.towelArt.cijena
      },
      {
        uvjet: this.forma.dodatno.setPosteljine,
        kolicina: this.forma.dodatno.brojSetovaPosteljine,
        poruka: 'Unesite broj setova posteljine.',
        cijena: dodatneUslugeCjenik.setPosteljine.cijena
      },
      {
        uvjet: this.forma.dodatno.poklonPaketi,
        kolicina: this.forma.dodatno.brojPoklonPaketa,
        poruka: 'Unesite broj poklon paketa.',
        cijena: dodatneUslugeCjenik.poklonPaketi.cijena
      },
      {
        uvjet: this.forma.dodatno.deluxePaketiZaGoste,
        kolicina: this.forma.dodatno.brojDeluxePaketZaGoste,
        poruka: 'Unesite broj deluxe paketa za goste.',
        cijena: dodatneUslugeCjenik.deluxePaketiZaGoste.cijena
      },
      {
        uvjet: this.forma.dodatno.prozori,
        kolicina: this.forma.dodatno.povrsinaProzora,
        poruka: 'Unesite površinu prozora.',
        cijena: dodatneUslugeCjenik.prozori.cijena
      }
    ];

    for (const usluga of poljaUsluga) {
      if (usluga.uvjet) {
        if (!usluga.kolicina) {
          alert(usluga.poruka);
          return;
        }
        ukupno += usluga.kolicina * usluga.cijena;
      }
    }
    this.cijena = Math.round(ukupno * 100) / 100;
    console.log('DODATNO:', dodatno);
  }

  onVrstaNekretnineChange() {
    console.log('Odabrano:', this.forma.vrstaNekretnine);
  }

  getCijenaPoM2(vrsta: string, kvadratura: number, ciscenje: string): number | null {
    const podatak = cjenik[vrsta];
    if (!podatak) return null;

    const tip = ciscenje.toUpperCase() as CiscenjeTip;

    if (podatak.do && kvadratura <= podatak.do) {
      return podatak.cijene[tip] ?? null;
    }

    if (podatak.iznad && podatak.iznad.cijene) {
      return podatak.iznad.cijene[tip] ?? null;
    }

    return null;
  }

  resetirajFormu() {
    this.forma = {
      vrstaNekretnine: '',
      kvadratura: null,
      vrstaCiscenja: '',
      dodatno: {
        towelArt: false,
        poklonPaketi: false,
        setPosteljine: false,
        prozori: false,
        deluxePaketiZaGoste: false,
        brojKrevetaTowelArt: null,
        brojSetovaPosteljine: null,
        povrsinaProzora: null,
        brojPoklonPaketa: null,
        brojDeluxePaketZaGoste: null,
      }
    };
    this.cijena = null;
  }
}



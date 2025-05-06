import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {cjenik, CiscenjeTip} from '../cjenik'
import { dodatneUslugeCjenik } from '../dodatneUsluge';

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


  forma = {
    vrstaNekretnine: '',
    kvadratura: null,
    vrstaCiscenja: '',
    dodatno: {
      towelArt: false,
      poklonPaketi: false,
      setPosteljine: false,
      prozori: false,

      brojKrevetaTowelArt: null,
      brojSetovaPosteljine: null,
      povrsinaProzora: null,
      brojPoklonPaketa: null
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
      return ['OSNOVNO/NAKON GOSTIJU','GENERALNO'];
    }
  
    return ['OSNOVNO','GENERALNO'];
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
  
    if (this.forma.dodatno.towelArt && !this.forma.dodatno.brojKrevetaTowelArt) {
      alert('Unesite broj kreveta za Towel Art.');
      return;
    }
    if (this.forma.dodatno.setPosteljine && !this.forma.dodatno.brojSetovaPosteljine) {
      alert('Unesite broj setova posteljine.');
      return;
    }
    if (this.forma.dodatno.poklonPaketi && !this.forma.dodatno.brojPoklonPaketa) {
      alert('Unesite broj poklon paketa.');
      return;
    }
    if (this.forma.dodatno.prozori && !this.forma.dodatno.povrsinaProzora) {
      alert('Unesite površinu prozora.');
      return;
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
  
  
}


import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {Router} from "@angular/router";
declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css']
})
export class StudentiComponent implements OnInit {

  title:string = 'angularFIT2';
  ime_prezime:string = '';
  opstina: string = '';
  studentPodaci: any;
  filter_ime_prezime: boolean;
  filter_opstina: boolean;
  otvori: any=false;
odabraniStudent:any;
objekat_proslijedi:any;
   opstinePodaci: any;

  constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  testirajWebApi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Student/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.studentPodaci = x;
    });
  }
  SpasiStudent() :void
  {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Student/Snimi",this.odabraniStudent, MojConfig.http_opcije()).subscribe(x=>{
    this.testirajWebApi();
    this.odabraniStudent=null;
    });
  }
  getOpstine() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Opstina/GetByAll", MojConfig.http_opcije()).subscribe(x=>{
      this.opstinePodaci = x;
    });
  }
  getStudenti()
  {
    if(this.studentPodaci==null)
      return [];
    return this.studentPodaci.filter((x:any)=>
      (!this.filter_ime_prezime || (x.ime+" "+x.prezime).startsWith(this.ime_prezime)
      || (x.prezime+" "+x.ime).startsWith(this.ime_prezime))
      && (!this.filter_opstina || (x.opstina_rodjenja.description).startsWith(this.opstina))
    );
  }

  ngOnInit(): void {
    this.testirajWebApi();
    this.getOpstine();
  }
otvoriEdit(s:any){
    this.odabraniStudent=s;
   /* this.objekat_proslijedi={
      student:this.odabraniStudent,
    }*/
}
dodaj(){
    this.odabraniStudent={
      id:0,
      ime:"",
      prezime:"",
      opstina_rodjenja_id:2,
    }
   /* this.objekat_proslijedi={
      student:this.odabraniStudent,
    }*/
}

  otvoriMaticnu(s:any) {
    this.router.navigate(['student-maticnaknjiga',s.id]);
  }
  brisiStudenta(s:any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Student/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((a:any) =>{
        const index = this.studentPodaci.indexOf(s);
        if (index > -1) {
          this.studentPodaci.splice(index, 1);
        }
      });
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Student/GetAll",MojConfig.http_opcije()).subscribe(x=>{
      this.studentPodaci = x;
    });
    alert("Odabrani student je obrisan!");
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {AutentifikacijaHelper} from "../_helpers/autentifikacija-helper";
import {DatePipe} from "@angular/common";

declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-student-maticnaknjiga',
  templateUrl: './student-maticnaknjiga.component.html',
  styleUrls: ['./student-maticnaknjiga.component.css']
})
export class StudentMaticnaknjigaComponent implements OnInit {
   studentId: any;
   upisaneGodinePodaci: any;
  upisGodine: any;
   akademskePodaci: any;
   ovjera: any;
imePrezime:any;
ime:any;
prezime:any;
  constructor(private httpKlijent: HttpClient, private route: ActivatedRoute,private datePipe:DatePipe) {}
  datum:any=this.datePipe.transform(new Date(),"yyyy-MM-dd");
  ovjeriLjetni(s:any) {

  }

  upisLjetni(s:any) {

  }

  ovjeriZimski(s:any) {

  }
  getupisaneGodine()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Maticna/GetByStudentId?studentId="+this.studentId, MojConfig.http_opcije()).subscribe(x=>{
      this.upisaneGodinePodaci = x;
    });
  }
  getImePrezime()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Student/GetImePrezime?studentId="+this.studentId, MojConfig.http_opcije()).subscribe(x=>{
      this.imePrezime = x;
      this.ime=this.imePrezime[0].ime;
      this.prezime=this.imePrezime[0].prezime;
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.studentId=+params['id'];
    });
    this.getImePrezime();
    this.getakademske();
    this.getupisaneGodine();
  }
  getakademske() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/AkademskeGodine/GetAll_ForCmb", MojConfig.http_opcije()).subscribe(x=>{
      this.akademskePodaci = x;
    });
  }
  pripremiUpisGodina() {
    this.upisGodine={
      id:0,
      datumUpisa:this.datum,
      skolarina:0,
      akademskaGodinaId:2,
      obnova:false,
      godinaStudija:1,
      studentId:this.studentId,
      korisnickiNalogId:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalogId,
      korisnickiNalogIme:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.korisnickoIme,
    }
  }
  pripremiOvjeru(s:any) {
    this.ovjera={
      upisanaGodinaId:s.id,
      datumOvjere:this.datum,
      napomena:"",

    }
  }
  SpasiUpisGodina() {
    for(let i=0;i<this.upisaneGodinePodaci.length;i++){
      if(/*this.upisaneGodinePodaci[i].studentId==this.studentId */
      this.upisaneGodinePodaci[i].godinaStudija==this.upisGodine.godinaStudija &&
      this.upisGodine.obnova==false){
        this.upisGodine=null;
        porukaError("Neuspjesno.");
        return;
      }
    }
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Maticna/Snimi",this.upisGodine, MojConfig.http_opcije()).subscribe(x=>{
     this.getupisaneGodine();
     this.upisGodine=null;
    });
    porukaSuccess("uspjelo");
  }
  SpasiOvjera() {

    this.httpKlijent.post(MojConfig.adresa_servera+ "/Maticna/AddOvjera",this.ovjera, MojConfig.http_opcije()).subscribe(x=>{
      this.getupisaneGodine();
      this.ovjera=null;
    });
    porukaSuccess("uspjelo");
  }


}

import { Component, OnInit } from '@angular/core';
import {MojConfig} from "../../moj-config";
import{HttpClient} from "@angular/common/http";
import {Input} from "@angular/core";

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
opstinePodaci:any;
  student: any;
  @Input() proslijedi:any;
   studentPodaci: any;
  constructor(private httpKlijent:HttpClient) { }
  opstine() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Opstina/GetByAll", MojConfig.http_opcije()).subscribe(x=>{
      this.opstinePodaci = x;
    });
  }
  testirajWebApi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Student/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.studentPodaci = x;
    });
  }
  ngOnInit(): void {
    this.testirajWebApi();
    this.opstine();
  }

  spasi() {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Student/Snimi",this.proslijedi.student, MojConfig.http_opcije()).subscribe(x=>{
      this.testirajWebApi();
      this.proslijedi.student=null;
    });
  }
}

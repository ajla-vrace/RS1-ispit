using FIT_Api_Examples.Data;
using FIT_Api_Examples.Modul3_MaticnaKnjiga.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FIT_Api_Examples.Modul2.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class MaticnaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public MaticnaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public class MaticnaAddOvjeraVM
        {
            public int UpisanaGodinaId { get; set; }
            public DateTime DatumOvjere { get; set; }
            public string Napomena { get; set; }
        }
            public class MaticnaAddVM
        {
            public int Id { get; set; }
            public DateTime DatumUpisa { get; set; }
            public float Skolarina { get; set; }
            public bool Obnova { get; set; }
            
            public int GodinaStudija { get; set; }
            
            public int StudentId { get; set; }
            public int AkademskaGodinaId { get; set; }
            public int KorisnickiNalogId { get; set; }
        }


        [HttpPost]
        public ActionResult Snimi([FromBody] MaticnaAddVM x)
        {
            UpisanaGodina? upisanaGodina;
            var podaci = _dbContext.UpisanaGodina
                .Where(s => s.StudentID == x.StudentId).ToList();
            if (podaci != null)
            {
                for (int i = 0; i < podaci.Count; i++)
                {
                    if (podaci[i].GodinaStudija == x.GodinaStudija
                        && x.Obnova == false)
                    {
                        return BadRequest("ne moze");
                    }
                }

            }
            
            upisanaGodina=new UpisanaGodina();
            //bitno
            _dbContext.Add(upisanaGodina);
            upisanaGodina.DatumUpisa = DateTime.Now;
            upisanaGodina.Skolarina = x.Skolarina;
            upisanaGodina.Obnova = x.Obnova;
            upisanaGodina.GodinaStudija = x.GodinaStudija;
            upisanaGodina.StudentID = x.StudentId;
            upisanaGodina.AkademskaGodinaId = x.AkademskaGodinaId;
            upisanaGodina.KorisnickiNalogId = x.KorisnickiNalogId;

            _dbContext.SaveChanges();
            return Ok(upisanaGodina);

        }
        [HttpPost]
        public ActionResult AddOvjera([FromBody] MaticnaAddOvjeraVM x)
        {
            UpisanaGodina? upisanaGodina=_dbContext.UpisanaGodina.Find(x.UpisanaGodinaId);
            if (upisanaGodina == null)
            {
                return BadRequest("ne moze");
            }
            
            upisanaGodina.DatumOvjere = DateTime.Now;
            upisanaGodina.Napomena = x.Napomena;
 

            _dbContext.SaveChanges();
            return Ok(upisanaGodina);

        }
        [HttpGet]
        public ActionResult GetByStudentId(int studentId)
        {
            var data = _dbContext.UpisanaGodina
                .Where(s => s.StudentID == studentId).
                Select(s => new
                {
                    datumUpisa = s.DatumUpisa,
                    datumOvjere = s.DatumOvjere,
                    skolarina = s.Skolarina,
                    id = s.Id,
                    obnova = s.Obnova,
                    napomena = s.Napomena,
                    godinaStudija = s.GodinaStudija,
                    studentId = s.StudentID,
                    akademskaGodinaId = s.AkademskaGodinaId,
                    akademskaGodinaOpis = s.AkademskaGodina.opis,
                    korisnickiNalogId = s.KorisnickiNalogId,
                    korisnickiNalogIme=s.KorisnickiNalog.korisnickoIme,
                    
                });
                
            return Ok(data);
        }
    }
}

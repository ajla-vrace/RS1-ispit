using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FIT_Api_Examples.Data;
using FIT_Api_Examples.Helper;
using FIT_Api_Examples.Helper.AutentifikacijaAutorizacija;
using FIT_Api_Examples.Modul0_Autentifikacija.Models;
using FIT_Api_Examples.Modul2.Models;
using FIT_Api_Examples.Modul2.ViewModels;
using FIT_Api_Examples.Modul3_MaticnaKnjiga.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FIT_Api_Examples.Modul2.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public StudentController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        [HttpPost]
        public Student Snimi([FromBody] StudentAddVM x)
        {
            Student? student;
            if (x.Id == 0)
            {
                student = new Student();
                _dbContext.Add(student);
                student.ime = x.ime;
                student.prezime = x.prezime;
                student.opstina_rodjenja_id = x.opstina_rodjenja_id;
                student.broj_indeksa = "BrojIndeks";
                student.created_time = DateTime.Now;
            }
            else
            {
                student = _dbContext.Student.Find(x.Id);
                student.ime = x.ime;
                student.prezime = x.prezime;
                student.opstina_rodjenja_id = x.opstina_rodjenja_id;
            }
            _dbContext.SaveChanges();
            return student;
        }

        [HttpGet]
        public ActionResult<List<Student>> GetAll(string ime_prezime)
        {
            var data = _dbContext.Student
                .Include(s => s.opstina_rodjenja.drzava)
                .Where(x => ime_prezime == null || (x.ime + " " + x.prezime).StartsWith(ime_prezime) || (x.prezime + " " + x.ime).StartsWith(ime_prezime))
                .OrderByDescending(s => s.id)
                .AsQueryable();
            return data.Take(100).ToList();
        }

        [HttpGet]
        public ActionResult GetImePrezime(int studentId)
        {
            var data = _dbContext.Student
                .Where(s => s.id == studentId).Select(
                s => new
                {
                    ime = s.ime,
                    prezime = s.prezime,
                });
            return Ok(data);
        }

    }
}

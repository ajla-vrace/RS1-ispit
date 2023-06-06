using FIT_Api_Examples.Modul0_Autentifikacija.Models;
using FIT_Api_Examples.Modul2.Models;
using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIT_Api_Examples.Modul3_MaticnaKnjiga.Models
{
    public class UpisanaGodina
    {
        public int Id { get; set; }
        public DateTime DatumUpisa { get; set; }
        public float Skolarina { get; set; }
        public bool Obnova { get; set; }
        public DateTime? DatumOvjere { get; set; }
        public int GodinaStudija { get; set; }
        public string? Napomena { get; set; }




        [ForeignKey(nameof(StudentID))]
        public Student Student { get; set; }
        public int StudentID { get; set; }
        [ForeignKey(nameof(AkademskaGodinaId))]
        public AkademskaGodina AkademskaGodina { get; set; }
        public int AkademskaGodinaId { get; set; }
        [ForeignKey(nameof(KorisnickiNalogId))]
        public KorisnickiNalog KorisnickiNalog { get; set; }
        public int KorisnickiNalogId { get; set; }
    }
}

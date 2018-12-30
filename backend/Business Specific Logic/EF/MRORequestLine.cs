using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("MRORequestLine")]
    public class MRORequestLine : BaseEntity
    {
        public MRORequestLine()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<

        }

        [Key]
        public int MRORequestLineKey { get; set; }

        public override int id { get { return MRORequestLineKey; } set { MRORequestLineKey = value; } }

        ///Start:Generated:Properties<<<
        public decimal Quantity { get; set; }
        public decimal Balance { get; set; }
        public string Status { get; set; }
        public decimal Cost { get; set; }
        public int MRORequestKey { get; set; }
        [ForeignKey("MRORequestKey")]
        public MRORequest MRORequest { get; set; }
        public int? CatMaterialKey { get; set; }
        [ForeignKey("CatMaterialKey")]
        public CatMaterial CatMaterial { get; set; }
        ///End:Generated:Properties<<<
    }
}

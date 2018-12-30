using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("CatMaterial")]
    public class CatMaterial : BaseEntity
    {
        public CatMaterial()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<

        }

        [Key]
        public int CatMaterialKey { get; set; }

        public override int id { get { return CatMaterialKey; } set { CatMaterialKey = value; } }

        ///Start:Generated:Properties<<<
        public string Value { get; set; }
        public string MaterialDescription { get; set; }
        public string MaterialRevision { get; set; }
        public decimal? Min { get; set; }
        public decimal? Max { get; set; }
        public string MaterialNumber { get; set; }
        ///End:Generated:Properties<<<
    }
}

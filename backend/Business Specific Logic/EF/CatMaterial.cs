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
        ///End:Generated:Properties<<<
    }
}

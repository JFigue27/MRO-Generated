using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("CatArea")]
    public class CatArea : BaseEntity
    {
        public CatArea()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<

        }

        [Key]
        public int CatAreaKey { get; set; }

        public override int id { get { return CatAreaKey; } set { CatAreaKey = value; } }

        ///Start:Generated:Properties<<<
        public string Value { get; set; }
        ///End:Generated:Properties<<<
    }
}

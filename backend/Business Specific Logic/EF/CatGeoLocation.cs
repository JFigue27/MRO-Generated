using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("CatGeoLocation")]
    public class CatGeoLocation : BaseEntity
    {
        public CatGeoLocation()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<

        }

        [Key]
        public int CatGeoLocationKey { get; set; }

        public override int id { get { return CatGeoLocationKey; } set { CatGeoLocationKey = value; } }

        ///Start:Generated:Properties<<<
        ///End:Generated:Properties<<<
    }
}

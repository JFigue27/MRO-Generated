using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("CatVendor")]
    public class CatVendor : BaseEntity
    {
        public CatVendor()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<

        }

        [Key]
        public int CatVendorKey { get; set; }

        public override int id { get { return CatVendorKey; } set { CatVendorKey = value; } }

        ///Start:Generated:Properties<<<
        public string Value { get; set; }
        public string VendorNumber { get; set; }
        ///End:Generated:Properties<<<
    }
}

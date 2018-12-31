using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("InventoryInput")]
    public class InventoryInput : BaseEntity
    {
        public InventoryInput()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<

        }

        [Key]
        public int InventoryInputKey { get; set; }

        public override int id { get { return InventoryInputKey; } set { InventoryInputKey = value; } }

        ///Start:Generated:Properties<<<
        public decimal Quantity { get; set; }
        public string Notes { get; set; }
        public decimal Balance { get; set; }
        public int InventoryInputDocKey { get; set; }
        [ForeignKey("InventoryInputDocKey")]
        public InventoryInputDoc InventoryInputDoc { get; set; }
        public int? CatMaterialKey { get; set; }
        [ForeignKey("CatMaterialKey")]
        public CatMaterial CatMaterial { get; set; }
        public int? CatGeoLocationKey { get; set; }
        [ForeignKey("CatGeoLocationKey")]
        public CatGeoLocation CatGeoLocation { get; set; }
        ///End:Generated:Properties<<<
    }
}

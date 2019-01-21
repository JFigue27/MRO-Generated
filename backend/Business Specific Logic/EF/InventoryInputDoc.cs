using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("InventoryInputDoc")]
    public class InventoryInputDoc : BaseDocument
    {
        public InventoryInputDoc()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<
            InventoryInputs = new List<InventoryInput>();
        }

        [Key]
        public int InventoryInputDocKey { get; set; }

        public override int id { get { return InventoryInputDocKey; } set { InventoryInputDocKey = value; } }

        ///Start:Generated:Properties<<<
        public string SheetNumber { get; set; }
        public string DocumentType { get; set; }
        public List<InventoryInput> InventoryInputs { get; set; }
        public int? CatVendorKey { get; set; }
        [ForeignKey("CatVendorKey")]
        public CatVendor CatVendor { get; set; }
        ///End:Generated:Properties<<<
    }
}

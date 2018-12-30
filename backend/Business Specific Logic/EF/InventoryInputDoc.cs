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

        }

        [Key]
        public int InventoryInputDocKey { get; set; }

        public override int id { get { return InventoryInputDocKey; } set { InventoryInputDocKey = value; } }

        ///Start:Generated:Properties<<<
        ///End:Generated:Properties<<<
    }
}

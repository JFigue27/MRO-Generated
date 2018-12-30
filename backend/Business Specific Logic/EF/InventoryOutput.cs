using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("InventoryOutput")]
    public class InventoryOutput : BaseEntity
    {
        public InventoryOutput()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<

        }

        [Key]
        public int InventoryOutputKey { get; set; }

        public override int id { get { return InventoryOutputKey; } set { InventoryOutputKey = value; } }

        ///Start:Generated:Properties<<<
        ///End:Generated:Properties<<<
    }
}

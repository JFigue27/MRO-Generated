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
        ///End:Generated:Properties<<<
    }
}

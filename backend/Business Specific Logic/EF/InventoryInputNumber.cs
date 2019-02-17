using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("InventoryInputNumber")]
    public class InventoryInputNumber : BaseEntity
    {
        public InventoryInputNumber()
        {
            ///Start:Generated:Constructor<<<
            CreatedAt = DateTimeOffset.Now;
            ///End:Generated:Constructor<<<

            
        }

        [Key]
        public int InventoryInputNumberKey { get; set; }

        public override int id { get { return InventoryInputNumberKey; } set { InventoryInputNumberKey = value; } }

        ///Start:Generated:Properties<<<
        public DateTimeOffset CreatedAt { get; set; }
        public string GeneratedNumber { get; set; }
        public string Revision { get; set; }
        public int? DuplicatedFrom { get; set; }
        public int Sequence { get; set; }
        public string TaskDescriptionRevisionReason { get; set; }
        ///End:Generated:Properties<<<

        
    }
}

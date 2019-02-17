using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("MRORequestNumber")]
    public class MRORequestNumber : BaseEntity
    {
        public MRORequestNumber()
        {
            ///Start:Generated:Constructor<<<
            CreatedAt = DateTimeOffset.Now;
            ///End:Generated:Constructor<<<

            
        }

        [Key]
        public int MRORequestNumberKey { get; set; }

        public override int id { get { return MRORequestNumberKey; } set { MRORequestNumberKey = value; } }

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

using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("MRORequestLine")]
    public class MRORequestLine : BaseEntity
    {
        public MRORequestLine()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<

        }

        [Key]
        public int MRORequestLineKey { get; set; }

        public override int id { get { return MRORequestLineKey; } set { MRORequestLineKey = value; } }

        ///Start:Generated:Properties<<<
        ///End:Generated:Properties<<<
    }
}

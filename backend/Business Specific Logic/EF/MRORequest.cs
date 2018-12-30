using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("MRORequest")]
    public class MRORequest : BaseDocument
    {
        public MRORequest()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<

        }

        [Key]
        public int MRORequestKey { get; set; }

        public override int id { get { return MRORequestKey; } set { MRORequestKey = value; } }

        ///Start:Generated:Properties<<<
        ///End:Generated:Properties<<<
    }
}

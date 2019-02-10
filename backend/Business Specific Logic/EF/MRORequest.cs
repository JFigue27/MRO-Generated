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
            MRORequestLines = new List<MRORequestLine>();
        }

        [Key]
        public int MRORequestKey { get; set; }

        public override int id { get { return MRORequestKey; } set { MRORequestKey = value; } }

        ///Start:Generated:Properties<<<
        public bool IsNewTool { get; set; }
        public bool IsReplacementTool { get; set; }
        public bool IsChargeTool { get; set; }
        public string Notes { get; set; }
        public int EmployeeKey { get; set; }
        public List<MRORequestLine> MRORequestLines { get; set; }
        ///End:Generated:Properties<<<

        [NotMapped]
        public Employee Employee { get; set; }
    }
}

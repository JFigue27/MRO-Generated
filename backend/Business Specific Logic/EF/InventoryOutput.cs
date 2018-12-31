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
            DateDelivered = DateTimeOffset.Now;
            ///End:Generated:Constructor<<<

        }

        [Key]
        public int InventoryOutputKey { get; set; }

        public override int id { get { return InventoryOutputKey; } set { InventoryOutputKey = value; } }

        ///Start:Generated:Properties<<<
        public decimal QuantityDelivered { get; set; }
        public DateTimeOffset DateDelivered { get; set; }
        public int MRORequestLineKey { get; set; }
        [ForeignKey("MRORequestLineKey")]
        public MRORequestLine MRORequestLine { get; set; }
        public int InventoryInputKey { get; set; }
        [ForeignKey("InventoryInputKey")]
        public InventoryInput InventoryInput { get; set; }
        public int? CatGeoLocationKey { get; set; }
        [ForeignKey("CatGeoLocationKey")]
        public CatGeoLocation CatGeoLocation { get; set; }
        ///End:Generated:Properties<<<
    }
}

using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryOutputLogic : ILogic<InventoryOutput>
    {
        ///Start:Slot:interface<<<///End:Slot:interface<<<
    }

    public class InventoryOutputLogic : Logic<InventoryOutput>, IInventoryOutputLogic
    {
        ///Start:Slot:init<<<///End:Slot:init<<<

        public InventoryOutputLogic(DbContext context, IRepository<InventoryOutput> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///Start:Slot:constructor<<<///End:Slot:constructor<<<
        }

        protected override IQueryable<InventoryOutput> StaticDbQueryForList(IQueryable<InventoryOutput> dbQuery)
        {
            ///Start:Slot:listQuery<<<///End:Slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryOutput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///Start:Slot:beforeSave<<<///End:Slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, InventoryOutput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///Start:Slot:afterSave<<<///End:Slot:afterSave<<<
        }

        ///Start:Slot:logic<<<///End:Slot:logic<<<
    }

}

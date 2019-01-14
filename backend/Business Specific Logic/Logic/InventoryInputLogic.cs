using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryInputLogic : ILogic<InventoryInput>
    {
        ///Start:Slot:interface<<<///End:Slot:interface<<<
    }

    public class InventoryInputLogic : Logic<InventoryInput>, IInventoryInputLogic
    {
        ///Start:Slot:init<<<///End:Slot:init<<<

        public InventoryInputLogic(DbContext context, IRepository<InventoryInput> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///Start:Slot:constructor<<<///End:Slot:constructor<<<
        }

        protected override IQueryable<InventoryInput> StaticDbQueryForList(IQueryable<InventoryInput> dbQuery)
        {
            ///Start:Slot:listQuery<<<///End:Slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryInput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///Start:Slot:beforeSave<<<///End:Slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, InventoryInput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///Start:Slot:afterSave<<<///End:Slot:afterSave<<<
        }

        ///Start:Slot:logic<<<///End:Slot:logic<<<
    }

}

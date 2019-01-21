using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryOutputLogic : ILogic<InventoryOutput>
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class InventoryOutputLogic : Logic<InventoryOutput>, IInventoryOutputLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public InventoryOutputLogic(DbContext context, IRepository<InventoryOutput> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:constructor<<<///end:slot:constructor<<<
        }

        protected override IQueryable<InventoryOutput> StaticDbQueryForList(IQueryable<InventoryOutput> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryOutput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, InventoryOutput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<///end:slot:logic<<<
    }

}

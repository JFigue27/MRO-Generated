using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryInputLogic : ILogic<InventoryInput>
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class InventoryInputLogic : Logic<InventoryInput>, IInventoryInputLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public InventoryInputLogic(DbContext context, IRepository<InventoryInput> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:constructor<<<///end:slot:constructor<<<
        }

        protected override IQueryable<InventoryInput> StaticDbQueryForList(IQueryable<InventoryInput> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryInput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, InventoryInput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<///end:slot:logic<<<
    }

}

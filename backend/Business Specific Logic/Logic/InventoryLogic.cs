using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryLogic : IInventoryInputDocLogic
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class InventoryLogic : InventoryInputDocLogic, IInventoryLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public InventoryLogic(DbContext context, IDocumentRepository<InventoryInputDoc> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:ctor<<<///end:slot:ctor<<<
        }

        protected override IQueryable<InventoryInputDoc> StaticDbQueryForList(IQueryable<InventoryInputDoc> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryInputDoc entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, InventoryInputDoc entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<///end:slot:logic<<<
    }
}
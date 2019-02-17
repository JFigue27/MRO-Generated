using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryInputNumberLogic : ILogic<InventoryInputNumber>
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class InventoryInputNumberLogic : Logic<InventoryInputNumber>, IInventoryInputNumberLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public InventoryInputNumberLogic(DbContext context, IRepository<InventoryInputNumber> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:ctor<<<///end:slot:ctor<<<
        }

        protected override IQueryable<InventoryInputNumber> StaticDbQueryForList(IQueryable<InventoryInputNumber> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryInputNumber entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, InventoryInputNumber entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<///end:slot:logic<<<
    }

}

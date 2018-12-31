using BusinessSpecificLogic.EF;
using Reusable;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryInputLogic : ILogic<InventoryInput>
    {
    }

    public class InventoryInputLogic : Logic<InventoryInput>, IInventoryInputLogic
    {
        public InventoryInputLogic(DbContext context, IRepository<InventoryInput> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
        }

        protected override IQueryable<InventoryInput> StaticDbQueryForList(IQueryable<InventoryInput> dbQuery)
        {
            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryInput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            
        }

        protected override void onAfterSaving(DbContext context, InventoryInput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }
        }
    }

}

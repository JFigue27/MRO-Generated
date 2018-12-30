using BusinessSpecificLogic.EF;
using Reusable;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryOutputLogic : ILogic<InventoryOutput>
    {
    }

    public class InventoryOutputLogic : Logic<InventoryOutput>, IInventoryOutputLogic
    {
        public InventoryOutputLogic(DbContext context, IRepository<InventoryOutput> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
        }

        protected override IQueryable<InventoryOutput> StaticDbQueryForList(IQueryable<InventoryOutput> dbQuery)
        {
            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryOutput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            
        }

        protected override void onAfterSaving(DbContext context, InventoryOutput entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }
        }
    }

}

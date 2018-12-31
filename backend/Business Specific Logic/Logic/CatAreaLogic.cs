using BusinessSpecificLogic.EF;
using Reusable;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface ICatAreaLogic : ILogic<CatArea>
    {
    }

    public class CatAreaLogic : Logic<CatArea>, ICatAreaLogic
    {
        public CatAreaLogic(DbContext context, IRepository<CatArea> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
        }

        protected override IQueryable<CatArea> StaticDbQueryForList(IQueryable<CatArea> dbQuery)
        {
            return dbQuery;
        }

        protected override void onBeforeSaving(CatArea entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            
        }

        protected override void onAfterSaving(DbContext context, CatArea entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }
        }
    }

}

using BusinessSpecificLogic.EF;
using Reusable;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface ICatVendorLogic : ILogic<CatVendor>
    {
    }

    public class CatVendorLogic : Logic<CatVendor>, ICatVendorLogic
    {
        public CatVendorLogic(DbContext context, IRepository<CatVendor> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
        }

        protected override IQueryable<CatVendor> StaticDbQueryForList(IQueryable<CatVendor> dbQuery)
        {
            return dbQuery;
        }

        protected override void onBeforeSaving(CatVendor entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            
        }

        protected override void onAfterSaving(DbContext context, CatVendor entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }
        }
    }

}

using BusinessSpecificLogic.EF;
using Reusable;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface ICatGeoLocationLogic : ILogic<CatGeoLocation>
    {
    }

    public class CatGeoLocationLogic : Logic<CatGeoLocation>, ICatGeoLocationLogic
    {
        public CatGeoLocationLogic(DbContext context, IRepository<CatGeoLocation> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
        }

        protected override IQueryable<CatGeoLocation> StaticDbQueryForList(IQueryable<CatGeoLocation> dbQuery)
        {
            return dbQuery;
        }

        protected override void onBeforeSaving(CatGeoLocation entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            
        }

        protected override void onAfterSaving(DbContext context, CatGeoLocation entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }
        }
    }

}

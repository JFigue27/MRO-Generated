using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface ICatGeoLocationLogic : ILogic<CatGeoLocation>
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class CatGeoLocationLogic : Logic<CatGeoLocation>, ICatGeoLocationLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public CatGeoLocationLogic(DbContext context, IRepository<CatGeoLocation> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:constructor<<<///end:slot:constructor<<<
        }

        protected override IQueryable<CatGeoLocation> StaticDbQueryForList(IQueryable<CatGeoLocation> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(CatGeoLocation entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, CatGeoLocation entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<///end:slot:logic<<<
    }

}

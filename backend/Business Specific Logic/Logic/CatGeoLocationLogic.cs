using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface ICatGeoLocationLogic : ILogic<CatGeoLocation>
    {
        ///Start:Slot:interface<<<///End:Slot:interface<<<
    }

    public class CatGeoLocationLogic : Logic<CatGeoLocation>, ICatGeoLocationLogic
    {
        ///Start:Slot:init<<<///End:Slot:init<<<

        public CatGeoLocationLogic(DbContext context, IRepository<CatGeoLocation> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///Start:Slot:constructor<<<///End:Slot:constructor<<<
        }

        protected override IQueryable<CatGeoLocation> StaticDbQueryForList(IQueryable<CatGeoLocation> dbQuery)
        {
            ///Start:Slot:listQuery<<<///End:Slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(CatGeoLocation entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///Start:Slot:beforeSave<<<///End:Slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, CatGeoLocation entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///Start:Slot:afterSave<<<///End:Slot:afterSave<<<
        }

        ///Start:Slot:logic<<<///End:Slot:logic<<<
    }

}

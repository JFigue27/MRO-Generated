using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BusinessSpecificLogic.Logic
{
    public interface IMRORequestNumberLogic : ILogic<MRORequestNumber>
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class MRORequestNumberLogic : Logic<MRORequestNumber>, IMRORequestNumberLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public MRORequestNumberLogic(DbContext context, IRepository<MRORequestNumber> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:ctor<<<///end:slot:ctor<<<
        }

        protected override IQueryable<MRORequestNumber> StaticDbQueryForList(IQueryable<MRORequestNumber> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(MRORequestNumber entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, MRORequestNumber entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<///end:slot:logic<<<
    }

}

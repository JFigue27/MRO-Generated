using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IMRORequestLineLogic : ILogic<MRORequestLine>
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class MRORequestLineLogic : Logic<MRORequestLine>, IMRORequestLineLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public MRORequestLineLogic(DbContext context, IRepository<MRORequestLine> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:constructor<<<///end:slot:constructor<<<
        }

        protected override IQueryable<MRORequestLine> StaticDbQueryForList(IQueryable<MRORequestLine> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(MRORequestLine entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, MRORequestLine entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<///end:slot:logic<<<
    }

}

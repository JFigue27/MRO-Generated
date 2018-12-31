using BusinessSpecificLogic.EF;
using Reusable;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IMRORequestLineLogic : ILogic<MRORequestLine>
    {
    }

    public class MRORequestLineLogic : Logic<MRORequestLine>, IMRORequestLineLogic
    {
        public MRORequestLineLogic(DbContext context, IRepository<MRORequestLine> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
        }

        protected override IQueryable<MRORequestLine> StaticDbQueryForList(IQueryable<MRORequestLine> dbQuery)
        {
            return dbQuery;
        }

        protected override void onBeforeSaving(MRORequestLine entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            
        }

        protected override void onAfterSaving(DbContext context, MRORequestLine entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }
        }
    }

}

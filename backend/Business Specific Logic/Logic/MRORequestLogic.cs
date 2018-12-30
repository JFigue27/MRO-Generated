using BusinessSpecificLogic.EF;
using Reusable;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IMRORequestLogic : IDocumentLogic<MRORequest>
    {
    }

    public class MRORequestLogic : DocumentLogic<MRORequest>, IMRORequestLogic
    {
        public MRORequestLogic(DbContext context, IDocumentRepository<MRORequest> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
        }

        protected override IQueryable<MRORequest> StaticDbQueryForList(IQueryable<MRORequest> dbQuery)
        {
            return dbQuery;
        }

        protected override void onBeforeSaving(MRORequest entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            
        }

        protected override void onAfterSaving(DbContext context, MRORequest entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }
        }
    }
}
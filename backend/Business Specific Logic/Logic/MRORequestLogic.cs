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
                if (entity.MRORequestLines != null)
          {
              foreach (var item in entity.MRORequestLines)
              {
                  item.MRORequestKey = entity.id;
                  if (item.EF_State == BaseEntity.EF_EntityState.Added)
                  {
                      context.Entry(item).State = EntityState.Added;
                  }
                  else if (item.EF_State == BaseEntity.EF_EntityState.Modified)
                  {
                      context.Entry(item).State = EntityState.Modified;
                  }
                  else if (item.EF_State == BaseEntity.EF_EntityState.Deleted)
                  {
                      context.Entry(item).State = EntityState.Deleted;
                  }
              }
          }

context.SaveChanges();
            }
        }
    }
}
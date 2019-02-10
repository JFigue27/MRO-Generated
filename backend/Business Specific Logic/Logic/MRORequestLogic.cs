using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BusinessSpecificLogic.Logic
{
    public interface IMRORequestLogic : IDocumentLogic<MRORequest>
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class MRORequestLogic : DocumentLogic<MRORequest>, IMRORequestLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public MRORequestLogic(DbContext context, IDocumentRepository<MRORequest> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:ctor<<<///end:slot:ctor<<<
        }

        protected override IQueryable<MRORequest> StaticDbQueryForList(IQueryable<MRORequest> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(MRORequest entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
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

                        #region Validations and avoid duplicates
                        if (item.Quantity == 0)
                            throw new KnownError("[Quantity] field is required.");

                        if (item.CatMaterialKey == null)
                            throw new KnownError("[Material] field is required");

                        item.CatMaterial = null;
                        #endregion

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

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<
        protected override void OnGetSingle(MRORequest entity)
        {
            var ctx = context as MROContext;
            ctx.MRORequests
                .Include("MRORequestLines.CatMaterial")
                .Include("InfoTrack.User_CreatedBy")
                .FirstOrDefault(e => e.MRORequestKey == entity.MRORequestKey);
        }
        public override void AdapterOut(params MRORequest[] entities)
        {
            using (var trainingContext = new TrainingContext())
            {
                foreach (var item in entities)
                {
                    item.Employee = trainingContext.Employees.FirstOrDefault(e => e.EmployeeKey == item.EmployeeKey);
                }
            }
        }
        ///end:slot:logic<<<
    }
}
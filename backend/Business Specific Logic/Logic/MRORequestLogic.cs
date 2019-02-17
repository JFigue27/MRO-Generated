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
            ///start:slot:listQuery<<<
            dbQuery = dbQuery
                .Include(e => e.MRORequestNumber);
            ///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(MRORequest entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<
            if (mode == OPERATION_MODE.ADD)
            {
                #region Number Generation
                var ctx = context as MROContext;

                DateTimeOffset date = DateTimeOffset.Now;

                int sequence = 0;
                var last = ctx.MRORequestNumbers.Where(n => n.CreatedAt.Year == date.Year
                        && n.CreatedAt.Month == date.Month && n.CreatedAt.Day == date.Day).OrderByDescending(n => n.Sequence)
                        .FirstOrDefault();

                if (last != null)
                {
                    sequence = last.Sequence + 1;
                }

                string generated = date.Year.ToString().Substring(2) + date.Month.ToString("D2") + date.Day.ToString("D2") + sequence.ToString("D3");


                MRORequestNumber number = ctx.MRORequestNumbers.Add(new MRORequestNumber()
                {
                    CreatedAt = date,
                    Sequence = sequence,
                    GeneratedNumber = generated,
                    Revision = "A"
                });

                ctx.SaveChanges();

                entity.MRORequestNumberKey = number.MRORequestNumberKey;
                #endregion
            }
            ///end:slot:beforeSave<<<
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
                .Include(e => e.MRORequestNumber)
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
using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryInputDocLogic : IDocumentLogic<InventoryInputDoc>
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class InventoryInputDocLogic : DocumentLogic<InventoryInputDoc>, IInventoryInputDocLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public InventoryInputDocLogic(DbContext context, IDocumentRepository<InventoryInputDoc> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:ctor<<<///end:slot:ctor<<<
        }

        protected override IQueryable<InventoryInputDoc> StaticDbQueryForList(IQueryable<InventoryInputDoc> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryInputDoc entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, InventoryInputDoc entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                if (entity.InventoryInputs != null)
                {
                    foreach (var item in entity.InventoryInputs)
                    {
                        item.InventoryInputDocKey = entity.id;

                        if (item.CatMaterial == null)
                            throw new KnownError("[Material Number] field is required.");

                        if (item.CatGeoLocation == null)
                            throw new KnownError("[Location] field is required.");

                        #region Clear objects to avoid duplicates
                        item.CatGeoLocation = null;
                        item.CatMaterial = null;
                        #endregion


                        if (item.EF_State == BaseEntity.EF_EntityState.Added)
                        {
                            item.Balance = item.Quantity;
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

        protected override void OnGetSingle(InventoryInputDoc entity)
        {
            var ctx = context as MROContext;
            ctx.InventoryInputDocs
                .Include(e => e.InfoTrack.User_CreatedBy)
                .Include("InventoryInputs.CatMaterial")
                .Include("InventoryInputs.CatGeoLocation")
                .Include(e => e.CatVendor)
                .FirstOrDefault(e => e.InventoryInputDocKey == entity.InventoryInputDocKey);
        }

        ///end:slot:logic<<<
    }
}
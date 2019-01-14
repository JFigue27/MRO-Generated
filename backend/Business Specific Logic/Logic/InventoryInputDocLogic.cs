using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryInputDocLogic : IDocumentLogic<InventoryInputDoc>
    {
        ///Start:Slot:interface<<<///End:Slot:interface<<<
    }

    public class InventoryInputDocLogic : DocumentLogic<InventoryInputDoc>, IInventoryInputDocLogic
    {
        ///Start:Slot:init<<<///End:Slot:init<<<

        public InventoryInputDocLogic(DbContext context, IDocumentRepository<InventoryInputDoc> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///Start:Slot:constructor<<<///End:Slot:constructor<<<
        }

        protected override IQueryable<InventoryInputDoc> StaticDbQueryForList(IQueryable<InventoryInputDoc> dbQuery)
        {
            ///Start:Slot:listQuery<<<///End:Slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryInputDoc entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///Start:Slot:beforeSave<<<///End:Slot:beforeSave<<<
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

            ///Start:Slot:afterSave<<<///End:Slot:afterSave<<<
        }

        ///Start:Slot:logic<<<///End:Slot:logic<<<
    }
}
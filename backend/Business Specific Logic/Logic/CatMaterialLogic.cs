using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface ICatMaterialLogic : ILogic<CatMaterial>
    {
        ///Start:Slot:interface<<<///End:Slot:interface<<<
    }

    public class CatMaterialLogic : Logic<CatMaterial>, ICatMaterialLogic
    {
        ///Start:Slot:init<<<///End:Slot:init<<<

        public CatMaterialLogic(DbContext context, IRepository<CatMaterial> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///Start:Slot:constructor<<<///End:Slot:constructor<<<
        }

        protected override IQueryable<CatMaterial> StaticDbQueryForList(IQueryable<CatMaterial> dbQuery)
        {
            ///Start:Slot:listQuery<<<///End:Slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(CatMaterial entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///Start:Slot:beforeSave<<<///End:Slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, CatMaterial entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///Start:Slot:afterSave<<<///End:Slot:afterSave<<<
        }

        ///Start:Slot:logic<<<///End:Slot:logic<<<
    }

}

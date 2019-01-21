using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface ICatMaterialLogic : ILogic<CatMaterial>
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class CatMaterialLogic : Logic<CatMaterial>, ICatMaterialLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public CatMaterialLogic(DbContext context, IRepository<CatMaterial> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:constructor<<<///end:slot:constructor<<<
        }

        protected override IQueryable<CatMaterial> StaticDbQueryForList(IQueryable<CatMaterial> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(CatMaterial entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, CatMaterial entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<///end:slot:logic<<<
    }

}

using BusinessSpecificLogic.EF;
using Reusable;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface ICatMaterialLogic : ILogic<CatMaterial>
    {
    }

    public class CatMaterialLogic : Logic<CatMaterial>, ICatMaterialLogic
    {
        public CatMaterialLogic(DbContext context, IRepository<CatMaterial> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
        }

        protected override IQueryable<CatMaterial> StaticDbQueryForList(IQueryable<CatMaterial> dbQuery)
        {
            return dbQuery;
        }

        protected override void onBeforeSaving(CatMaterial entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            
        }

        protected override void onAfterSaving(DbContext context, CatMaterial entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }
        }
    }

}

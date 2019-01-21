using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/CatMaterial")]
    public class CatMaterialController : BaseController<CatMaterial>
    {
        public CatMaterialController(ICatMaterialLogic logic) : base(logic)
        {
        }

        ///start:slot:endpoints<<<///end:slot:endpoints<<<
    }
}

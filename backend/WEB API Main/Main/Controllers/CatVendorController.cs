using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/CatVendor")]
    public class CatVendorController : BaseController<CatVendor>
    {
        public CatVendorController(ICatVendorLogic logic) : base(logic)
        {
        }

        ///start:slot:endpoints<<<///end:slot:endpoints<<<
    }
}

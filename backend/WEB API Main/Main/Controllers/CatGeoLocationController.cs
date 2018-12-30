using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/CatGeoLocation")]
    public class CatGeoLocationController : BaseController<CatGeoLocation>
    {
        public CatGeoLocationController(ICatGeoLocationLogic logic) : base(logic)
        {
        }
    }
}

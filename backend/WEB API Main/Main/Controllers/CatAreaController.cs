using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/CatArea")]
    public class CatAreaController : BaseController<CatArea>
    {
        public CatAreaController(ICatAreaLogic logic) : base(logic)
        {
        }
    }
}

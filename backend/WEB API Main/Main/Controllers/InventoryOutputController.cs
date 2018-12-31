using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/InventoryOutput")]
    public class InventoryOutputController : BaseController<InventoryOutput>
    {
        public InventoryOutputController(IInventoryOutputLogic logic) : base(logic)
        {
        }
    }
}

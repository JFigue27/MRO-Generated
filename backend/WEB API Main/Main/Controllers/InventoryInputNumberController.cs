using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/InventoryInputNumber")]
    public class InventoryInputNumberController : BaseController<InventoryInputNumber>
    {
        public InventoryInputNumberController(IInventoryInputNumberLogic logic) : base(logic)
        {
        }

        ///start:slot:endpoints<<<///end:slot:endpoints<<<
    }
}

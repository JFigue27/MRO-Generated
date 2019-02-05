using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/Inventory")]
    public class InventoryController : InventoryInputDocController
    {
        public InventoryController(IInventoryLogic logic) : base(logic)
        {
        }

        ///start:slot:endpoints<<<///end:slot:endpoints<<<
    }
}

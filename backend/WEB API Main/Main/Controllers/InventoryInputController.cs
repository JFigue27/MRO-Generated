using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/InventoryInput")]
    public class InventoryInputController : BaseController<InventoryInput>
    {
        public InventoryInputController(IInventoryInputLogic logic) : base(logic)
        {
        }

        ///Start:Slot:endpoints<<<///End:Slot:endpoints<<<
    }
}

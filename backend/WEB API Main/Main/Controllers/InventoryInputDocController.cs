using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/InventoryInputDoc")]
    public class InventoryInputDocController : DocumentController<InventoryInputDoc>
    {
        public InventoryInputDocController(IInventoryInputDocLogic logic) : base(logic)
        {
        }

        ///Start:Slot:endpoints<<<///End:Slot:endpoints<<<
    }
}

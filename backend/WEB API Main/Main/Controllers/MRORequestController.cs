using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/MRORequest")]
    public class MRORequestController : DocumentController<MRORequest>
    {
        public MRORequestController(IMRORequestLogic logic) : base(logic)
        {
        }

        ///Start:Slot:endpoints<<<///End:Slot:endpoints<<<
    }
}

using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/MRORequestLine")]
    public class MRORequestLineController : BaseController<MRORequestLine>
    {
        public MRORequestLineController(IMRORequestLineLogic logic) : base(logic)
        {
        }

        ///Start:Slot:endpoints<<<///End:Slot:endpoints<<<
    }
}

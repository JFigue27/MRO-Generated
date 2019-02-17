using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/MRORequestNumber")]
    public class MRORequestNumberController : BaseController<MRORequestNumber>
    {
        public MRORequestNumberController(IMRORequestNumberLogic logic) : base(logic)
        {
        }

        ///start:slot:endpoints<<<///end:slot:endpoints<<<
    }
}

using BusinessSpecificLogic.EF;
using System.Web.Http;
using BusinessSpecificLogic.Logic;
using Reusable;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/Inventory")]
    public class InventoryController : InventoryInputDocController
    {
        public InventoryController(IInventoryLogic logic) : base(logic)
        {
        }

        ///start:slot:endpoints<<<

        [HttpGet, Route("GetInventory")]
        public CommonResponse GetInventory()
        {
            return (logic as IInventoryLogic).GetInventory();
        }

        [HttpGet, Route("GetLocationsByPart")]
        public CommonResponse GetLocationsByPart()
        {
            return (logic as IInventoryLogic).GetLocationsByPart();
        }

        [HttpGet, Route("GetDeliveryMaterial")]
        public CommonResponse GetDeliveryMaterial()
        {
            return (logic as IInventoryLogic).GetDeliveryMaterial();
        }

        [HttpGet, Route("NeedsReorderEmail")]
        public CommonResponse NeedsReorderEmail()
        {
            return (logic as IInventoryLogic).NeedsReorderEmail();
        }

        [HttpGet, Route("DeliverMaterial/{MROKey}/{Quantity}/{CatMaterialKey}/{CatGeolocationKey}")]
        public CommonResponse DeliverMaterial(int MROKey, decimal Quantity, int CatMaterialKey, int CatGeolocationKey)
        {
            return (logic as IInventoryLogic).DeliverMaterial(MROKey, Quantity, CatMaterialKey, CatGeolocationKey);
        }

        ///end:slot:endpoints<<<
    }
}

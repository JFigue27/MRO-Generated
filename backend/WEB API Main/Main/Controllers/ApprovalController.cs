using System.Web.Http;
using BusinessSpecificLogic.Logic;
using Reusable;
using System;
using Newtonsoft.Json;

namespace ReusableWebAPI.Controllers
{
    [RoutePrefix("api/Approval")]
    public class ApprovalController : DocumentController<Approval>
    {
        public ApprovalController(IApprovalLogic logic) : base(logic)
        {
        }

        [HttpPost, Route("Approve/{ApprovalKey}")]
        public CommonResponse Approve(int ApprovalKey, [FromBody]string approval)
        {
            CommonResponse response = new CommonResponse();
            try
            {
                Approval oApproval = JsonConvert.DeserializeObject<Approval>(approval);
                return (logic as IApprovalLogic).Approve(ApprovalKey, oApproval.ResponseDescription);
            }
            catch (Exception e)
            {
                return response.Error("ERROR: " + e.ToString());
            }
        }

        [HttpPost, Route("Reject/{ApprovalKey}")]
        public CommonResponse Reject(int ApprovalKey, [FromBody]string approval)
        {
            CommonResponse response = new CommonResponse();
            try
            {
                Approval oApproval = JsonConvert.DeserializeObject<Approval>(approval);
                return (logic as IApprovalLogic).Reject(ApprovalKey, oApproval.ResponseDescription);
            }
            catch (Exception e)
            {
                return response.Error("ERROR: " + e.ToString());
            }
        }
    }
}

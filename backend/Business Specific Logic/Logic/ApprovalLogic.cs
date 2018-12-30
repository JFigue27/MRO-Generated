using BusinessSpecificLogic.EF;
using BusinessSpecificLogic.JSON_Entities;
using Newtonsoft.Json;
using Reusable;
using Reusable.Email;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace BusinessSpecificLogic.Logic
{
    public interface IApprovalLogic : IDocumentLogic<Approval>
    {
        CommonResponse Approve(int ApprovalKey, string Message);
        CommonResponse Reject(int ApprovalKey, string Message);
    }

    public class ApprovalLogic : DocumentLogic<Approval>, IApprovalLogic
    {
        private readonly ITaskLogic taskLogic;

        public ApprovalLogic(DbContext context, IDocumentRepository<Approval> repository, LoggedUser LoggedUser,
            ITaskLogic taskLogic) : base(context, repository, LoggedUser)
        {
            this.taskLogic = taskLogic;
        }

        protected override IQueryable<Approval> StaticDbQueryForList(IQueryable<Approval> dbQuery)
        {
            return dbQuery
                .Include(a => a.Approvers)
                .Include(u => u.StatusUpdatedBy)
                .Include(t => t.InfoTrack.User_CreatedBy);
        }

        protected override void OnGetSingle(Approval entity)
        {
            var ctx = context as MROContext;
            StaticDbQueryForList(ctx.Approvals).FirstOrDefault(a => a.ApprovalKey == entity.ApprovalKey);
        }

        protected override Approval OnCreateInstance(Approval entity)
        {
            var ctx = context as MROContext;

            if (entity.id < 0)
            {
                //Force Create
            }
            else
            {
                //Return existent if it exists:
                var existent = ctx.Approvals
                    .Include(a => a.Approvers)
                    .Include(a => a.StatusUpdatedBy)
                    .Include(a => a.InfoTrack.User_CreatedBy)
                    .Where(a => a.sys_active == true)
                    .Where(a => a.ForeignKey == entity.ForeignKey && a.ForeignType == entity.ForeignType)
                    .OrderByDescending(a => a.ApprovalKey)
                    .FirstOrDefault();

                if (existent != null)
                {
                    return existent;
                }
            }

            entity.ApprovalKey = 0;
            entity.DateRequested = DateTimeOffset.Now;
            entity.Status = "Requested";

            var baseURL = @"";

            switch (entity.Type)
            {
                case "":
                    entity.RequestDescription = "";

                    // entity.Approvers = ctx.Users.Where(u => u.UserKey == 5 || u.UserKey == 23).ToList();
                    entity.Title = "";
                    entity.Hyperlink = baseURL + "?id=";

                    break;
                default:
                    break;
            }

            return entity;
        }

        protected override void onBeforeSaving(Approval entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            var ctx = context as MROContext;

            #region Validations
            User currentUser = ctx.Users.AsNoTracking().FirstOrDefault(u => u.UserKey == LoggedUser.UserID);
            if (currentUser == null)
            {
                throw new KnownError("Logged User not found or session expired.");
            }

            if (entity.Approvers == null)
            {
                throw new KnownError("Approvers field is required.");
            }
            #endregion

            foreach (var item in entity.Approvers)
            {
                ctx.Users.Attach(item);
            }

            if (mode == OPERATION_MODE.ADD)
            {
                Email emailEntity = new Email();
                emailEntity.CreatedAt = DateTimeOffset.Now;

                var hyperlink = entity.Hyperlink;

                EmailService emailService = new EmailService("secure.emailsrvr.com", 587)
                {
                    EmailAddress = currentUser.Email,
                    Password = currentUser.EmailPassword,
                    From = currentUser.Email,
                    Subject = entity.Title,
                    Body = entity.Title
                            + "<br><br>" + entity.RequestDescription
                            + @"<br><br>Open document here: <a href=""" + hyperlink + @""">" + "Something Descriptive" + "</a>"
                };

                foreach (var item in entity.Approvers)
                {
                    emailService.To.Add(item.Email);
                }

                emailService.Bcc.Add(currentUser.Email);

                try
                {
                    emailService.SendMail();
                }
                catch (Exception ex)
                {
                    throw new KnownError("Could not send email, please verify your Profile settings.\n" + ex.Message);
                }
            }
        }

        protected override void onAfterSaving(DbContext context, Approval entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            var ctx = context as MROContext;

            if (mode == OPERATION_MODE.ADD)
            {

            }
            else
            {

            }


            List<Contact> responsibles = entity.Approvers.Select(u => new Contact()
            {
                Email = u.Email,
                Value = u.Value
            }).ToList();

            taskLogic.SaveTasks(responsibles, entity);

        }

        public CommonResponse Approve(int ApprovalKey, string Message)
        {
            return SetStatus(ApprovalKey, Message, "Approved");
        }

        public CommonResponse Reject(int ApprovalKey, string Message)
        {
            return SetStatus(ApprovalKey, Message, "Rejected");
        }

        private CommonResponse SetStatus(int ApprovalKey, string Message, string Status)
        {
            CommonResponse response = new CommonResponse();
            try
            {
                var ctx = context as MROContext;
                var approval = ctx.Approvals.AsNoTracking()
                                   .Include(a => a.Approvers)
                                   .FirstOrDefault(a => a.ApprovalKey == ApprovalKey);
                if (approval == null)
                {
                    throw new KnownError("Approval does not exist.");
                }

                if (LoggedUser.Role != "Administrator")
                {
                    var userValid = approval.Approvers?.FirstOrDefault(u => u.UserKey == LoggedUser.UserID);
                    if (userValid == null)
                    {
                        throw new KnownError("Logged User not lised as Approver.");
                    }
                }

                approval.Status = Status;
                approval.ResponseDescription = Message;
                approval.DateResponse = DateTimeOffset.Now;
                approval.StatusUpdatedByKey = LoggedUser.UserID;
                repository.Update(approval);


                //Updating Tasks associated:
                taskLogic.SaveTask(LoggedUser.UserID ?? 0, approval);

                return response.Success(_GetByID(ApprovalKey));
            }
            catch (KnownError ke)
            {
                return response.Error(ke);
            }
            catch (Exception e)
            {
                return response.Error(e.ToString());
            }
        }

    }
}

using BusinessSpecificLogic.EF;
using Reusable;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BusinessSpecificLogic.Logic
{
    public interface IEmployeeLogic : IDocumentLogic<Employee>
    {
        ///start:slot:interface<<<///end:slot:interface<<<
    }

    public class EmployeeLogic : DocumentLogic<Employee>, IEmployeeLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public EmployeeLogic(DbContext context, IDocumentRepository<Employee> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:ctor<<<///end:slot:ctor<<<
        }

        protected override IQueryable<Employee> StaticDbQueryForList(IQueryable<Employee> dbQuery)
        {
            ///start:slot:listQuery<<<

            dbQuery = dbQuery.OrderBy(e => e.LastName)
                                .ThenBy(e => e.MotherLastName);

            ///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(Employee entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, Employee entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {
                
            }

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<///end:slot:logic<<<
    }
}
using BusinessSpecificLogic.EF;
using HtmlTags;
using Reusable;
using Reusable.Email;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BusinessSpecificLogic.Logic
{
    public interface IInventoryLogic : IInventoryInputDocLogic
    {
        ///start:slot:interface<<<
        CommonResponse GetInventory();
        CommonResponse GetLocationsByPart();
        CommonResponse GetDeliveryMaterial();
        CommonResponse NeedsReorderEmail();
        CommonResponse DeliverMaterial(int MROKey, decimal Quantity, int CatMaterialKey, int CatGeolocationKey);
        ///end:slot:interface<<<
    }

    public class InventoryLogic : InventoryInputDocLogic, IInventoryLogic
    {
        ///start:slot:init<<<///end:slot:init<<<

        public InventoryLogic(DbContext context, IDocumentRepository<InventoryInputDoc> repository, LoggedUser LoggedUser) : base(context, repository, LoggedUser)
        {
            ///start:slot:ctor<<<///end:slot:ctor<<<
        }

        protected override IQueryable<InventoryInputDoc> StaticDbQueryForList(IQueryable<InventoryInputDoc> dbQuery)
        {
            ///start:slot:listQuery<<<///end:slot:listQuery<<<

            return dbQuery;
        }

        protected override void onBeforeSaving(InventoryInputDoc entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            ///start:slot:beforeSave<<<///end:slot:beforeSave<<<
        }

        protected override void onAfterSaving(DbContext context, InventoryInputDoc entity, BaseEntity parent = null, OPERATION_MODE mode = OPERATION_MODE.NONE)
        {
            if (mode == OPERATION_MODE.UPDATE)
            {

            }

            ///start:slot:afterSave<<<///end:slot:afterSave<<<
        }

        ///start:slot:logic<<<

        public CommonResponse GetInventory()
        {
            var response = new CommonResponse();
            FilterResponse filterResponse = new FilterResponse();

            var ctx = context as MROContext;

            var inventory = ctx.InventoryInputs.GroupBy(e => new
            {
                e.CatMaterial
                //, e.CatUnitOfMeasure 
            }).Select(e => new
            {
                e.Key,
                e.Key.CatMaterial.Value,
                e.Key.CatMaterial.MaterialDescription,
                e.Key.CatMaterial.Min,
                BalanceSum = e.Sum(b => b.Balance),
                id = e.Key.CatMaterial.CatMaterialKey
            });
            var filter = HttpContext.Current.Request["filterGeneral"];

            if (!string.IsNullOrWhiteSpace(filter) && filter != null && filter != "undefined")
            {
                inventory = inventory.Where(e => e.Key.CatMaterial.Value.Contains(filter));
            }
            var page = HttpContext.Current.Request["page"];

            if (!string.IsNullOrWhiteSpace(page) && page != null && page != "undefined")
            {
                var perPage = HttpContext.Current.Request["perPage"];

                if (!string.IsNullOrWhiteSpace(perPage) && perPage != null && perPage != "undefined")
                {
                    int iPage = int.Parse(page);
                    int iPerPage = int.Parse(perPage);


                    filterResponse.total_items = inventory.Count();
                    //TODO FILTER
                    filterResponse.total_filtered_items = inventory.Count();

                    inventory = inventory.OrderBy(e => e.Value).Skip((iPage - 1) * iPerPage).Take(iPerPage);
                }
            }


            return response.Success(inventory.ToList(), filterResponse);
        }

        public CommonResponse GetLocationsByPart()
        {
            var response = new CommonResponse();
            var ctx = context as MROContext;
            var inventory = ctx.InventoryInputs.AsQueryable();

            var filter = HttpContext.Current.Request["CatMaterialKey"];

            if (!string.IsNullOrWhiteSpace(filter) && filter != null && filter != "undefined")
            {
                var catMaterialKey = int.Parse(filter);
                return response.Success(inventory
                    .Include(e => e.CatGeoLocation)
                    .Where(e => e.CatMaterialKey == catMaterialKey)
                    .Select(e => new
                    {
                        id = e.CatGeoLocationKey,
                        e.CatGeoLocation.Value,
                        e.CatGeoLocation,
                        e.Balance
                    }));
            }

            return response.Success(inventory.Select(e => new
            {
                id = e.CatGeoLocationKey,
                e.CatGeoLocation.Value
            }));
        }

        public CommonResponse GetDeliveryMaterial()
        {
            var response = new CommonResponse();
            var ctx = context as MROContext;
            var inventoryDelivery = ctx.InventoryInputs.AsQueryable();
            var filter = HttpContext.Current.Request["CatMaterialKey"];

            if (!string.IsNullOrWhiteSpace(filter) && filter != null && filter != "undefine")
            {
                var catMaterialKey = int.Parse(filter);
                return response.Success(inventoryDelivery
                    .Where(e => e.CatMaterialKey == catMaterialKey)
                    .Select(e => new
                    {
                        id = e.CatGeoLocationKey,
                        e.CatGeoLocation.Value
                    }));
            }

            return response.Success(inventoryDelivery.Select(e => new
            {
                id = e.CatGeoLocationKey,
                e.CatGeoLocation.Value
            }));
        }

        public CommonResponse NeedsReorderEmail()
        {
            var response = new CommonResponse();

            try
            {
                var ctx = context as MROContext;

                var needsReorderList = ctx.InventoryInputs
                    .GroupBy(e => new
                    {
                        e.CatMaterial
                        //, e.CatUnitOfMeasure 
                    }).Select(e => new
                    {
                        e.Key,
                        e.Key.CatMaterial.Value,
                        e.Key.CatMaterial.MaterialDescription,
                        BalanceSum = e.Sum(b => b.Balance),
                        id = e.Key.CatMaterial.CatMaterialKey
                    })
                .Where(e => e.BalanceSum < e.Key.CatMaterial.Min)
                .ToList();


                var htmlReport = new TableTag();
                htmlReport.Style("border", "solid 1px gray");
                var headerRow = htmlReport.AddHeaderRow();

                headerRow.Header().Text("Material");
                headerRow.Header().Text("Description");
                //headerRow.Header().Text("Unit of Measure");
                headerRow.Header().Text("Balance");
                headerRow.Header("Minimum");
                foreach (var item in needsReorderList)
                {
                    var row = htmlReport.AddBodyRow();
                    row.Cell(item.Value);
                    row.Cell(item.MaterialDescription);
                    //row.Cell(item.Key.CatUnitOfMeasure.Value);
                    row.Cell(item.BalanceSum.ToString());
                    row.Cell(item.Key.CatMaterial.Min.ToString());
                }

                EmailService emailService = new EmailService("", 25)
                {
                    //EmailAddress = "",
                    //Password = "",
                    //From = "",
                    //Subject = "Needs Reorder",

                    EmailAddress = "",
                    Password = "",
                    From = "",
                    Subject = "Needs Reorder",

                    Body = needsReorderList.Count > 0 ? htmlReport.ToString() : "Inventario sin requerimientos minimos. "
                };


                emailService.To.Add("");
                emailService.To.Add("");

                try
                {
                    if (needsReorderList.Count > 0)
                    {
                        emailService.SendMail();
                    }
                }
                catch (Exception ex)
                {
                    throw new KnownError("Error. Could not send email.\n" + ex.ToString());
                }

                return response.Success();
            }
            catch (KnownError ke)
            {
                return response.Error(ke);
            }
            catch (Exception ex)
            {
                return response.Error(ex.Message);
            }
        }

        public CommonResponse DeliverMaterial(int MROKey, decimal Quantity, int CatMaterialKey, int CatGeolocationKey)
        {
            var response = new CommonResponse();
            return response;
            //try
            //{
            //    var ctx = context as MROContext;

            //    var inventoryInput = ctx.InventoryInputs.FirstOrDefault(e => e.CatMaterialKey == CatMaterialKey && e.CatGeoLocationKey == CatGeolocationKey);

            //    if (inventoryInput == null)
            //    {
            //        throw new KnownError("Material no existente.");
            //    }

            //    if (Quantity > inventoryInput.Balance)
            //    {
            //        throw new KnownError("Cantidad excede el inventario.");
            //    }

            //    var inventoryOutput = ctx.InventoryOutputs.FirstOrDefault(e => e.CatMaterialKey == CatMaterialKey && e.MroRequestKey == MROKey);

            //    //------------------------------------------------------------------

            //    if (Quantity > inventoryOutput.Quantity)
            //    {
            //        throw new KnownError("Cantidad excede la cantidad requerida.");
            //    }

            //    //-------------------------------------------------------------------
            //    if (Quantity < inventoryOutput.Quantity)
            //    {
            //        inventoryOutput.QuantityToDeliver = Quantity;
            //        inventoryInput.Balance = inventoryInput.Balance - Quantity;
            //        inventoryOutput.Status = "Parcial";
            //        ctx.Entry(inventoryOutput).State = EntityState.Modified;
            //        ctx.SaveChanges();
            //    }
            //    //--------------------------------------------------------------------
            //    if (Quantity == inventoryOutput.Quantity)
            //    {
            //        inventoryOutput.QuantityToDeliver = Quantity;
            //        inventoryInput.Balance = inventoryInput.Balance - Quantity;
            //        inventoryOutput.Status = "Entregado";
            //        ctx.Entry(inventoryOutput).State = EntityState.Modified;
            //        ctx.SaveChanges();
            //    }



            //    //var inventoryOutput = new InventoryOutput()
            //    //{
            //    //    CatGeoLocationKey = CatGeolocationKey,
            //    //    CatMaterialKey = CatMaterialKey,
            //    //    CatUnitOfMeasureKey = material.CatUnitOfMeasureKey,
            //    //    InventoryInputKey = material.InventoryInputKey,
            //    //    MroRequestKey = MROKey,
            //    //    Quantity = Quantity
            //    //};

            //    //ctx.Entry(inventoryOutput).State = EntityState.Added;

            //    //ctx.SaveChanges();

            //    return response.Success();
            //}
            //catch (KnownError ke)
            //{
            //    return response.Error(ke);
            //}
            //catch (Exception ex)
            //{

            //    return response.Error(ex.Message);
            //}
        }

        ///end:slot:logic<<<
    }
}
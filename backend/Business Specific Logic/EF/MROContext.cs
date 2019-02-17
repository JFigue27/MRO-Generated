namespace BusinessSpecificLogic.EF
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Reusable;
    using Reusable.Workflows;

    public partial class MROContext : DbContext
    {
        public MROContext()
            : base("name=MROConn")
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;

            //Database.Log = Console.Write;
        }

        ///Start:Generated:DbSet<<<
        public virtual DbSet<InventoryInputDoc> InventoryInputDocs { get; set; }
        public virtual DbSet<MRORequest> MRORequests { get; set; }
        public virtual DbSet<CatArea> CatAreas { get; set; }
        public virtual DbSet<CatGeoLocation> CatGeoLocations { get; set; }
        public virtual DbSet<CatMaterial> CatMaterials { get; set; }
        public virtual DbSet<CatVendor> CatVendors { get; set; }
        public virtual DbSet<InventoryInput> InventoryInputs { get; set; }
        public virtual DbSet<InventoryInputNumber> InventoryInputNumbers { get; set; }
        public virtual DbSet<InventoryOutput> InventoryOutputs { get; set; }
        public virtual DbSet<MRORequestLine> MRORequestLines { get; set; }
        public virtual DbSet<MRORequestNumber> MRORequestNumbers { get; set; }
        ///End:Generated:DbSet<<<

        #region From Reusable Modules
        public virtual DbSet<AdvancedSort> AdvancedSortings { get; set; }
        public virtual DbSet<Application> Applications { get; set; }
        public virtual DbSet<Approval> Approvals { get; set; }
        public virtual DbSet<Email> Emails { get; set; }
        public virtual DbSet<FilterData> FilterDatas { get; set; }
        public virtual DbSet<Revision> Revisions { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<SortData> SortDatas { get; set; }
        public virtual DbSet<Step> Steps { get; set; }
        public virtual DbSet<StepOperation> StepOperations { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<Token> Tokens { get; set; }
        public virtual DbSet<Track> Tracks { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Workflow> Workflows { get; set; }
        #endregion

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            
            #region Reusable
            modelBuilder.Entity<User>()
                .Property(e => e.Identicon64)
                .IsUnicode(false);

            #endregion
        }
    }
}

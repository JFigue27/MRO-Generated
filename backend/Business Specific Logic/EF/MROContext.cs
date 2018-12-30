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

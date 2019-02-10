namespace BusinessSpecificLogic.EF
{
    using System.Data.Entity;

    public partial class TrainingContext : DbContext
    {
        public TrainingContext()
            : base("name=TrainingConn")
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;

            //Database.Log = Console.Write;
        }

        ///Start:Generated:DbSet<<<
        public virtual DbSet<Employee> Employees { get; set; }
        ///End:Generated:DbSet<<<

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}

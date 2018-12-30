namespace BusinessSpecificLogic.Migrations
{
    using BusinessSpecificLogic.EF;
    using Reusable.Workflows;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<MROContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(MROContext context)
        {
            #region Workflows

            #endregion
        }
    }
}
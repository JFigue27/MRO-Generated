using Reusable;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessSpecificLogic.EF
{
    [Table("Employee")]
    public class Employee : BaseDocument
    {
        public Employee()
        {
            ///Start:Generated:Constructor<<<
            ///End:Generated:Constructor<<<


        }

        [Key]
        public int EmployeeKey { get; set; }

        public override int id { get { return EmployeeKey; } set { EmployeeKey = value; } }

        ///Start:Generated:Properties<<<
        public string Name { get; set; }
        public string LastName { get; set; }
        public string MotherLastName { get; set; }
        public string ClockNumber { get; set; }
        public string PersonalNumber { get; set; }
        ///End:Generated:Properties<<<

        public string Value
        {
            get
            {
                return ClockNumber + " - " + Name + " " + LastName + " " + MotherLastName;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateProfileDto
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
    }
}
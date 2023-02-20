using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public record class UpdateProfileDto
    {
        public string DisplayName { get; init; }
        public string Bio { get; init; }
    }
}
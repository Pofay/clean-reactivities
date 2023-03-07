using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public record UserActivityDto
    {
        public Guid Id { get; init; }
        public string Title { get; init; }
        public string Category { get; init; }
        public DateTime Date { get; init; }

        [JsonIgnore]
        public string HostUserName { get; init; }
    }
}
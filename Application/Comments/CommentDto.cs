using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Comments
{
    public record CommentDto
    {
        public int Id { get; init; }
        public DateTime CreatedAt { get; init; }
        public string Body { get; init; }
        public string UserName { get; init; }
        public string DisplayName { get; init; }
        public string Image { get; init; }
    }
}
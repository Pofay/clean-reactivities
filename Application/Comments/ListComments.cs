using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class ListComments
    {
        public record Query : IRequest<Result<List<CommentDto>>>
        {
            public Guid ActivityId { get; init; }
        }

        public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _context.Comments
                                             .Where(x => x.Activity.Id == request.ActivityId)
                                             .OrderByDescending(x => x.CreatedAt)
                                             .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                                             .ToListAsync();
                return Result.Ok(comments);
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListUserActivities
    {
        public record Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Predicate { get; init; }
            public string UserName { get; init; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.ActivityAttendees
                                .Where(a => a.AppUser.UserName == request.UserName)
                                .OrderBy(a => a.Activity.Date)
                                .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                                .AsQueryable();
                switch (request.Predicate)
                {
                    case "past":
                        query = query.Where(d => d.Date <= DateTime.UtcNow);
                        break;
                    case "hosting":
                        query = query.Where(d => d.HostUserName == request.UserName);
                        break;
                    default:
                        query = query.Where(d => d.Date >= DateTime.UtcNow);
                        break;
                }
                var userActivities = await query.ToListAsync();
                return Result.Ok(userActivities);
            }
        }
    }
}
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class GetUserProfile
    {

        public record Query : IRequest<Result<UserProfile>>
        {
            public string UserName { get; init; }

            public class Handler : IRequestHandler<Query, Result<UserProfile>>
            {
                private readonly DataContext _context;
                private readonly IMapper _mapper;
                private readonly IUserAccessor _userAccessor;

                public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
                {
                    _userAccessor = userAccessor;
                    _context = context;
                    _mapper = mapper;
                }

                public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
                {
                    var user = await _context.Users
                                             .ProjectTo<UserProfile>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                                             .SingleOrDefaultAsync(x => x.UserName == request.UserName);

                    if (user == null) return Result.Fail("User profile could not be found");

                    return Result.Ok<UserProfile>(user);
                }
            }
        }
    }
}
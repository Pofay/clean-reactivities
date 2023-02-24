using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Persistence;

namespace Application.Followers
{
    public class FollowToggle
    {
        public record Command : IRequest<Result<Unit>>
        {
            public string TargetUserName { get; init; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var target = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.TargetUserName);

                if (target == null)
                {
                    return Result.Fail("Could not find the user to follow.");
                }

                var following = await _context.UserFollowings.FindAsync(observer.Id, target.Id);

                if (following == null)
                {
                    FollowTargetUser(observer, target);
                }
                else
                {
                    UnfollowTargetUser(following);
                }

                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Result.Ok(Unit.Value);
                }

                return Result.Fail("Failed to update following.");
            }

            private EntityEntry<UserFollowing> UnfollowTargetUser(UserFollowing following)
            {
                return _context.UserFollowings.Remove(following);
            }

            private void FollowTargetUser(AppUser observer, AppUser target)
            {
                UserFollowing following = new UserFollowing
                {
                    Observer = observer,
                    Target = target
                };
                _context.UserFollowings.Add(following);
            }
        }
    }
}
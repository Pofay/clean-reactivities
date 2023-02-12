using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentResults;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class UpdateUserProfile
    {
        public class Command : IRequest<Result<Unit>>
        {
            private readonly string _bio;
            private readonly string _displayName;

            public string DisplayName => _displayName;
            public string Bio => _bio;

            public Command(string displayName, string bio)
            {
                _displayName = displayName;
                _bio = bio;
            }
            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(a => a.DisplayName).NotEmpty();
                }
            }

            public class Handler : IRequestHandler<Command, Result<Unit>>
            {
                private readonly DataContext _context;
                private readonly IUserAccessor _userAccessor;

                public Handler(DataContext context, IUserAccessor userAccessor)
                {
                    _context = context;
                    _userAccessor = userAccessor;
                }

                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                    if (user != null)
                    {
                        user.Bio = request.Bio ?? user.Bio;
                        user.DisplayName = request.DisplayName ?? user.DisplayName;
                        var operations = await _context.SaveChangesAsync();

                        if (operations > 0)
                        {
                            return Result.Ok(Unit.Value);
                        }
                        return Result.Fail("Failed to update user profile");
                    }
                    else
                    {
                        return Result.Fail("Could not find user to update");
                    }
                }
            }
        }
    }
}
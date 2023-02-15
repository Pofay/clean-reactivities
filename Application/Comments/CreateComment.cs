using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentResults;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class CreateComment
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            private readonly Guid _activityId;
            private readonly string _commentBody;

            public string CommentBody => _commentBody;
            public Guid ActivityId => _activityId;

            public Command(Guid activityId, string commentBody)

            {
                _commentBody = commentBody;
                _activityId = activityId;
            }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CommentBody).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);

                if (activity == null) return Result.Fail("Activity cannot be found.");

                var user = await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.CommentBody,
                };

                activity.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Result.Ok(_mapper.Map<CommentDto>(comment));
                }

                return Result.Fail("Failed to add a comment.");
            }
        }
    }
}
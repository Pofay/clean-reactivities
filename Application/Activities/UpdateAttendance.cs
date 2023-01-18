using Application.Interfaces;
using Domain;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            private readonly Guid _id;
            public Guid Id => _id;

            public Command(Guid id)
            {
                _id = id;
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                .Include(a => a.Attendees)
                .ThenInclude(u => u.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null)
                {
                    return Result.Fail("No activity with given Id is found");
                }

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    return Result.Fail("User not found");
                }
                var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;
                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                // This code sucks big time. Should be Isolated into different Commands 
                // Since these are business rules in place.
                // Should probably have AttendActivity, CancelAttendance CancelActivity commands.
                
                // Should be divided into CancelActivity
                // and EnableActivity?
                if (attendance != null && hostUsername == user.UserName)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }

                // CancelAttendance
                if (attendance != null && hostUsername != user.UserName)
                {
                    activity.Attendees.Remove(attendance);
                }

                // AttendActivity
                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result.Fail("Problem updating attendance");

                return Result.Ok(Unit.Value);
            }
        }

    }
}
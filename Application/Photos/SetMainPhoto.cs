using Application.Interfaces;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMainPhoto
    {
        public record Command : IRequest<Result<Unit>>
        {
            public string Id { get; init; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    return Result.Fail("User could not be found");
                }

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null)
                {
                    return Result.Fail("Photo could not be found");
                }

                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);

                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                }

                photo.IsMain = true;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Result.Ok();
                }

                return Result.Fail("Problem setting main photo");
            }
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class DeletePhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            private readonly string _id;
            public string Id => _id;

            public Command(string id)
            {
                _id = id;
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dbContext, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _context = dbContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    return Result.Fail("User could not be found.");
                }

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo.IsMain) return Result.Fail("You cannot delete your main photo");

                var photoDeletionResult = await _photoAccessor.DeletePhoto(photo.Id);

                if (photoDeletionResult == null) return Result.Fail("Problem deleting photo from cloudinary");

                user.Photos.Remove(photo);

                var dbResult = await _context.SaveChangesAsync() > 0;

                if (dbResult) return Result.Ok();

                return Result.Fail("Problem deleting photo from API");
            }
        }
    }
}
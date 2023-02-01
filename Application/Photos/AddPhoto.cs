using Application.Interfaces;
using Domain;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class AddPhoto
    {
        public class Command : IRequest<Result<Photo>>
        {
            private readonly IFormFile _file;

            public IFormFile File => _file;

            public Command(IFormFile file)
            {
                this._file = file;
            }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                this._context = context;
                this._photoAccessor = photoAccessor;
                this._userAccessor = userAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    return Result.Fail("User not found.");
                }

                // Should be turned into a Result Ok Fail catch
                // Since the service is sometimes expected to fail.
                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain))
                {
                    photo.IsMain = true;
                }

                user.Photos.Add(photo);
                var result = await _context.SaveChangesAsync() > 0;

                if (result)
                {
                    return Result.Ok(photo);
                }

                return Result.Fail("Problem adding photo");
            }
        }
    }
}
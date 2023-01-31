using Application.Photos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        private IMediator _mediator;

        public PhotosController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] IFormFile file)
        {
            return HandleResult(await _mediator.Send(new AddPhoto.Command(file)));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await _mediator.Send(new DeletePhoto.Command(id)));
        }
    }
}
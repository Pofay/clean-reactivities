using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        private readonly IMediator _mediator;

        public ProfilesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetProfile(string userName)
        {
            return HandleResult(await _mediator.Send(new GetUserProfile.Query(userName)));
        }
    }
}
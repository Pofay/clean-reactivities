using API.DTOs;
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
            return HandleResult(await _mediator.Send(new GetUserProfile.Query { UserName = userName }));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile(UpdateProfileDto dto)
        {
            return HandleResult(await _mediator.Send(new UpdateUserProfile.Command { DisplayName = dto.DisplayName, Bio = dto.Bio }));
        }

        [HttpGet("{userName}/activities")]
        public async Task<IActionResult> GetUserActivities(string userName, string predicate)
        {
            return HandleResult(await _mediator.Send(new ListUserActivities.Query { UserName = userName, Predicate = predicate }));
        }
    }
}
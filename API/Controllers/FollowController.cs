using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Followers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        private readonly IMediator _mediator;
        public FollowController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("{userName}")]
        public async Task<IActionResult> Follow(string userName)
        {
            return HandleResult(await _mediator.Send(new FollowToggle.Command
            {
                TargetUserName = userName
            }));
        }

    }
}
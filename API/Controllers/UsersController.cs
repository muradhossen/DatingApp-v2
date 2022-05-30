﻿using API.Data;
using API.Dto;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserReposetory _userReposetory;
        private readonly IMapper _mapper;

        public UsersController(IUserReposetory userReposetory,IMapper mapper)
        {
            _userReposetory = userReposetory;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> Get()
        {
            var users = await _userReposetory.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetById(string username)
        {
            return await _userReposetory.GetMemberAsync(username);
        }
    }
}

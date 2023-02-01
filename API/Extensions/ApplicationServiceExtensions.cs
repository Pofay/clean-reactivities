using Application.Activities;
using Application.Interfaces;
using Application.Settings;
using dotenv.net.Utilities;
using Infrastructure;
using Infrastructure.Photos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
                    {
                        c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
                    });
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(EnvReader.GetStringValue("DB_CONNECTION"));
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(ListActivities.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(opt =>
            {
                opt.CloudName = EnvReader.GetStringValue("CLOUDINARY_CLOUDNAME");
                opt.ApiKey = EnvReader.GetStringValue("CLOUDINARY_APIKEY");
                opt.ApiSecret = EnvReader.GetStringValue("CLOUDINARY_APISECRET");
            });

            return services;
        }
    }
}

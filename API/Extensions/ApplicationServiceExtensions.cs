using Application.Activities;
using Application.Interfaces;
using Application.Settings;
using Infrastructure;
using Infrastructure.Photos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSwaggerGen(c =>
                    {
                        c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
                    });
            services.AddDbContext<DataContext>(opt =>
            {
                var connString = configuration.GetValue<string>("DB_CONNECTION");
                opt.UseNpgsql(connString);
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                               .AllowAnyMethod()
                               .AllowAnyHeader()
                               .AllowCredentials()
                               .WithExposedHeaders("WWW-Authenticate", "Pagination")
                               .WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(ListActivities.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(opt =>
            {
                opt.CloudName = configuration.GetValue<string>("CLOUDINARY_CLOUDNAME");
                opt.ApiKey = configuration.GetValue<string>("CLOUDINARY_APIKEY");
                opt.ApiSecret = configuration.GetValue<string>("CLOUDINARY_APISECRET");
            });
            services.AddSignalR();

            return services;
        }
    }
}

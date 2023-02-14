using Domain;
using dotenv.net;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using var scope = host.Services.CreateScope();

            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<DataContext>();
                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                await context.Database.MigrateAsync();
                await Seed.SeedData(context, userManager);
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An Error occured during migration");
            }
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                            .ConfigureWebHostDefaults(webBuilder =>
                            {
                                webBuilder.UseStartup<Startup>();
                            })
                            .ConfigureAppConfiguration((context, hostConfig) =>
                            {
                                var env = context.HostingEnvironment;

                                if (env.IsDevelopment())
                                {
                                    DotEnv.Fluent()
                                          .WithDefaultEncoding()
                                          .WithoutExceptions()
                                          .WithTrimValues()
                                          .WithOverwriteExistingVars()
                                          .Load();
                                }
                                hostConfig.AddEnvironmentVariables();
                            });
        }
    }
}

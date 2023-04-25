using dotenv.net;

namespace API.Extensions
{
    public static class IConfigurationBuilderExtensions
    {
        public static IConfigurationBuilder AddDotEnv(this IConfigurationBuilder configBuilder, IHostEnvironment environment)
        {
            if (environment.IsDevelopment())
            {
                DotEnv.Fluent()
                      .WithDefaultEncoding()
                      .WithoutExceptions()
                      .WithTrimValues()
                      .WithOverwriteExistingVars()
                      .Load();
            }
            else if (environment.IsStaging())
            {
                DotEnv.Fluent()
                      .WithEnvFiles(".env.staging")
                      .WithDefaultEncoding()
                      .WithoutExceptions()
                      .WithTrimValues()
                      .WithOverwriteExistingVars()
                      .Load();
            }

            return configBuilder;
        }

    }
}
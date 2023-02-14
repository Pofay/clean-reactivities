using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

            return configBuilder;
        }

    }
}
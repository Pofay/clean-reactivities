FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app
EXPOSE 8080

# copy .csproj and restore as distinct layers
COPY "Reactivities.sln" "Reactivities.sln"
COPY "API/API.csproj" "API/API.csproj"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj"

# copy .csproj test libraries
COPY "API.Test/API.Test.csproj" "API.Test/API.Test.csproj"
COPY "Application.Test/Application.Test.csproj" "Application.Test/Application.Test.csproj"
COPY "Domain.Test/Domain.Test.csproj" "Domain.Test/Domain.Test.csproj"

RUN dotnet restore "Reactivities.sln"

# copy everything else and build
COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out

# build the React client app with Vite
FROM node:16-alpine AS build-client
WORKDIR /app/client-app
COPY client-app/package.json .
COPY client-app/package-lock.json .
RUN npm install
COPY client-app/ .
RUN npm run build:prod

# build the final image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
COPY --from=build-client /app/client-app/dist ./wwwroot
ENTRYPOINT [ "dotnet", "API.dll" ]
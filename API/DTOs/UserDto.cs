namespace API.DTOs
{
    public record UserDto
    {
        public string DisplayName { get; init; }
        public string Token { get; init; }
        public string Image { get; init; }
        public string UserName { get; init; }
    }
}
namespace API.DTOs
{

    public record class LoginDto
    {
        public string Email { get; init; }
        public string Password { get; init; }
    }
}
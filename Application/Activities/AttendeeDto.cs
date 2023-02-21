namespace Application.Activities
{
    public record AttendeeDto
    {
        public string UserName { get; init; }
        public string DisplayName { get; init; }
        public string Bio { get; init; }
        public string Image { get; init; }
    }
}
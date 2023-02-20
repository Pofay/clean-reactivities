using Application.Profiles;

namespace Application.Activities
{
    public record class ActivityDto
    {
        public Guid Id { get; init; }
        public string? Title { get; init; }
        public DateTime Date { get; init; }
        public string? Description { get; init; }
        public string? Category { get; init; }
        public string? City { get; init; }
        public string? Venue { get; init; }
        public string HostUsername { get; init; }
        public bool IsCancelled { get; init; }
        public ICollection<AttendeeDto> Attendees { get; init; }
    }
}
using Domain;

namespace Application.Profiles
{
    public record class UserProfile
    {
        public string UserName { get; init; }
        public string DisplayName { get; init; }
        public string Bio { get; init; }
        public string Image { get; init; }
        public ICollection<Photo> Photos { get; init; }
    }
}
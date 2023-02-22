using Domain;

namespace Application.Profiles
{
    public record UserProfile
    {
        public string UserName { get; init; }
        public string DisplayName { get; init; }
        public string Bio { get; init; }
        public string Image { get; init; }
        public ICollection<Photo> Photos { get; init; }
        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}
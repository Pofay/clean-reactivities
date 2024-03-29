﻿using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Persistence;
public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Activity> Activities { get; set; }
    public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<UserFollowing> UserFollowings { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttendee>(a => a.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

        builder.Entity<ActivityAttendee>()
        .HasOne(u => u.AppUser)
        .WithMany(a => a.Activities)
        .HasForeignKey(aa => aa.AppUserId);

        builder.Entity<ActivityAttendee>()
        .HasOne(u => u.Activity)
        .WithMany(a => a.Attendees)
        .HasForeignKey(aa => aa.ActivityId);

        builder.Entity<Comment>()
        .HasOne(a => a.Activity)
        .WithMany(c => c.Comments)
        .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserFollowing>(b =>
        {
            b.HasKey(k => new { k.ObserverId, k.TargetId });

            b.HasOne(o => o.Observer)
            .WithMany(f => f.Followings)
            .HasForeignKey(o => o.ObserverId)
            .OnDelete(DeleteBehavior.Cascade);

            b.HasOne(o => o.Target)
            .WithMany(f => f.Followers)
            .HasForeignKey(o => o.TargetId)
            .OnDelete(DeleteBehavior.Cascade);
        });
    }
}

// Created this based on https://stackoverflow.com/questions/60561851/an-error-occurred-while-accessing-the-microsoft-extensions-hosting-services-when
// since I'm using .env instead of appsettings.json
public class DataDbContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        optionsBuilder.UseNpgsql(Environment.GetEnvironmentVariable("DATABASE_URL"));

        return new DataContext(optionsBuilder.Options);
    }
}

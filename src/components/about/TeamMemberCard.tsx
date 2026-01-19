import type { TeamMember } from '../../types';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="team-member">
      <div className="team-photo">
        <img src={member.image} alt={member.name} />
      </div>
      <div className="team-info">
        <h3>{member.name}</h3>
        <ul>
          {member.achievements.map((achievement, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: achievement.replace(/\n/g, '<br />') }} />
          ))}
        </ul>
      </div>
    </div>
  );
}

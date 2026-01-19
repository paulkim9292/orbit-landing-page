import { TeamMemberCard } from './TeamMemberCard';
import { teamMembers } from '../../data/teamMembers';

export function TeamGrid() {
  return (
    <div className="team-grid">
      {teamMembers.map((member) => (
        <TeamMemberCard key={member.name} member={member} />
      ))}
    </div>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { TeamGrid } from '../components/about';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="about-main">
      <h1 className="about-title">Meet Team AImee</h1>

      <div className="about-divider"></div>

      <p className="about-subtitle">
        AImee = 愛 (Love) + AI → Empowering students to love themselves, their community, and their planet
      </p>

      <TeamGrid />
    </main>
  );
}

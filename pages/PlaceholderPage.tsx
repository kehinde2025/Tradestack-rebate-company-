import { Link } from 'react-router-dom';

type PlaceholderPageProps = {
  title: string;
  description: string;
  eyebrow?: string;
  actionLabel?: string;
  actionTo?: string;
};

export default function PlaceholderPage({
  title,
  description,
  eyebrow = 'Coming soon',
  actionLabel = 'Back home',
  actionTo = '/',
}: PlaceholderPageProps) {
  return (
    <main className="placeholder-page">
      <div className="container placeholder-shell">
        <span className="eyebrow accent">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <Link to={actionTo} className="button button-primary">
          {actionLabel}
        </Link>
      </div>
    </main>
  );
}

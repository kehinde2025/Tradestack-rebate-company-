import { Receipt } from '../components/Icons';

export default function AdminPlaceholder({
  title,
  description,
  emptyMessage = 'No records available.',
}: {
  title: string;
  description: string;
  emptyMessage?: string;
}) {
  return (
    <section className="admin-page" aria-labelledby="admin-page-title">
      <header className="admin-page-heading">
        <div>
          <span className="eyebrow accent">Admin Console</span>
          <h2 id="admin-page-title">{title}</h2>
        </div>
        <p>{description}</p>
      </header>
      <div className="admin-empty-card">
        <span className="admin-empty-icon"><Receipt aria-hidden="true" /></span>
        <strong>{emptyMessage}</strong>
        <p>Data and management actions will be available when the admin services are connected.</p>
      </div>
    </section>
  );
}

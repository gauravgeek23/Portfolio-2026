import './ExperienceList.css';

// Company logo, name and role on the left; dates and location on the right.
export default function ExperienceList({ items }) {
  return (
    <ul className="experience">
      {items.map((job) => (
        <li key={job.company} className="experience__item">
          <div className="experience__logo">
            <img src={job.logo} alt="" height="40" loading="lazy" decoding="async" />
          </div>
          <div className="experience__role">
            <h3 className="text-medium">{job.company}</h3>
            <p className="text-small text-muted">{job.role}</p>
          </div>
          <p className="experience__meta text-small text-muted">
            <span>{job.period}</span>
            <span>{job.location}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

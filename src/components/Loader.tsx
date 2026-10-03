type LoaderProps = {
  progress: number;
  visible: boolean;
};

export function Loader({ progress, visible }: LoaderProps) {
  const percent = Math.round(progress * 100);

  return (
    <div className={`loader ${visible ? "" : "loader--hidden"}`} aria-live="polite" aria-busy={visible}>
      <div className="loader__inner">
        <p className="loader__eyebrow">Loading experience</p>
        <div className="loader__bar" aria-label="Loading progress">
          <div className="loader__fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="loader__percent">{percent}%</span>
      </div>
    </div>
  );
}

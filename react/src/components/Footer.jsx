export const Footer = ({environment}) => {
  return (
    <footer className="text-muted">
      <div>
        <strong>{environment}</strong>
      </div>
    </footer>
  );
};

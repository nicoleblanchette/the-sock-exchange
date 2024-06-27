export const Footer = ({environment}) => {
  return (
    <footer className={`text-muted ${import.meta.env.VITE_ENVIRONMENT === 'development' ? 'bg-yellow' : 'bg-green'}`} style={{fontWeight: "bold"}}>
      <div>
        <strong>{environment}</strong>
      </div>
    </footer>
  );
};

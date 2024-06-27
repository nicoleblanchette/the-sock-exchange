import Sock from "./Sock";
export const Home = (props) => {
  return (
    <div
      className="card-container"
      style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
    >
      {props.data.map((sock) => (
        <Sock key={sock._id} data={sock} handleDelete={props.handleDelete} />
      ))}
    </div>
  );
};

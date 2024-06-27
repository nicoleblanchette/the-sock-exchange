import { Promo } from "./Promo";
import promo_data from "../assets/promo.json"
export const Featured = () => {
  return (
    <>
      <h5>Featured</h5>
      <div
        className="card-container d-flex flex-row justify-content-start"
        style={{ gap: "20px", padding: "20px" }}
      >
        {promo_data.map((promo) => (
          <Promo key={promo.id} data={promo} />
        ))}
      </div>
    </>
  );
};

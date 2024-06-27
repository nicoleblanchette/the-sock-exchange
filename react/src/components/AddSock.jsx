//import { useNavigate } from "react-router-dom";
import { fetchHandler, getPostOptions } from "../utils/fetching";
import { useState } from "react";
export const AddSock = () => {
    //const navigate = useNavigate()

	const [statusText, setStatusText] = useState("")
	const [formData, setFormData] = useState({
		userId: "",
        sockDetails: {
            size: "",
            color: "",
            pattern: "",
            material: "",
            condition: "",
            forFoot: ""
        },
        additionalFeatures: {
            waterResistant:  false,
            padded: false,
            antiBacterial: false
        },
        addedTimestamp: ''
	})


    //addedTimestamp: "2024-01-27T10:00:00Z" include timestamp in handleSubmit

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value,
        }));
      };

	const handleSubmit = async event => {
		event.preventDefault()
		setStatusText("")
        const url = 'https://ecs.the-sock-exchange.com/api/socks'
        setFormData(prevData => ({
            ...prevData,
            [addedTimestamp]: Date.now(),
          }));
		//const [sock, error] = await createUser(formData)
        const [sock, error] = await fetchHandler(url, getPostOptions(formData))
        console.log(sock)
        if (sock) return setStatusText('success!')
		if (error) return setStatusText(error.message)
		//navigate(-1)
	}

    
  return (
    <>
    {statusText && statusText}
      <form className="p-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            name="userId"
            onChange={handleInputChange}
            value={formData.userId}
          />
        </div>
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select className="form-control" id="size" name="size" value={formData.sockDetails.size} onChange={handleInputChange}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="text" className="form-control" id="color" name="color" value={formData.sockDetails.color} onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="pattern">Pattern</label>
          <input
            type="text"
            className="form-control"
            id="pattern"
            name="pattern"
            value={formData.pattern}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="material">Material</label>
          <input
            type="text"
            className="form-control"
            id="material"
            name="material"
            value={formData.sockDetails.material}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="condition">Condition</label>
          <select className="form-control" id="condition" name="condition" value={formData.sockDetails.condition} onChange={handleInputChange}>
            <option>Used</option>
            <option>New</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="forFoot">For Foot</label>
          <select className="form-control" id="forFoot" name="forFoot" value={formData.sockDetails.forFoot} onChange={handleInputChange}>
            <option>Left</option>
            <option>Right</option>
            <option>Both</option>
          </select>
        </div>
        <div className="row">
          <div className="form-check col">
            <input
              className="form-check-input"
              type="checkbox"
              id="waterResistant"
              name="waterResistant"
              value={formData.additionalFeatures.waterResistant}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="waterResistant">
              Water Resistant
            </label>
          </div>
          <div className="form-check col">
            <input
              className="form-check-input"
              type="checkbox"
              id="padded"
              name="padded"
              value={formData.additionalFeatures.padded}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="padded">
              Padded
            </label>
          </div>
          <div className="form-check col">
            <input
              className="form-check-input"
              type="checkbox"
              id="antiBacterial"
              name="antiBacterial"
              value={formData.additionalFeatures.antiBacterial}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="antiBacterial">
              Anti Bacterial
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

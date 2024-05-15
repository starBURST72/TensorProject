import React, { useContext } from "react";
import { Context, ContextTravel } from "../Context/AppContext";
import { Link, NavLink } from "react-router-dom";
import "./Travel.css";
import { getOneTravel } from "../../API/API";


interface TravelProps {
    title: string;
    description: string;
    id: number
    //   image: string;
}

function Travel(props: TravelProps) {
    const { title, description,id } = props;
    const { setSelectedTravel } = useContext(ContextTravel);
    
    const handleClick = async () => {
        setSelectedTravel(props);
        const response = await getOneTravel(id)
      };

    return (
        <Link className="travel-card" to='/map'>
            <div onClick={handleClick}>

                <h3>{title}</h3>
                <p>{description}</p>
            </div>


        </Link>
    );
}

export default Travel;
import React, { useContext } from "react";
import { Context, ContextTravel } from "../Context/AppContext";
import { Link, NavLink } from "react-router-dom";
import "./Travel.css";


interface TravelProps {
    title: string;
    description: string;
    id: number
    //   image: string;
}

function Travel(props: TravelProps) {
    const { title, description,id } = props;
    const { travel, setTravel } = useContext(ContextTravel);
    
    return (
        <Link className="travel-card" to='/map'>
            <div onClick={() => setTravel(()=>props)}>

                <h3>{title}</h3>
                <p>{description}</p>
            </div>


        </Link>
    );
}

export default Travel;
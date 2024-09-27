import React from 'react';
import {Link} from "react-router-dom";
import {useUser} from "../../context/UserContext";

const ListSection = ({ title, link, children, customHeader }) => {
    const {user} = useUser();
    return (
        <div className={"list_section"}>
            {
                (customHeader) ?
                    customHeader() :
                    <div className="list_section_header">
                        <h3>{title}</h3>
                        <Link to={link}>→</Link>
                        {/*{ (user && user.userIdx && link) && <Link to={link}>→</Link> }*/}
                    </div>
            }
            <div className="list_section_content">
                {children}
            </div>
        </div>
    );
};

export default ListSection;

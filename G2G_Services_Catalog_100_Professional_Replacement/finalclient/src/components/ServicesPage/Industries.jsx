import "./Industries.css";

import {
  FaUniversity,
  FaTrain,
  FaHospital,
  FaGraduationCap,
  FaBuilding,
  FaIndustry,
  FaCity,
  FaUniversity as FaBank
} from "react-icons/fa";

const industries = [

{
icon:<FaUniversity/>,
title:"Government",
text:"Smart Governance & Digital Infrastructure."
},

{
icon:<FaTrain/>,
title:"Railways",
text:"CCTV, Networking & Communication Solutions."
},

{
icon:<FaHospital/>,
title:"Healthcare",
text:"Hospital IT & Security Infrastructure."
},

{
icon:<FaGraduationCap/>,
title:"Education",
text:"Campus Networking & Smart Classrooms."
},

{
icon:<FaBuilding/>,
title:"Corporate",
text:"Enterprise IT Infrastructure Solutions."
},

{
icon:<FaIndustry/>,
title:"Manufacturing",
text:"Industrial Surveillance & Automation."
},

{
icon:<FaCity/>,
title:"Smart City",
text:"Integrated Smart City Solutions."
},

{
icon:<FaBank/>,
title:"Banking",
text:"Secure Banking & Financial Networks."
}

];

function Industries(){

return(

<section className="industries">

<div className="container">

<div className="section-title">

<span>OUR INDUSTRIES</span>

<h2>Industries We Serve</h2>

<p>

Delivering innovative IT Infrastructure and Security
Solutions across multiple industries.

</p>

</div>

<div className="industry-grid">

{

industries.map((item,index)=>(

<div className="industry-card" key={index}>

<div className="industry-icon">

{item.icon}

</div>

<h3>{item.title}</h3>

<p>{item.text}</p>

</div>

))

}

</div>

</div>

</section>

);

}

export default Industries;
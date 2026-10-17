import "./ServiceGrid.css";

import {
  FaNetworkWired,
  FaVideo,
  FaFireExtinguisher,
  FaDoorOpen,
  FaPhoneVolume,
  FaServer,
  FaDatabase,
  FaWifi,
  FaCity,
  FaTools,
  FaPlug,
  FaLaptopCode
} from "react-icons/fa";

const services = [

{
title:"Enterprise Networking",
icon:<FaNetworkWired/>,
text:"High performance LAN, WAN, Switches and Routers."
},

{
title:"CCTV Surveillance",
icon:<FaVideo/>,
text:"AI Based IP CCTV Monitoring & Security Systems."
},

{
title:"Fire Alarm System",
icon:<FaFireExtinguisher/>,
text:"Addressable & Conventional Fire Alarm Solutions."
},

{
title:"Access Control",
icon:<FaDoorOpen/>,
text:"Biometric, RFID & Smart Access Management."
},

{
title:"EPABX System",
icon:<FaPhoneVolume/>,
text:"IP PBX & Enterprise Communication Solutions."
},

{
title:"Server & Storage",
icon:<FaServer/>,
text:"Dell, HP, Lenovo Enterprise Server Deployment."
},

{
title:"Data Center",
icon:<FaDatabase/>,
text:"Rack, UPS, Cooling & Data Center Infrastructure."
},

{
title:"Wi-Fi Solutions",
icon:<FaWifi/>,
text:"Campus Wi-Fi & Enterprise Wireless Networks."
},

{
title:"Smart City",
icon:<FaCity/>,
text:"Integrated Smart City Surveillance Solutions."
},

{
title:"AMC Support",
icon:<FaTools/>,
text:"Annual Maintenance & Technical Support."
},

{
title:"Structured Cabling",
icon:<FaPlug/>,
text:"Copper & Fiber Structured Cabling Services."
},

{
title:"IT Consultancy",
icon:<FaLaptopCode/>,
text:"Professional IT Infrastructure Consulting."
}

];

function ServiceGrid(){

return(

<section className="service-grid">

<div className="container">

<div className="section-title">

<span>OUR EXPERTISE</span>

<h2>Complete Technology Solutions</h2>

<p>

End-to-End Enterprise IT Infrastructure & Security Services

</p>

</div>

<div className="service-cards">

{

services.map((item,index)=>(

<div className="service-card" key={index}>

<div className="service-icon">

{item.icon}

</div>

<h3>{item.title}</h3>

<p>{item.text}</p>

<button>

Read More →

</button>

</div>

))

}

</div>

</div>

</section>

);

}

export default ServiceGrid;
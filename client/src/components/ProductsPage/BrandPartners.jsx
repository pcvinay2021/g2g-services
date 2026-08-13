import "./BrandPartners.css";

import {
FaServer,
FaNetworkWired,
FaShieldAlt,
FaDesktop
} from "react-icons/fa";

const brands=[

{
name:"CP Plus",
category:"CCTV Surveillance",
icon:<FaShieldAlt/>
},

{
name:"Hikvision",
category:"Security Solution",
icon:<FaShieldAlt/>
},

{
name:"Dahua",
category:"Video Surveillance",
icon:<FaShieldAlt/>
},

{
name:"Cisco",
category:"Enterprise Networking",
icon:<FaNetworkWired/>
},

{
name:"HP",
category:"Servers & Laptops",
icon:<FaServer/>
},

{
name:"Dell",
category:"Enterprise Server",
icon:<FaDesktop/>
},

{
name:"Lenovo",
category:"Business Computing",
icon:<FaDesktop/>
},

{
name:"Microsoft",
category:"Cloud & Software",
icon:<FaDesktop/>
},

{
name:"APC",
category:"UPS Solution",
icon:<FaServer/>
},

{
name:"FAAC",
category:"Boom Barrier",
icon:<FaShieldAlt/>
},

{
name:"Neptune",
category:"Entrance Automation",
icon:<FaShieldAlt/>
},

{
name:"TimeWatch",
category:"Biometric System",
icon:<FaShieldAlt/>
}

];

function BrandPartners(){

return(

<section className="brand-section">

<div className="container">

<div className="section-title">

<span>OUR BRANDS</span>

<h2>

Authorized Brand Partners

</h2>

<p>

We deliver genuine products from globally trusted technology brands.

</p>

</div>

<div className="brand-grid">

{

brands.map((brand,index)=>(

<div className="brand-card"

key={index}>

<div className="brand-icon">

{brand.icon}

</div>

<h3>

{brand.name}

</h3>

<p>

{brand.category}

</p>

<button>

View Catalogue

</button>

</div>

))

}

</div>

</div>

</section>

);

}

export default BrandPartners;
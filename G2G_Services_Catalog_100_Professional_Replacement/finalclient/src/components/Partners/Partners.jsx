import "./Partners.css";

const partners = [
  {
    name: "Cisco",
    logo: "https://cdn.simpleicons.org/cisco"
  },
  {
    name: "Dell",
    logo: "https://cdn.simpleicons.org/dell"
  },
  {
    name: "HP",
    logo: "https://cdn.simpleicons.org/hp"
  },
  {
    name: "Bosch",
    logo: "https://cdn.simpleicons.org/bosch"
  },
  {
    name: "Honeywell",
    logo: "https://cdn.simpleicons.org/honeywell"
  },
  {
    name: "Siemens",
    logo: "https://cdn.simpleicons.org/siemens"
  },
  {
    name: "Schneider",
    logo: "https://cdn.simpleicons.org/schneiderelectric"
  },
  {
    name: "Fortinet",
    logo: "https://cdn.simpleicons.org/fortinet"
  }
];

function Partners() {

return(

<section className="section partners">

<div className="container">

<div className="section-title">

<span>TECHNOLOGY PARTNERS</span>

<h2>Trusted OEM Brands</h2>

<p>

Working with globally trusted technology partners
to deliver enterprise-grade infrastructure solutions.

</p>

</div>

<div className="logo-grid">

{

partners.map((item,index)=>(

<div className="logo-card" key={index}>

<img src={item.logo} alt={item.name}/>

<h4>{item.name}</h4>

</div>

))

}

</div>

</div>

</section>

)

}

export default Partners;
import "./WhyChoose.css";

import {
  FaCheckCircle,
  FaAward,
  FaUserShield,
  FaHeadset,
  FaProjectDiagram,
  FaHandshake
} from "react-icons/fa";

function WhyChoose() {

  const features = [

    {
      icon:<FaAward/>,
      title:"14+ Years Experience",
      text:"Successfully delivering Enterprise IT & Security projects across India."
    },

    {
      icon:<FaUserShield/>,
      title:"Certified Engineers",
      text:"Experienced professionals for implementation and support."
    },

    {
      icon:<FaHeadset/>,
      title:"24×7 Technical Support",
      text:"Dedicated support team for critical business operations."
    },

    {
      icon:<FaProjectDiagram/>,
      title:"150+ Successful Projects",
      text:"Government, Corporate & Industrial project execution."
    },

    {
      icon:<FaHandshake/>,
      title:"Trusted Technology Partner",
      text:"Long-term partnerships with enterprise and government clients."
    }

  ];

  return (

<section className="whychoose">

<div className="container why-grid">

<div className="why-left">

<span className="section-tag">

WHY CHOOSE US

</span>

<h2>

Why G2G Services?

</h2>

<p>

We provide complete Enterprise IT Infrastructure,
Networking, Security Surveillance,
Data Center, Smart City and
Digital Transformation Solutions.

</p>

<div className="why-list">

{

features.map((item,index)=>(

<div className="why-item" key={index}>

<div className="why-icon">

{item.icon}

</div>

<div>

<h4>{item.title}</h4>

<p>{item.text}</p>

</div>

</div>

))

}

</div>

</div>

<div className="why-right">

<div className="experience-card">

<h1>14+</h1>

<h3>Years Experience</h3>

<p>

Trusted by Government,
Enterprise & Corporate Clients

</p>

</div>

<div className="stats">

<div>

<h2>150+</h2>

<p>Projects</p>

</div>

<div>

<h2>100+</h2>

<p>Clients</p>

</div>

<div>

<h2>24×7</h2>

<p>Support</p>

</div>

<div>

<h2>100%</h2>

<p>Commitment</p>

</div>

</div>

</div>

</div>

</section>

  );

}

export default WhyChoose;
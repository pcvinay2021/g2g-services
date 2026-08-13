import "./WorkProcess.css";

import {
  FaComments,
  FaSearchLocation,
  FaDraftingCompass,
  FaTools,
  FaClipboardCheck,
  FaHeadset
} from "react-icons/fa";

const process = [

{
icon:<FaComments/>,
title:"Consultation",
text:"Understand customer requirements."
},

{
icon:<FaSearchLocation/>,
title:"Site Survey",
text:"Physical inspection & feasibility."
},

{
icon:<FaDraftingCompass/>,
title:"Planning & Design",
text:"Architecture & BOQ preparation."
},

{
icon:<FaTools/>,
title:"Installation",
text:"Professional implementation."
},

{
icon:<FaClipboardCheck/>,
title:"Testing",
text:"Testing & Commissioning."
},

{
icon:<FaHeadset/>,
title:"AMC Support",
text:"24×7 Maintenance & Support."
}

];

function WorkProcess(){

return(

<section className="work-process">

<div className="container">

<div className="section-title">

<span>HOW WE WORK</span>

<h2>Our Working Process</h2>

<p>

Professional execution from planning to support.

</p>

</div>

<div className="process-grid">

{

process.map((item,index)=>(

<div className="process-card" key={index}>

<div className="process-number">

0{index+1}

</div>

<div className="process-icon">

{item.icon}

</div>

<h3>

{item.title}

</h3>

<p>

{item.text}

</p>

</div>

))

}

</div>

</div>

</section>

);

}

export default WorkProcess;
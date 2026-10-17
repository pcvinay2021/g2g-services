import "./Counter.css";
import CountUp from "react-countup";
import {
  FaProjectDiagram,
  FaUsers,
  FaAward,
  FaHeadset
} from "react-icons/fa";

function Counter(){

const data=[

{
icon:<FaAward/>,
number:14,
suffix:"+",
title:"Years Experience",
color:"gold"
},

{
icon:<FaProjectDiagram/>,
number:650,
suffix:"+",
title:"Projects Completed",
color:"blue"
},

{
icon:<FaUsers/>,
number:250,
suffix:"+",
title:"Happy Clients",
color:"green"
},

{
icon:<FaHeadset/>,
number:24,
suffix:"×7",
title:"Support",
color:"red"
}

];

return(

<section className="counter">

<div className="container">

<div className="counter-grid">

{

data.map((item,index)=>(

<div className="counter-card card" key={index}>

<div className={`counter-icon ${item.color}`}>

{item.icon}

</div>

<h2>
  {item.number}
  {item.suffix}
</h2>

<p>{item.title}</p>

</div>

))

}

</div>

</div>

</section>

)

}

export default Counter;
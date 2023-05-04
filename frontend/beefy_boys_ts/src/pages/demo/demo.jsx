import { Button} from 'react-bootstrap';

var db = require("../../db.json");
var img = require("../../assets/images/tyedye.jpg")

function renderColors(){
	return "<h1>Hello</h1>"

}

const ListComponent = (props) => { 
  
  return ( 
    
    <div> 
    
      <h1>{props.text}</h1> 
      
    </div> 
    
  ); 
  
}; 

export {ListComponent};



const Demo = () => {
	return (
		<div>
			<h1>
				{db["products"][0]["title"]}
			</h1>

			<p>
				{db["products"][0]["content"]}
			</p>

			<img src={img} alt="shirt" />

			<div>

				<Button variant="outlined" disabled>Product</Button>
				<Button variant="outlined">Colors</Button>
				<Button variant="outlined" onClick={renderColors()}>Extended Info</Button>


			</div>

			<p>
				Created {db["products"][0]["created_at"]}
			</p>



		</div>

	);
};

export default Demo;

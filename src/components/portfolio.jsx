import React from 'react'; 
import ReactDOM from 'react-dom';
import './portfolio.css';

class Portfolio extends React.Component {

    //state = {  }
    render() {

        let entries = {}; 
        
        const container = document.getElementById('root');

        function handleSubmit(){

            let tag = document.forms[0][0].value;
            let amount = document.forms[0][1].value;
            let price = document.forms[0][2].value;

            entries.tag = "" + tag + "";
            entries.amount = amount;
            entries.price = price;
            
            //entries.formdata[0].value = "yo"
            
            
            

            console.log(entries)
            
            
        }
        function handleClick(){

            ReactDOM.render(
                <div>
                    <form onSubmit={ handleSubmit }>
                        <input name="tag" placeholder="Ticker Symbol"></input>
                        <input name="amount" placeholder="Amount"></input>
                        <input name="price" placeholder="Price USD"></input>
                        <button>Submit</button>
                    </form>
                </div>

            ,container)    
        }

        return (
            
            <div>
                <button type="form" onClick= {handleClick}>Add coin</button>
            </div>
            
        );
    }
}
 
export default Portfolio ;
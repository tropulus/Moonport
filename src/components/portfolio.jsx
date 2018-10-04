import React from 'react'; 
import ReactDOM from 'react-dom';
import './portfolio.css';

class Portfolio extends React.Component {

    //state = {  }
    render() {

        const container = document.getElementById('root');

        function handleSubmit(){

            let localData = {
                amount: document.forms[0][1].value,
                price: document.forms[0][2].value
            }

            localStorage.setItem('' + document.forms[0][0].value + '', JSON.stringify(localData))
            
        }
        function handleClick(){

            ReactDOM.render(
                <div>
                    <form onSubmit= { handleSubmit }>
                        <input name="tag" placeholder="Ticker Symbol"></input>
                        <input name="amount" placeholder="Amount"></input>
                        <input name="price" placeholder="Price USD"></input>
                        <button>Submit</button>
                    </form>
                </div>

            ,container)    
        }

        let portfolioContainer = [];
        for (let i = 0; i < localStorage.length; i++){

            let tag = localStorage.key(i)

            portfolioContainer.push(
                <div className="coin" key= {tag}>
                    <p>{ tag }</p>
                    <p>{ JSON.parse(localStorage[tag]).amount }</p>
                    <p>{ JSON.parse(localStorage[tag]).price }</p>
                </div>
            )
            
        }

        return (
            <div>
                { portfolioContainer }
                {/* <div>{localStorage.key(0)}</div>
                <div>{"" + JSON.parse(localStorage.getItem(localStorage.key(0))).price + ""}</div>
                <div>{"" + JSON.parse(localStorage.getItem(localStorage.key(0))).amount + ""}</div> */}
                <button type="form" onClick= {handleClick}>Add coin</button>
            </div>
            
        );
    }
}
 
export default Portfolio ;
import React from 'react'; 
import ReactDOM from 'react-dom';
import './portfolio.css';

class Portfolio extends React.Component {

    //state = {  }
    render() {
            let fetchThese = [];

            for (let i = 0; i < localStorage.length; i++){
                fetchThese.push(localStorage.key(i))
            }

            const container = document.getElementById('root');

            fetch('/portData', {
                    method: "POST",
                    mode: "cors", 
                    cache: "no-cache", 
                    credentials: "same-origin", 
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    redirect: "follow", 
                    referrer: "no-referrer", 
                    body: JSON.stringify(fetchThese), 
                    }
                )
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    let portfolioContainer = [];
                    
                        for (let i = 0; i < localStorage.length; i++){
            
                            let tag = localStorage.key(i)
            
                            portfolioContainer.push(
                                <div className="coin" key= {tag}>
                                    <p>{ myJson[tag].name }</p>
                                    <p>Amount you have: { JSON.parse(localStorage[tag]).amount }</p>
                                    <p>Price you bought at: { JSON.parse(localStorage[tag]).price }</p>
                                    <p>Price today: { myJson[tag].price }</p>
                                    <p>24h : {myJson[tag].dayMove}</p>
                                </div>
                            )    
                        }
                        ReactDOM.render(
                                <div>
                                    {portfolioContainer}
                                </div>, 
                            document.getElementById('root')
                        )
                });
            

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

        return (
            <div>
                <button type="form" onClick= {handleClick}>Add coin</button>
            </div>
            
        );
    }
}
 
export default Portfolio ;
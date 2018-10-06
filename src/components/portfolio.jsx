import React from 'react'; 
import ReactDOM from 'react-dom';
import './portfolio.css';
import green from './green.png'
import red from './red.png'

class Portfolio extends React.Component {

    //state = {  }
    render() {
            let fetchThese = [];

            for (let i = 0; i < localStorage.length; i++){
                fetchThese.push(localStorage.key(i))
            }

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

                            function getLogo(){ //fetching logo
                                let name = myJson[tag].name.toLowerCase()
                                let source = "https://raw.githubusercontent.com/dziungles/cryptocurrency-logos/master/coins/32x32/" + name + ".png"
                                let logo = <img src={source} className="img" alt={name + ".img"}/>
                                return logo
                            }

                           
                               let dayMove = Math.round(myJson[tag].dayMove*100)/100 +"%"; //removing decimals from 24h data
                               let move;
                               if (dayMove < 0){
                                   move = <img id="gains" src ={red} alt="12354" />
                               } else {
                                   move = <img id="gains" src ={green} alt="12354" />
                               }
                            
                               function priceToday(){ // make price more readable
                                   let price = myJson[tag].price
                                   if (price < 1){
                                    price = Math.round(myJson[tag].price*10000)/10000
                                   } else if (price < 20) {
                                    price = Math.round(myJson[tag].price*1000)/1000                                       
                                   } else {
                                       price = Math.round(myJson[tag].price*100)/100
                                   }
                                return "$" + price
                               }

                               function hold(){ // make price more readable
                                    let amount = JSON.parse(localStorage[tag]).amount
                                    if (amount < 1){
                                    amount = Math.round(JSON.parse(localStorage[tag]).amount*1000000)/1000000
                                    } else if (amount < 20) {
                                    amount = Math.round(JSON.parse(localStorage[tag]).amount*100)/100                                       
                                    }
                                return tag + " " + amount
                                }
                                
                                let diff = Math.round((myJson[tag].price)/(parseInt("" + JSON.parse(localStorage[tag]).price + ""))*10000)/100 + "%"
                                let move2;
                               if (diff < 0){
                                   move2 = <img id="gains" src ={red} alt="12354" />
                               } else {
                                   move2 = <img id="gains" src ={green} alt="12354" />
                               }
                                
                            
                            portfolioContainer.push(
                                <div className="coin" key= {tag}>
                                    <div id="myTable">
                                            <div className="row">
                                                <div className="cell"><p><h4>{ myJson[tag].name }</h4>{localStorage.key(i)} {getLogo()}</p> </div>
                                                <div className="cell"><p>24h : {move}{dayMove} </p></div>
                                            </div>
                                            <div className="row">
                                                <div className="cell">{"$" + Math.round(myJson[tag].price*JSON.parse(localStorage[tag]).amount)}</div>
                                                <div className="cell"><p>{ hold() }</p></div>
                                            </div>
                                            <div className="row">
                                                <div className="cell"><p>Price: { priceToday() }</p></div>
                                                <div className="cell"><p>P/L: {move2}{diff}</p></div>
                                            </div>
                                    </div>
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

                ,document.getElementById('add'))    
            }

        return (
            <div>
                <button type="form" onClick= {handleClick}>Add coin</button>
            </div>
            
        );
    }
}
 
export default Portfolio ;
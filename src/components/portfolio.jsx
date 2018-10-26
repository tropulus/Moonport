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
                    let portfolioContainer = []; //here is where we put the containers of positions
                    let total = 0; //total portfolio value
                    let totalInvestment = 0;

                   

                                            
                        for (let i = 0; i < localStorage.length; i++){
            
                            let tag = localStorage.key(i) //key from local storage
                            let diff = Math.round(((myJson[tag].price)/(parseFloat("" + JSON.parse(localStorage[tag]).price + ""))-1)*10000)/100;  //profit/loss
                            
                            let dayMove = Math.round(myJson[tag].dayMove*100)/100; //24h %

                            total +=  Math.round(myJson[tag].price*JSON.parse(localStorage[tag]).amount*100)/100
                            totalInvestment += JSON.parse(localStorage[tag]).amount*JSON.parse(localStorage[tag]).price                                                     

                            function getLogo(){ //fetching logo
                                let name = myJson[tag].name.toLowerCase()
                                let source = "https://raw.githubusercontent.com/dziungles/cryptocurrency-logos/master/coins/32x32/" + name + ".png"
                                let logo = <img src={source} className="img" alt={name + ".img"}/>
                                return logo
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

                               function hold(){ // make amount more readable
                                    let amount = JSON.parse(localStorage[tag]).amount
                                    if (amount < 1){
                                    amount = Math.round(JSON.parse(localStorage[tag]).amount*1000000)/1000000
                                    } else if (amount < 20) {
                                    amount = Math.round(JSON.parse(localStorage[tag]).amount*100)/100                                       
                                    }
                                return tag + " " + amount
                                }


                            
                            portfolioContainer.push( //putting it all together
                                <div className="coin" key= {tag}>
                                    <div id="myTable">
                                        <button onClick={clickOption} className="options">⋮</button>
                                            <div className="dropdown-content" name={tag}>
                                                    <button className="drop" onClick={editHolding}>Edit</button>
                                                    <button className="drop" onClick ={deleteHolding}>Delete</button>
                                            </div>

                                            <div className="row">
                                                <div className="cell"><div><h4>{ myJson[tag].title }</h4>{localStorage.key(i)} {getLogo()}</div></div>
                                                <div className="cell"><p>24h : {arrow(dayMove)} </p></div>
                                            </div>
                                            <div className="row">
                                                <div className="cell">{"$" + Math.round(myJson[tag].price*JSON.parse(localStorage[tag]).amount*100)/100}</div>
                                                <div className="cell"><p>{ hold() }</p></div>
                                            </div>
                                            <div className="row">
                                                <div className="cell"><p>Price: { priceToday() }</p></div>
                                                <div className="cell"><p>P/L: {arrow(diff)}</p></div>
                                            </div>
                                    </div>
                                </div>
                            ) 
                            
                        
                    }

                        function arrow(num){
                            let arrow;
                            if (num < 0) {arrow = red} else {arrow = green}

                            return (
                                <span>
                                    <img id="gains" src ={arrow} alt="dirmarker" /><span>{num + "%"}</span>
                                </span>  
                                )                   
                        }

                        ReactDOM.render(
                                <div>
                                    <div styles="display:block">Total: ${Math.round(total*100)/100} {arrow(Math.round((total/totalInvestment-1)*10000)/100)}</div>
                                    <hr></hr>
                                    {portfolioContainer}
                                </div>, 
                            document.getElementById('root')
                        )
            });
            

            function clickOption(e){
                let state = e.target.nextSibling.style
                /* if (state.display === "none") { state.display = "block"}
                else {state.display = "none"} */
                state.display = "none"
                state.display = "block"
            }

            document.addEventListener("click", function(){

            let nav = document.getElementsByClassName('dropdown-content')
            let arr = [].slice.call(nav);
            arr.map(e=>e.style.display = "none")

            })
          

            function handleSubmit(){

                let localData = {
                    amount: document.forms[0][1].value,
                    price: document.forms[0][2].value
                }

                localStorage.setItem('' + document.forms[0][0].value + '', JSON.stringify(localData))
                
            }


            function editHolding(e){
                let currentTag = e.target.parentElement.attributes.name.value

                handleClick()
                .then(() => {
                    document.getElementsByName('tag')[0].value = currentTag})
                        .then(() => {window.scrollTo(0, 10000)})
                            .then(()=>{
                                document.getElementsByName('editButton')[0].textContent = "Edit " + currentTag + " holding"
                            })
                
            }

            function deleteHolding(e) {
                let currentTag = e.target.parentElement.attributes.name.value

                localStorage.removeItem(currentTag);

                window.location.reload();
            }

            async function handleClick(){

                let rullGardin = [];
                let currencies = "BTC,ETH,XRP,BCH,EOS,XLM,LTC,USDT,ADA,XMR,TRX,MIOTA,DASH,BNB,NEO,ETC,XEM,XTZ,VET,DOGE,ZEC,OMG,BTG,MKR,BCN,ONT,LSK,ZRX,DCR,QTUM,BCD,BTS,NANO,ZIL,DGB,SC,ICX,STEEM,AE,XVG,WAVES,ETN,NPXS,BTM,BAT,ETP,HOT,STRAT,GNT,REP,SNT,PPT,KMD,TUSD,CNX,LINK,WTC,ARDR,RDD,WAN,MITH,KCS,IOST,XET,MAID,MOAC,AION,HC,AOA,ELF,HT,DGD,LRC,BNT,DCN,CMT,GXS,RHOC,FUN,MANA,DROP,QASH,ZEN,NAS,ARK,PAY,MONA,MCO,THETA,NXT,LOOM,NOAH,POWR,WAX,XIN,PIVX,ELA,BTCP,DAI,DGTX,,GAS,XZC,NEXO,DRGN,POLY,OCN,KNC,SYS,CTXC,NXS,IQ,KIN,NULS,SUB,ENG,GVT,BCO,SALT,QKC,EMC,NEC,CVC,TEL,BIX,WICC,ENJ,FCT,STORM,ICN,DENT,SKY,GRS,MAN,R,WGR,VERI,GTO,STORJ,LKY,CENNZ,ZIP,GBYTE,REQ,EDR,CND,BRD,DDD,RLC,SAN,EDO,HPB,VTC,RVN,ODE,IGNIS,TKY,TEN,BHPC,C20,MGO,FSN,PLR,NMC,GCR,RDN,NEBL,NCASH,ETHOS,TOMO,SMT,TRUE,CRPT,BFT,BLZ,STQ,SOC,APL,POE,XDN,SMART,DIG,RUFF,DTA,GNO,DATA,AGI,BLOCK,QSP,BITCNY,CS,RNT,TNB,CREDO,ANT,PPC,ACT,MEDX,GO,NAV,SRN";
                currencies.split(',').sort().forEach((e) => {
                    rullGardin.push(<option value={ e } key= { e }>{  e }</option>); 
                })

                ReactDOM.render(
                    <div>
                        <div>
                           <button className="x" onClick=
                           { () => {
                                ReactDOM.render(
                                    <div>
                                        <button className="add" type="form" onClick= {handleClick}>+</button>
                                    </div>
                                ,document.getElementById('add'))
                           }} >x</button>
                        </div>

                        <div className="formContainer">
                        <form onSubmit= { handleSubmit }>
                            <label htmlFor="tag">Currency</label>
                            <select name="tag" id="tag">
                                {rullGardin}
                            </select>
                            
                            <label htmlFor="amount">Amount</label>
                            <input id="amount" placeholder="Amount"></input>

                            <label htmlFor="price">Price USD</label>
                            <input id="price" placeholder="Price USD"></input>

                            <button className="form" name="editButton">Add to portfolio</button>

                        </form>
                        </div>
                    </div>

                ,document.getElementById('add'))    
            }

            

        return (
            <div>
                <button className="add" type="form" onClick= {handleClick}>+</button>
            </div>
            
        );
    }
}
 
export default Portfolio ;
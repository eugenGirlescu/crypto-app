import React from 'react';
import './app.css';
import Title from '..//title/title';
import Card from '../card/card';

 class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            checkData: false
        }
    }
    getData = () => {
        fetch('https://api.coinlore.net/api/tickers/?start=0&limit=10')
        .then((response) => response.json())
        .then((response) => this.setState({data: response, checkData: true}));
    }
    componentDidMount = () => {
        this.getData();
    }
    displayCoins = () => {
        return(
            this.state.data.data.map( (object , index) => (
                <Card key = {index} symbol ={object.symbol} supply = {object.tsupply} name ={object.name} price ={object.price_usd} event ={(e) => this.viewDetails(object.id)}/>
            ))
        );
    }
    viewDetails = (id) => {
        let i;
        for(i = 0; i < 10; ++i){
            if(this.state.data.data[i].id === id){
                alert(`Market Cap: +  ${this.state.data.data[i].market_cap_usd}`);
            }
        }
    }


     render() {
         console.log(this.state.data);
         if(this.state.checkData) {
            return(
                <div className = "App">
                    <Title />
                    <div className ="coins">
                     {this.displayCoins()}
                    </div>
                </div>
            );
         }else{
            return(
                <div>Loading</div>
            );
         }
         
     }
 }
 export default App;
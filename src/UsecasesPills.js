import React from 'react';
import ReactDOM from 'react-dom';


export default class UsecasesPills extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            items: null,
            isLoaded : false
        }

        // fetch("https://8qtmwmqq63.execute-api.ap-south-1.amazonaws.com/cors/testresource")
        //     .then(res => res.json())
        //     .then((res) =>{
        //         this.setState({
        //             isLoaded : true,
        //             items : res
        //         });
        //         // console.log(this.state);
        //     },
        //         (error) =>{
        //             this.setState({
        //                 isLoaded : false,
        //                 items : null
        //             })
        //         }
        //     );

            
    }

    componentDidMount(){
        // fetch("https://8qtmwmqq63.execute-api.ap-south-1.amazonaws.com/cors/testresource")
        //     .then(res => res.json())
        //     .then((res) =>{
        //         this.setState({
        //             isLoaded : true,
        //             items : res
        //         });
        //         console.log(this.state);
        //     },
        //         (error) =>{
        //             this.setState({
        //                 isLoaded : false,
        //                 items : null
        //             })
        //         }
        //     );

        // console.log(this.state.items);
    }
    render(){

        let items;
        if(this.state.items != null){
            // console.log(this.state.items.items);
            items = this.state.items.items;
        }else
            items = Array(0);

        let pills;
        if(items.length !== 0){
            pills = items.map((value,key)=>{
                return(
                    <div key={key} className="col-sm-3 col-lg-2 ml-1 mt-1 border rounded usecases">
                        <div className="row">
                            <div className="col-sm-12">
                                <h6>{value.type}</h6>
                            </div>
                        </div>
                        <div className="row " style={{height:40+'px'}}>
                            <div className="col-sm-12">
                                <h4>{value.cases} <small style={{fontSize:15+'px'}}>{"Use Cases"}</small></h4>
                            </div>
                        </div>
                    </div>
                )
            })
        }else{
            pills = <div className="col-sm-3 col-lg-2 ml-1 mt-1 border rounded usecases1">
                        <div className="row">
                            <div className="col-sm-12">
                                <h6>Loading...</h6>
                            </div>
                        </div>
                        <div className="row " style={{height:40+"px"}}>
                            <div className="col-sm-12">
                                <h4>-- <small style={{fontSize:15+'px'}}>Use Cases</small></h4>
                            </div>
                        </div>
                    </div>;
        }

        return(
        <div className="row mb-2 ml-auto mr-auto">
            {pills}
        </div>)
    }
}
const scaleNames={
    c: 'Celsius',
    f: 'Fahrenheit'
}

function toCelius(fahrenheit){
    return (fahrenheit-32) * 5 / 9
}

function toFahrenheit(celsius){
    return (celsius*9/5) + 32
}

function tryConvert(temperature, convert){
    const value=parseFloat(temperature)
    if(Number.isNaN(value)){
        return '';
    }
    return (Math.round( convert(value) * 100/100)).toString()
}
function BoilingVedict({celsius}){
    return <div>
        {celsius >=   100 ? <div className="alert alert-success">Water boiling</div> : <div className="alert alert-danger">Water not boiling</div> }
    </div>
}
function Button({type, children}){
    const className='btn btn-'+type;
    return <button className={className}>{children}</button>
}
function PrimaryButton({ children}){
    return <Button type="primary">{children}</Button>
}
function SecondaryButton({ children}){
    return <Button type="secondary">{children}</Button>
}

function Column2({left, right}){
    return <div className="row">
        <div className="col-md-6">{left}</div>
        <div className="col-md-6">{right}</div>
    </div>
}

class Calculator extends React.Component{
     constructor(props){
        super(props)
        this.state={temperature: '20',scale:'c'}
        this.handleCelsiusChange=this.handleCelsiusChange.bind(this)
        this.handleFahreinetChange=this.handleFahreinetChange.bind(this)
     }
     handleCelsiusChange(temperature){
        this.setState({
            scale: 'c',
            temperature
        })
     }
     handleFahreinetChange(temperature){
        this.setState({
            scale:'f',
            temperature
        })
     }
    
    render(){
        const {temperature, scale}=this.state
        const celsius=scale==='c'? temperature: tryConvert(temperature, toCelius)
        const fahrenheit=scale==='f'? temperature : tryConvert(temperature, toFahrenheit)
    return<div>
        <Column2 left={<TemperatureInput scale={"c"} temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>}right={<TemperatureInput scale={"f"} temperature={fahrenheit} onTemperatureChange={this.handleFahreinetChange}/>}/>
        <BoilingVedict celsius={celsius}/>
    </div>
    }
}
class TemperatureInput extends React.Component{
    constructor(props){
        super(props)
        this.handleChange=this.handleChange.bind(this)
    }
     handleChange(e){
    //     this.setState({temperature: e.target.value})
        this.props.onTemperatureChange(e.target.value)
      }
    render(){
        const {temperature}=this.props
        const name='scale'+this.props.temperature
        const scaleName=scaleNames[this.props.scale]
        return <div className="form-group">
        <label htmlFor={name}>Temperature en {scaleName}:</label>
        <input type="text" value={temperature} id={name} onChange={this.handleChange} className="form-control" />
    </div>
    }
}
ReactDOM.render( <Calculator/>,document.querySelector('#app'))

// // function WelcomeFun({name, children}){
// //     return <div>
// //         <h1>Bonjour {name}</h1>
// //         <p>{children}</p>
// //     </div>
// // }

// // class Welcome extends React.Component{
    
// //     constructor(props){
// //         super(props)
// //         console.log(props)
// //     }

// //     render(){
// //         return <div>
// //             <h1>Hello {this.props.name}</h1>
// //             <p>
// //                 {this.props.children}
// //             </p>
// //         </div>
// //     }
// // }
// // class Clock extends React.Component{
// //     constructor(props) {
// //         super(props)
// //         this.state={date:  new Date()}
// //         this.timer=null
// //     }
// //     componentDidMount(){
// //         this.timer=window.setInterval(this.tick.bind(this),1000)
// //     }
    
// //     componentwillUnmount(){
// //         window.clearInterval(this.timer)
// //     }
// //     tick(){
// //         this.setState({date: new Date()})
// //     }

// //     render(){
// //         const date=new Date()
// //         return <div>
// //             il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
// //         </div>
// //     }
// // }
// // class Incrementer extends React.Component{
// //     constructor(props){
// //         super(props)
// //         this.state={n: props.start, timer:null}
// //         this.timer=null
// //         this.toggle = this.toggle.bind(this)
// //         this.reset = this.reset.bind(this)
// //     }
// //     componentDidMount(){
// //         this.play()
// //     }
// //     componentwillUnmount(){
// //         window.clearInterval(this.state.timer)
// //     }
// //     inc(){
// //         this.setState((state, props)=>({n: state.n + props.step}))// returner on function pour eviter des probleme dans beaucoup de state
// //     }
// //     pause(){
// //         window.clearInterval(this.state.timer)
// //         this.setState({
// //             timer: null
// //         })
// //     }
// //     play(){
// //         window.clearInterval(this.state.timer)
// //         this.setState({
// //             timer: window.setInterval(this.inc.bind(this), 1000)
// //         })
// //     }
// //     toggle(){
// //         return this.state.timer ? this.pause() : this.play()
// //     }
// //     label(){
// //         return this.state.timer ? 'Pause' : 'Play'
// //     }
// //     reset(){
// //         this.pause()
// //         this.play()
// //         this.setState((state, props)=>({n: props.start}))
// //     }   
// //     render(){
// //         return <div>
// //             Valeur: {this.state.n}
// //             <button onClick={this.toggle}>{this.label()}</button>
// //             <button onClick={this.reset}>Reset</button>
// //         </div>
// //     }
// // }
// // Incrementer.defaultProps={
// //     start: 0,
// //     step: 1,
// // }

// // function Home(){
// //     return <div>
// //         <Welcome name="Hassan"/>
// //         <Welcome name="Rachid"/>
// //         <Clock/>
// //         <Incrementer />
// //     </div>
// // }

// // // class ManualIncrementer extends React.Component{
// // //     constructor(props){
// // //         super(props)
// // //         this.state={n:0}
// // //     }
// // //     increment(){
// // //         this.setState((state, props)=>({n: state.n+1}))
// // //     }
// // //     render() {
// // //         return (
// // //              <div>
// // //                 Valeur: {this.state.n}<button onClick={this.increment.bind(this)}>Incrementer</button>
// // //              </div>
// // //         );
// // //     }
// // // }
// function Field ({name, value, onChange, children}){
//     return (
//         <div className="form-group">
//            <label htmlFor={name}>{children}</label>
//            <input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control" />
//         </div>
//    );
// }
// function Checkbox ({name, value, onChange, children}){
//     return (
//         <div className="form-group">
//            <input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className="form-check-input" />
//            <label htmlFor={name} className="form-check-label">{children}</label>
//         </div>
//    );
// }
        
    


// class Home extends React.Component{

//     constructor(props){
//         super(props)
//         this.state={
//             nom: '',
//             prenom: '',
//             newsLetter: false
//         }
//         this.handleChange=this.handleChange.bind(this)
//         this.handleSubmit=this.handleSubmit.bind(this)
//     }
//     handleChange(e){
//         const name=e.target.name
//         const type=e.target.type
//         const value= type==="checkbox" ? e.target.checked : e.target.value
//         this.setState({
//             [name]: value
//         })
//     }
//     handleSubmit(e){
//         e.preventDefault()
//         const data = JSON.stringify(this.state)
//         this.setState({
//             nom: '',
//             prenom: '',
//             newsLetter: false
//         })
//     }
//     render(){
//         return <form className="container" onSubmit={this.handleSubmit}>
//             <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
//             <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prenom</Field>
           
//             <Checkbox name="newsLetter" value={this.state.newsLetter} onChange={this.handleChange}>S'abonner fl jadira </Checkbox>
//             <div className="form-group">
//             <button className="btn btn-primary">Envoyer</button>
//             </div>
//             {JSON.stringify(this.state)}
//         </form>
//     }
// }

// // let n=0
// // function numberFormat(n){
// //     return n.toString().padStart(2, '0')
// // }
// // function render(){
// //     const todo=['Learn php', 'Learn Symfony', 'Learn React']
// //     const lis= todo.map((todo,k) => <li key={k}>{todo}</li>)
// //     const title = 
// //     //<>
// //     <React.Fragment>
// //         <h1 className="title" id="title">
// //         Hello World  
// //          <span>{n}</span>
// //         </h1>
// //         <ul>
// //             {lis}
// //         </ul>
// //     </React.Fragment>
    
// //     //</>

// //     ReactDOM.render(title, document.querySelector('#app'))
// // }
// // /*function render(){
// //     document.querySelector('#app').innerHTML='<h1>Hello World <span>'+ n + '</span></h1>'
// // }*/
// // render()

// // window.setInterval(()=>{
// //     n++
// //     render()
// // }, 1000)
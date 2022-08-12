import '../App.css'

function Input(props){
    return <input placeholder='What needs to be done?' className='todoInput' value={props.value} onChange={(e) => props.setText(e.target.value)} onKeyDown={props.onKeyDown} />;
}

export default Input
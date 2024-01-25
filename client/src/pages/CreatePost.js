import 

export default function CreatePost(){
    return (
        // gotta add route in app.js (1:47:30)
        <form>
            <input type="title" placeholder={'Title'}/>
            <input type="summary" placeholder={"Summary"}/>
            <input type="file" />
            <ReactQuill />
        </form>
    );
}
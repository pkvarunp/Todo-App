import { useEffect, useState } from "react"

export default function Todo(){

const [title,setTitle] =useState("");
const [description,setDescription] =useState("");
const[todos, setTodos] =useState([]);
const[error, setError] =useState("");
const[editId, setEditId] =useState(-1);
const[message, setMessage] =useState("");

const [editTitle,setEditTile] =useState("");
const [editDescription,setEditDiscription] =useState("");


const apiUrl ="http://localhost:8000"

    const handleSubmit =() =>{
        setError("")

if (title.trim()!== '' && description.trim() !=='' ){

    fetch(apiUrl+"/todos",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({title,description})
    })
    .then((res) => {
        if(res.ok){
            setTodos([...todos ,{title,description}])
            setTitle("");
            setDescription("");
            setMessage("Item added succesfully")
            setTimeout(() => {
                setMessage("");
            },3000)

        }
        else{
            setError("unable to create")
        }
    })
    .catch(() => {
        setError('"unable to create"')
    })  
}

    } 

    useEffect(() => {
        getItems()
    } ,[])

    const getItems = () => {
        fetch(apiUrl+"/todos")
        .then((res) =>  res.json())
        .then((res) =>{
            setTodos(res)
        })
    }

    const handleEdit =(item) => {

        setEditId(item._id);
         setEditTile(item.title);
         setEditDiscription(item.description);
    }

    const handleUpdate = ()=>{


if (editTitle.trim()!== '' && editDescription.trim() !=='' ){

    fetch(apiUrl+"/todos/"+editId,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({title:editTitle,description:editDescription})
    })
    .then((res) => {
        if(res.ok){
 const updatedTodos = todos.map((item) => {
    if (item._id == editId) {
        item.title = editTitle;
        item.description = editDescription;
    
    }setEditId(-1)
return item;

})

            
            setTodos(updatedTodos)
            setMessage("Item updated succesfully")
            setTimeout(() => {
                setMessage("");
            },3000)

        }
        else{
            setError("unable to update")
            setTimeout(() => {
                setError("");
            },3000)
        }
    })
    .catch(() => {
        setError('"unable to create"')
    })  
}


    }
    const handleEditCancel =( )=> {
        setEditId(-1)
    
    }
    const handleDelete = (id) => {
        if (window.confirm('Are you sure want to delete?')) {
            fetch(apiUrl+'/todos/'+id, {
                method: "DELETE"
            })
            .then(() => {
               const updatedTodos = todos.filter((item) => item._id !== id)
               setTodos(updatedTodos)
            })
        }
    }



    return <>
    
    <section class="background">
  <div class="container py-5 h-100">
   

      
          <div class="card-body p-5">
    
    
    <div class=" card text-center pt-3 pb-2  gep-3">
    <h1 class="my-4" >TODO APP</h1>

</div>
<div className=" card row mt-3 gap-3 ">
<h3>Add Item</h3>
{message && <p className="text-success">{message}</p>}
<div className="form  d-flex   me-md-2 ">
    <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} className="form-controle me-2" type="text"/>
    <input placeholder="Description"  onChange={(e) => setDescription(e.target.value)} value={description} className="form-controle me-2" type="text"/>
    <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
</div>
{error && <p className="text-danger">{error}</p>}
</div>

<div className=" card row mt-3 gap-3">
<h3>Tasks</h3>
<ul className="list-group">
{
    todos.map((item) => <li className="list-group-item bg-info d-flex justify-content-between align-item-center my-2 me-2">
       
        <div className="d-flex flex-column me-md-2 gap-3">
            {
editId == -1 || editId !== item._id ? <>
<span className="fw-bold">{item.title}</span>
        <span >{item.description}</span>
</>:<>
<div className="form group d-flex gap-3 pd-2 me-3">
    <input placeholder="Title" onChange={(e) => setEditTile(e.target.value)} value={editTitle} className="form-controle" type="text"/>
    <input placeholder="Description"  onChange={(e) => setEditDiscription(e.target.value)} value={editDescription} className="form-controle" type="text"/>
   
</div>


</>
}
            </div>
      
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {editId == -1 || editId !== item._id ? <button className="btn btn-warning me-md-2" onClick={() => handleEdit(item)}>Edit</button>:<button className="btn btn-warning" onClick={handleUpdate}>Update</button>}
            {editId == -1 || editId !== item._id ?<button className="btn btn-danger "onClick={() => handleDelete(item._id)}>Delete</button>
            :<button className="btn btn-danger " onClick={handleEditCancel}>Cancel</button>}
        </div>
    </li>
    )
}

</ul>


</div>

</div>
        </div>

    
</section>
</>
}
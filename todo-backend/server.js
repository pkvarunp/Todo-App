const express =require('express');
const app = express();
const mongoose  = require('mongoose');
const cors =require('cors')




app.use(express.json());
app.use(cors())

mongoose.connect('mongodb://localhost:27017/mern-app ')
.then(() => {
    console.log('db connected')
})
.catch((err) => {
    console.log(err)
})



const todoSchema = new mongoose.Schema({
    title:String,
    description:String
})


const todoModel = mongoose.model('todo',todoSchema);


app.post('/todos',async(req,res) => {

const {title,description} = req.body;
try {
    const newTodo = new todoModel({title,description});
    await newTodo.save();
    res.status(201).json(newTodo);
} catch (error) {
   
    console.log(error)
    res.status(500).json({message:error.message});
}


})

app.get('/todos',async(req,res) =>{

    try {
        const todos = await todoModel.find();
        res.json(todos);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});

    }
})



app.put("/todos/:id",async (req,res)=> {

    try {
        const {title,description} = req.body;
    const id = req.params.id;

    const updatedTodo =await todoModel.findByIdAndUpdate(
      id,
      {title,description}  ,
      {new : true}
    )
if(!updatedTodo){
    return res.status(404).json({message: "Todo not found"})
}
res.json(updatedTodo)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});

    }
    
})

app.delete('/todos/:id', async(req,res)=> {
    try {
        const id = req.params.id;
        await todoModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});

    }
})

const port = 8000;
app.listen(port,()=> {

console.log("server is listening"+port);


})
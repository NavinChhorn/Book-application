const fs = require('fs');

readFile = [];
let data = JSON.parse(fs.readFileSync('data.json'));
if (data != "") {
  readFile = data;
}
let saveData = () =>{
    fs.writeFileSync('data.json',JSON.stringify(readFile));
}

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({origin: "*"}));
app.listen(4300);
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/listBooks',(req,res)=>{
    res.send(readFile);
})

app.post('/addBook',(req,res)=>{
    readFile.splice(0,0,req.body.name)
    saveData();
    res.send(readFile)

});


app.delete('/delete/:id', function (req, res) {
    let id = req.params.id;
    readFile.splice(id,1); 
    saveData();
    res.send(readFile);
   
})

app.put('/update', function (req, res) {
    id = req.query.id;
    value = req.query.value;
    readFile[id]= value;
    saveData();
    res.send(readFile);
});

app.get("/searchBook/:bookName", (req, res)=>{
    let searchBook = [];
    readFile.forEach(book=>{
      if(book.includes(req.params.bookName)){
        searchBook.push(book);
      }
    })
    console.log(searchBook);
    return res.send(searchBook);
})

app.use(express.static('public'));
// change to your local IP
let IP = '127.0.0.1';
let PORT = 4300;
URL_READ = "http://"+IP+':'+PORT+'/listBooks';
URL_DELETE = "http://"+IP+':'+PORT+'/delete/';
URL_ADD  = "http://"+IP+':'+PORT+'/addBook';
URL_UPDATE = "http://"+IP+':'+PORT+'/update?id=';
URL_SEARCH = "http://" + IP + ":" + PORT + "/searchBook/";

let searchBook = () => {
    let add = searchBookInput.value;
    if(add ==''){
        checkSearch()
    }
    axios.get(URL_SEARCH + add).then(displayBook).catch((error) => console.log(error));
};

let searchBookInput = document
  .getElementById("search-books")
  .querySelector("input");
searchBookInput.addEventListener("keyup", searchBook);

function displayBook(r){
    console.log(r.data);
    document.querySelector('ul').remove();
    let ul = document.createElement('ul');
    book_list.appendChild(ul);
        let books = r.data;
        for (let i = 0; i < books.length; i++){
            
            let li = document.createElement('li');
            let bookName = document.createElement('span');
            bookName.className = 'name';
            bookName.textContent = books[i];
            let deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete';
            deleteBtn.textContent = 'delete';
            deleteBtn.addEventListener('click', function() {
                deleteBook(i)
            });
            editBtn = document.createElement('span');
            editBtn.className = 'edit';
            editBtn.textContent = 'edit';
            editBtn.addEventListener('click', function(){
                editBook(i,books[i]);
            })
            
            li.appendChild(bookName);
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            ul.appendChild(li);
            // isId = '';
        }
}

function deleteBook(id) {
    axios.delete(URL_DELETE+id).then(displayBook).catch((error) => {
        console.log(error)});
    
}

function addBook(){

    let addBook = document.getElementById("add");
    if(addBook.value!=""){
        let postValue = {
            name:addBook.value, 
        }
        axios.post(URL_ADD,postValue).then((r)=>{
            console.log(r);
        
        })
    }
}
function block(element){
    element.style.display= 'block';
}
function none(element){
    element.style.display='none';
}

function editBook(id,name){
    none(wrapper)
    block(dialog)
    let isId = id;
    nameBook.value = name;
    document.querySelector('.save').addEventListener('click',function(){
        save(isId)
    } );
    isId='';

}
function cancel(){
    block(wrapper)
    none(dialog)
}
function save(id){
    axios.put(URL_UPDATE+id+'&'+'value='+nameBook.value).then( displayBook)
    block(wrapper)
    none(dialog)
}



document.querySelector('.cancel').addEventListener('click',cancel );
let nameBook = document.querySelector('#nameBook');
let wrapper= document.querySelector('#wrapper');
let dialog = document.querySelector('.dialog');

document.querySelector('#addnew').addEventListener('click', addBook);
let book_list = document.querySelector('#book-list');

function checkSearch(){
        axios.get(URL_READ).then(displayBook).
        catch((error) => {
            console.log(error);
        })
} 
checkSearch()







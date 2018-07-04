import { http } from './http';
import { ui } from './ui' ;

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost)

//Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

//Listen for edit state change
document.querySelector('#posts').addEventListener('click',enableEdit);

//Listener for cancel edit
document.querySelector('.postsContainer').addEventListener('click',cancelEditState);

function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err =>console.log(err));
}

function submitPost(){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const data = {
      title,
      body
    }

//Validate Input
    if(title===''&& body===''){
      ui.showAlert('Please fill in all fields','alert alert-danger');
    }else{
      //Check for ID
      if(id===''){
        //Create Post
        //Create Post
        http.post('http://localhost:3000/posts',data)
        .then(data =>{
          ui.showAlert('Post added!','alert alert-success');
          ui.clearFields();
          getPosts()
        })
        .catch(err => console.log(err));

      }else{
        //update Post
        http.put(`http://localhost:3000/posts/${id}`,data)
        .then(()=>{
          ui.showAlert('Post successuly updated', 'alert alert-success');
          ui.changeFromState('add');
          getPosts()
        })
        .catch(err=>console.log(err))
      }

    }

}

function deletePost(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id= e.target.parentElement.dataset.id;

    if(confirm('Do you really want to delete this post?')){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(()=>{
        //Delete from UI
            //ui.removePost(e.target);
            // or simply call Call getPosts bec
            getPosts();
        //Alert Item deleted
        ui.showAlert('Post deleted', 'alert alert-success');
      })
      .catch(err=> console.log(err))
    }
  }
  e.preventDefault();
}

function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    }
    ui.fillForm(data);
  }
  e.preventDefault();
}

function cancelEditState(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFromState('add');
  }
  e.preventDefault();
}

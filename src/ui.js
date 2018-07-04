class UI {
  constructor(){
    this.posts = document.querySelector('#posts');
    this.titleInput= document.querySelector('#title');
    this.bodyInput= document.querySelector('#body');
    this.idInput= document.querySelector('#id');
    this.postSubmit= document.querySelector('.post-submit');
    this.formState= 'add';
  }

  showPosts(posts){
    let output = '';
    posts.forEach(post => {
      output+=`
      <div class="card mb-3">
          <div class="card-body">
              <h4 class="card-title"> ${post.title} </h4>
              <p class ="card-text"> ${post.body}</p>
              <a href="#" class="edit card-link" data-id=${post.id}>
                <i class ="fa fa-pencil"></i>
              </a>
              <a href="#" class="delete card-link" data-id=${post.id}>
                <i class ="fa fa-remove"></i>
              </a>
          </div>
      </div>
      `
    })
    this.posts.innerHTML = output ;
  }

  showAlert(message, className){
    this.clearAlert();
      //Create element
      const div = document.createElement('div');
      //Add Class name
      div.className = className;
      //Insert The message
      div.appendChild(document.createTextNode(message));
      //get the parent
      const parent = document.querySelector('.postsContainer');
      //get posts
      const posts = document.querySelector('#posts');
      //Insert alert div
      parent.insertBefore(div, posts);

      //timeout

      setTimeout(()=>{this.clearAlert()}, 3000);

  }
  clearAlert(){
      const currentAlert = document.querySelector('.alert');
      if(currentAlert){
        currentAlert.remove();
      }
  }

  clearFields(){
    this.titleInput.value = '';
    this.bodyInput.value='';
  }

  removePost(target){
    target.parentElement.parentElement.parentElement.remove();
  }

  fillForm(data){
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFromState('edit');
  }

  changeFromState(state){
    if(state==='edit'){
      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove();
      }
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      //Add a cancel button
      const bttn = document.createElement('button');
      bttn.className ='post-cancel btn btn-light btn-block' ;
      bttn.appendChild(document.createTextNode('Cancel Edit')) ;
      const cardForm = document.querySelector('.card-form');
      //Get Element to insert Before
      const formEnd = document.querySelector('.form-end');
      //Insert button
      cardForm.insertBefore(bttn, formEnd);
    }else{
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      //remove cancel button
      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove();
      }
      //Clear ID from hidden field
      this.clearIdInput();
      //Clear input firlds
      this.clearFields();
    }
  }

  clearIdInput(){
    this.idInput.value = '';
  }

}

export const ui = new UI();

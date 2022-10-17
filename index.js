// let mydata=getData();

// async function getData(){
//     let fdata=await fetch('http://localhost:5500/data.json')
    
    
//         .then((res) => res.json())
//         .then((data) => {
//             createComments(data.comments);
//              mydata = data;
            
//             console.log(data.comments);
//             console.log(mydata);
//             return data
//         }

//     );
// }
// console.log(mydata.then(data=>data));


// <---------------solution-------------------->


fetch('http://localhost:5500/data.json').then((res)=>{
    return res.json()
}).then((data)=>{
    localStorage.setItem('comments', JSON.stringify(data.comments))    
    localStorage.setItem('commentUser', JSON.stringify(data.currentUser))    

    createComments(comments)
})


let mainContainer = document.querySelector('.main-container')
let commentsContainer = document.querySelector('.comments-container')

var comments = JSON.parse(localStorage.getItem('comments')) || [];
var commentUser = JSON.parse(localStorage.getItem('commentUser'));

mainContainer.addEventListener('click', (event)=>{
    let target = event.target;
    if(target.matches(".increment")){
        comments.forEach((comment)=>{
            if(comment.id == target.id){
                comment.score += 1;
            }
        })
    }
    else if(target.matches(".decrement")){
        comments.forEach((comment)=>{
            if(comment.id == target.id){
                comment.score -= 1
            }
        })
    }
    else if(target.matches(".add-new-comment")){
        let Inpcontent = document.querySelector('.add-new-cmt-inp').value
        let replyObjCmt = {
            "id" : Math.round((Math.random()) * 100) + 5,
            "content" : Inpcontent,
            "createdAt" : "2 days ago",
            "score" : Math.round((Math.random()) * 100),
            "replies": [],
            "user" :{
                "image": { 
                    "png": "./images/avatars/image-juliusomo.png",
                    "webp": "./images/avatars/image-juliusomo.webp"
                },
                "username" : commentUser.username ,
            }
        }
        if(Inpcontent.length > 0){
            comments.push(replyObjCmt)
            document.querySelector('.add-new-cmt-inp').value = ""
        }
        else{
            alert('Add some Comments')
        }
    }
    else if(target.matches(".delete-button")){
       comments= comments.filter((comment) => comment.id != target.id)
    }
    clearComments()
    createComments(comments)
})





function createComments(comments) {
    let elems = comments.map((comment) => createMessage(comment)).join("")
    commentsContainer.innerHTML = elems
}

function clearComments() {
    commentsContainer.innerHTML = ""
}

function createMessage(singleCmtData) {
    return (`<div>
        <div class="comment-box">
        <div class="like-box">
            <div class='plus-btn' >  
                <img src="./images/icon-plus.svg" style="border: 3px solid red;" alt="icon-plus"  id=${singleCmtData.id} class="increment" >
            </div>
            <div>
                <p class="like-count" id="like-count">${singleCmtData.score}</p>
            </div>
            <div class='minus-btn'  >
                <img src="./images/icon-minus.svg" alt="icon-minus" style="border: 3px solid green;" id=${singleCmtData.id} class="decrement">
            </div>
        </div>
        <div class="user-cmt-box">
            <div class="user-detail-box">
                <div class="img-name-date-box">
                    <div class="img-box">
                        <img src=${singleCmtData.user.image.png} alt="${singleCmtData.username}" >
                    </div>
                    <div class="user-name-box">
                        <span class="user-name">${singleCmtData.user.username}</span><span class="month-ago">${singleCmtData.createdAt}</span>
                    </div>
                </div>
                <div class="">
                   
                    <span class="delete-icon ${singleCmtData.id}" >
                        <img src="./images/icon-delete.svg" alt="" id=${singleCmtData.id} class="delete-button">
                    </span>
                </div>
            </div>
            <div>
                <p class="user-cmt">${singleCmtData.content}</p>
            </div>
        </div>
        </div>
        
    
    </div>`)
}
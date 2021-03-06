// Initialize Firebase
var config = {
    apiKey: "AIzaSyAkb3MnH6v_md0utDAzTfDmB-tvxJTU8aA",
    authDomain: "blogapp-a08a8.firebaseapp.com",
    databaseURL: "https://blogapp-a08a8.firebaseio.com",
    projectId: "blogapp-a08a8",
    storageBucket: "",
    messagingSenderId: "828767861448"
};
firebase.initializeApp(config);
var blogs = firebase.database().ref('Blogs/');
var allblogs = [];
var index = 0;

var user ;


$(document).ready(function () {

   // console.log(firebase.auth().currentUser);

    $('#newblog').on('submit',(e) => {
        e.preventDefault();
       let blog = new Promise(function (resolve,reject) {
           $('#alert1').css({
               'display' : 'none'
           });
           newBlog();
           resolve();
       });

       blog.then(function () {
           $('#newblog').trigger("reset");
           $('#alert1').css('display','block');
           setTimeout(function () {
               $('#alert1').css('display','none');
           },3000);
       }).catch(function () {
           console.log('err');
       });
    });

    $('.newblgbtn').on('click',(e) => {
        e.preventDefault();
        
         window.location = 'newBlog.html';
            
        
    });
    if(window.location.pathname === '/index.html') {
       
        setTimeout(function(){
            user = firebase.auth().currentUser;
            console.log(user);

            togglebuttons();

            
        },1000);

        let fetchData = new Promise(function (resolve, reject) {
            fetchAllData();
            setTimeout(function () {
                resolve();
            }, 3000);
        });

        //console.log(allblogs)
        fetchData.then(function () {

            let ref1 = blogs.child(allblogs[index]).child('imgsource');
            let ref2 = blogs.child(allblogs[index]).child('blogtitle');
            let ref3 = blogs.child(allblogs[index]).child('views');
            let ref4 = blogs.child(allblogs[index]).child('blogcontent');
            // console.log(ref1 + ref2 + ref3 + ref4);
            ref1.on("value", function (snapshot) {
                $('#imgdisplay').addClass('animated fadeIn');
                $('#imgdisplay').attr('src', snapshot.val());
            });
            ref2.on("value", function (snapshot) {
                $('.card-title').addClass('animated fadeIn');
                document.querySelector(".card-title").textContent = snapshot.val();
            });
            ref3.on("value", function (snapshot) {
                $('.card-subtitle small').addClass('animated fadeIn');
                let text = `<b style="color: white">Views : </b><small style="color: white"></small>`;
                $('.card-subtitle').append(text);
                document.querySelector('.card-subtitle small').textContent = snapshot.val();
            });
            ref4.on("value", function (snapshot) {
                $('.card-text').addClass('animated fadeIn');
                document.querySelector('.card-text').textContent = snapshot.val().substr(0,400) + '...';
            });


        }).catch(function () {
            console.log('err');
        });

        $('.arrow-right').on('click', function () {
            $('#imgdisplay').removeClass('fadeIn');
            $('#imgdisplay').addClass('fadeOut');
            $('.card-title').removeClass('fadeIn');
            $('.card-title').addClass('fadeOut');
            $('.card-subtitle small').removeClass('fadeIn');
            $('.card-subtitle small').addClass('fadeOut');
            $('.card-text').removeClass('fadeIn');
            $('.card-text').addClass('fadeOut');
            index = (+index + 1) % (allblogs.length);
            let ref1 = blogs.child(allblogs[index]).child('imgsource');
            let ref2 = blogs.child(allblogs[index]).child('blogtitle');
            let ref3 = blogs.child(allblogs[index]).child('views');
            let ref4 = blogs.child(allblogs[index]).child('blogcontent');

            ref1.on("value", function (snapshot) {
                setTimeout(function () {
                    $('#imgdisplay').removeClass('fadeOut');
                    $('#imgdisplay').addClass('fadeIn');
                    $('#imgdisplay').attr('src', snapshot.val());
                }, 2000);
            });
            ref2.on("value", function (snapshot) {
                setTimeout(function () {
                    $('.card-title').removeClass('fadeOut');
                    $('.card-title').addClass('fadeIn');
                    document.querySelector(".card-title").textContent = snapshot.val();
                }, 2000);
            });
            ref3.on("value", function (snapshot) {
                setTimeout(function () {
                    $('.card-subtitle small').removeClass('fadeOut');
                    $('.card-subtitle small').addClass('fadeIn');
                    let text = `<b style="color:white">Views : </b><small style="color:white"></small>`;
                    $('.card-subtitle').html('');
                    $('.card-subtitle').append(text);
                    document.querySelector('.card-subtitle small').textContent = snapshot.val();
                }, 2000);

            });
            ref4.on("value", function (snapshot) {
                setTimeout(function () {
                    $('.card-text').removeClass('fadeOut');
                    $('.card-text').addClass('fadeIn');
                    document.querySelector('.card-text').textContent = snapshot.val().substr(0,400) + '...';
                }, 2000);

            });
        });


        $('.arrow-left').on('click', function () {
            $('#imgdisplay').removeClass('fadeIn');
            $('#imgdisplay').addClass('fadeOut');
            $('.card-title').removeClass('fadeIn');
            $('.card-title').addClass('fadeOut');
            $('.card-subtitle small').removeClass('fadeIn');
            $('.card-subtitle small').addClass('fadeOut');
            $('.card-text').removeClass('fadeIn');
            $('.card-text').addClass('fadeOut');
            index = (+index - 1);
            if (index < 0) {
                index = allblogs.length - 1;
            }
            let ref1 = blogs.child(allblogs[index]).child('imgsource');
            let ref2 = blogs.child(allblogs[index]).child('blogtitle');
            let ref3 = blogs.child(allblogs[index]).child('views');
            let ref4 = blogs.child(allblogs[index]).child('blogcontent');

            ref1.on("value", function (snapshot) {
                setTimeout(function () {
                    $('#imgdisplay').removeClass('fadeOut');
                    $('#imgdisplay').addClass('fadeIn');
                    $('#imgdisplay').attr('src', snapshot.val());
                }, 2000);


            });
            ref2.on("value", function (snapshot) {
                setTimeout(function () {
                    $('.card-title').removeClass('fadeOut');
                    $('.card-title').addClass('fadeIn');
                    document.querySelector(".card-title").textContent = snapshot.val();
                }, 2000);
            });
            ref3.on("value", function (snapshot) {
                setTimeout(function () {
                    $('.card-subtitle small').removeClass('fadeOut');
                    $('.card-subtitle small').addClass('fadeIn');
                    let text = `<b style="color: white;">Views : </b><small style="color: white;"></small>`;
                    $('.card-subtitle').html('');
                    $('.card-subtitle').append(text);
                    document.querySelector('.card-subtitle small').textContent = snapshot.val();
                }, 2000);

            });
            ref4.on("value", function (snapshot) {
                setTimeout(function () {
                    $('.card-text').removeClass('fadeOut');
                    $('.card-text').addClass('fadeIn');
                    document.querySelector('.card-text').textContent = snapshot.val().substr(0,400) + '...';
                }, 2000);

            });
        });

        let cContent = new Promise(function (resolve,reject) {
            setTimeout(function () {
                console.log(allblogs.length);
                createContent();
                resolve();
            }, 2000);
        });

        cContent.then(function () {
            $('.full-article').on('click',function () {
                let id = $(this).attr('val');
                sessionStorage.setItem('key',allblogs[+id]);
                // sessionStorage.setItem('user',user);
                sessionStorage.setItem('id',id);
                window.location = 'article.html';
            });
        }).catch(function () {
           console.log('errr');
        });


    }

    // cContent.then(function () {
    //     $('.full-article').on('click',function () {
    //         let id = $(this).attr('val');
    //         sessionStorage.setItem('id',id);
    //         window.location = 'article.html';
    //         EditDeleteBlog(id);
    //     });
    // }).catch(function () {
    //    console.log('errr');
    // });
    if(window.location.pathname === '/article.html'){

        setTimeout(function(){
            user = firebase.auth().currentUser;
            togglebuttons();
            let key = sessionStorage.getItem('key');
            // console.log('uppp');
            EditDeleteBlog(key);
        },1000);
        
        // let key = sessionStorage.getItem('key');
        // // console.log('uppp');
        // EditDeleteBlog(key);
    }
    $('.signupbtn').on('click',function(e){
        e.preventDefault();
        window.location = 'Signupform.html';
            // togglebuttons();
        
    });

    $('#signupformbtn').on('click',function(e){
        e.preventDefault();
        let email = $('#emailip').val();
        let password = $('#passwordip').val();

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(){
            $('#customalert').addClass('slideInUp');
            $('#customalert').css('display','block');
            $('#signupform').trigger('reset');

            setTimeout(function(){
                $('#customalert').removeClass('slideInUp');
                $('#customalert').css('display','none');
                 user = firebase.auth().currentUser;
                 console.log(user);
                window.location = 'index.html';
                return false;
            },2000)
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
       
    });

    $('.signout').on('click',function(e){
        e.preventDefault();
        firebase.auth().signOut().then(function() {
            console.log('signedout')
          }).catch(function(error) {
            // An error happened.
            console.log('errrr')
          });

          setTimeout(function(){
            location.reload();
          },2000)
    });

    $('.loginbtn').on('click',function(e){
        e.preventDefault();
        window.location = 'login.html';
    });


    $('#loginformbtn').on('click',function(e){
        e.preventDefault();
        let email = $('#emailip').val();
        let password = $('#passwordip').val();

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(){
              $('#loginform').trigger('reset');
        
             setTimeout(function(){
                   user = firebase.auth().currentUser;
                   console.log(user);
                   window.location = 'index.html';
                    return false;
             },2000)
        })
            .catch(function(error) {
        // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
       
    });

    
});


function newBlog(){
    let imgsrc = $('#img-src').val();
    let blogtitle = $('#blogtitle').val();
    let blogcontent = $('#blogcontent').val();
    let views = 0;

   // console.log(imgsrc + blogcontent + blogtitle);
    createBlog(imgsrc,blogtitle,blogcontent,views);
}

function createBlog(src,title,content,views) {
    console.log(blogs);
    let blogref = blogs.push();
    blogref.set({
        imgsource : src,
        blogtitle : title,
        blogcontent : content,
        views : views
    });
}


function fetchAllData() {
    blogs.on("value",function (snapshot) {
       snapshot.forEach(function (child) {
           //console.log(child);
           allblogs.push(child.key);
       });
    });

    console.log(allblogs);
}



function createContent() {
    console.log('hiii')
    console.log(allblogs.length)
    $('#content').html('');
    for(let i = 0; i < allblogs.length ;i++){
        appendContent(allblogs[i],i);
    }
}

function appendContent(key,id) {
    console.log(key)
    let output = '';
    let ref1 = blogs.child(key).child('imgsource');
    let ref2 = blogs.child(key).child('blogtitle');
    let ref3 = blogs.child(key).child('blogcontent');
    let ref4 = blogs.child(key).child('views');

    let imgval = '';
    let titleval = '';
    let contentval = '';
    let viewsval = '';

    ref1.on("value",function (snapshot) {
        imgval = snapshot.val();
    });
    ref2.on("value",function (snapshot) {
        titleval = snapshot.val();
    });
    ref3.on("value",function (snapshot) {
        contentval = snapshot.val().substr(0,150) + '...';
    });
    ref4.on("value",function (snapshot) {
        viewsval = snapshot.val();
    });

    output = `
   
            <div style="margin-bottom: 40px;" class="col col-4">
                <div class="card" style="width: 20rem;padding: 20px;height: 530px">
                    <img height="200px" class="card-img-top" src="${imgval}" alt="Card image cap">
                    <div class="card-body text-center">
                        <h4 style="text-transform: capitalize" class="card-title">${titleval}</h4>
                        <p class="card-text">${contentval}</p>
                        <a val=${id} href="#" class="btn btn-primary full-article">Full Article</a>
                    </div>
                </div>
            </div>
    
    
    `;

    $('#content').append(output);
}

function EditDeleteBlog(key) {

    let view = '';
    let output = '';

    let ref = firebase.database().ref('/Blogs/' + key + '/views');
    let ref1 = blogs.child(key).child('imgsource');
    let ref2 = blogs.child(key).child('blogtitle');
    let ref3 = blogs.child(key).child('blogcontent');
    let ref4 = blogs.child(key).child('views');

    let imgval = '';
    let titleval = '';
    let contentval = '';
    let viewsval = '';


    ref1.on("value",function (snapshot) {
        imgval = snapshot.val();
        //console.log(imgval)

    });
    ref2.on("value",function (snapshot) {
        titleval = snapshot.val();
    });
    ref3.on("value",function (snapshot) {
        contentval = snapshot.val();
    });
    ref4.on("value",function (snapshot) {
        viewsval = snapshot.val();
        view = snapshot.val();
       
    });
   
    setTimeout(function(){
        view++;
        ref.set(view);
    },2000);
    




    setTimeout(function () {
        output = `
    
       <img height="450px" class="card-img-top" src="${imgval}" alt="Card image cap">
        <div  class="card-body text-center">
            <div>
                <h1 style="font-weight: 600;text-transform: capitalize">${titleval}</h1>
                <p>${contentval}</p>
                <span style="display: block;">Views : ${viewsval}</span>
                <a id='editbtn' href="#" class="btn btn-success ">Edit Blog</a>
                <a id='deletebtn' href="#" class="btn btn-danger ">Delete Blog</a>
            </div>
        </div>
    `;

        $('#articleED').html(output);
        $('#deletebtn').on('click',function(){
            let alrt = confirm('Are you Sure To Delete This Blog');
            if(alrt == true){
                deleteBlog(key);
            };
        });
        $('#editbtn').on('click',function(){
            editBlog(key);

          
                $('#articleback2').css({
                    'display' : 'none'
                });
                $('#articleback').css({
                    'background-color':'rgba(0,0,0,.7)',
                    'height' : '800px'
                });
                $('#customM').css('display','block');
                $('#customM').addClass('slideInDown')
    
                $('#cancel').on('click',function(){
                    setTimeout(function(){
                        $('#articleback2').css({
                            'display' : 'block'
                        });
                        $('#articleback').css({
                            'background-color':'white',
                        });
                        $('#customM').css('display','none');
                    },800);
                    $('#customM').removeClass('slideInDown')
                    $('#customM').addClass('slideOutUp')
    
                });
            
        

        });

    },3000);

}

function deleteBlog(key){
    let id = sessionStorage.getItem('id');

    let ref = firebase.database().ref('/Blogs/' + key);
    ref.remove();
    allblogs.splice(id,1);
    window.location = 'index.html';
}
function editBlog(key){
    let ref1 = blogs.child(key).child('imgsource');
    let ref2 = blogs.child(key).child('blogtitle');
    let ref3 = blogs.child(key).child('blogcontent');

    let imgval = '';
    let blogtitle = '';
    let blogcontent = '';
    ref1.on('value',function(snapshot){
        imgval  = snapshot.val();
    });
    ref2.on('value',function(snapshot){
        blogtitle  = snapshot.val();
    });
    ref3.on('value',function(snapshot){
        blogcontent  = snapshot.val();
    });

      document.getElementById('src2').value = imgval;
      document.getElementById('blogtitle2').value = blogtitle;
      document.getElementById('blogcontent2').value = blogcontent;

      $('#submitEB').on('click',function(){
       let ival =  document.getElementById('src2').value ;
       let tval = document.getElementById('blogtitle2').value ;
       let cval = document.getElementById('blogcontent2').value ;

       let ref = firebase.database().ref('/Blogs/' + key + '/views');

       let reff1 = firebase.database().ref('/Blogs/' + key + '/imgsource');
       let reff2 = firebase.database().ref('/Blogs/' + key + '/blogtitle');
       let reff3 = firebase.database().ref('/Blogs/' + key + '/blogcontent');

       reff1.set(ival);
       reff2.set(tval);
       reff3.set(cval);

    //    $('#updateBlog').trigger('reset');
    //    $('#alert2').css('display','block');

    //    setTimeout(function(){

    //    })
       window.location = 'index.html';
       return false;
      });
    
}

function togglebuttons(){
    console.log(user)
    if(user != null){
        $('.newblgbtn').css('display','block');
        $('.signupbtn').css('display','none');
        $('.loginbtn').css('display','none');
        $('.signout').css('display','block');
        // $('#submitEB').css('display','block');
        // $('#cancel').css('display','block');
    }else{
        $('.newblgbtn').css('display','none');
        $('.signupbtn').css('display','block');
        $('.loginbtn').css('display','block');
        $('.signout').css('display','none');
    }
}
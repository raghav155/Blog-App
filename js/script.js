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


$(document).ready(function () {
    $('#newblog').on('submit',(e) => {
        e.preventDefault();
       let blog = new Promise(function (resolve,reject) {
           $('.alert').css({
               'display' : 'none'
           });
           newBlog();
           resolve();
       });

       blog.then(function () {
           $('#newblog').trigger("reset");
           $('.alert').css('display','block');
           setTimeout(function () {
               $('.alert').css('display','none');
           },3000);
       }).catch(function () {
           console.log('err');
       });
    });

    $('#newblgbtn').on('click',() => {
        window.location = 'newBlog.html';
        return false;
    });
    if(window.location.pathname === '/index.html') {
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
        let key = sessionStorage.getItem('key');
        console.log('uppp');
        EditDeleteBlog(key);
    }

    
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
    });



    setTimeout(function () {
        output = `
    
       <img height="450px" class="card-img-top" src="${imgval}" alt="Card image cap">
        <div  class="card-body text-center">
            <div>
                <h1 style="font-weight: 600;text-transform: capitalize">${titleval}</h1>
                <p>${contentval}</p>
                <span style="display: block;">Views : ${viewsval}</span>
                <a  href="#" class="btn btn-success ">Edit Blog</a>
                <a  href="#" class="btn btn-danger ">Delete Blog</a>
            </div>
        </div>
    `;

        $('#articleED').html(output);
    },3000);

}
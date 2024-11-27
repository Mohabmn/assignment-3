var bookmarkName = document.getElementById("bookmarkName");
var websirteUrl = document.getElementById("websirteUrl");
var overlay=document.getElementById("overlay");
var alert=document.getElementById("alert");
var exitButton = document.getElementById("exitButton");
var bookmarks = []

if (localStorage.getItem("bookmarksTable")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksTable"));
    displayBookmarks();
}

function addWebsite() {
    
    var bookmark = {
        bname: bookmarkName.value,
        burl: websirteUrl.value,
    }
    
    if(bookmark.bname === "" || bookmark.burl === ""){
        openAlert();
        return;
    }

    if(bookmark.bname.length < 3){
        openAlert();
        rightInput();
        return;
    }

    if(!bookmark.burl.startsWith("https://") && !bookmark.burl.startsWith("http://")){
        openAlert();
        return;
    }
    
    var exist;
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].bname == bookmark.bname) {
            exist = true;
            break;
        }
    }

    if (exist == true) {
        openAlert();
        
    } else {
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarksTable", JSON.stringify(bookmarks));
        clear();
        displayBookmarks();
    }
       
    
}

function clear() {
    bookmarkName.value = "";
    websirteUrl.value = "";
}

function displayBookmarks() {
    var bookmarkContainer = ``
    for (var i = 0; i < bookmarks.length; i++) {
        bookmarkContainer += `
                <tr>
                    <td>${i+1}</td>
                    <td>${bookmarks[i].bname}</td>
                    <td class="d-flex justify-content-center"> 
                         <button onclick="visitWebsite(${i})" class="visit d-flex justify-content-around pt-2 pb-2">
                            <div class="visit-content d-flex justify-content-evenly ">
                                <div class="icon"> <i class="fa-solid fa-eye"></i></div>
                                <div class="text">Visit</div>
                            </div>
                         </button>
                    </td>
                    <td>
                        <button onclick="deletebookmark(${i})" class="delete pe-5 pt-2 pb-2">
                            <div class="delete-content d-flex justify-content-evenly ">
                                <div class="icon"><i class="fa-solid fa-trash"></i></div>
                                <div class="text">Delete</div>
                            </div>
                        </button>
                    </td>
                </tr>
        `
    }
    document.getElementById("tabel").innerHTML = bookmarkContainer;
}

function deletebookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarksTable", JSON.stringify(bookmarks));
    displayBookmarks();
}


function visitWebsite(index) {
    window.location.href = bookmarks[index].burl;
}

function closeAlert(){
    overlay.classList.add("d-none")
    alert.classList.add("d-none")
}
function openAlert(){
    overlay.classList.remove("d-none")
    alert.classList.remove("d-none")
}

function wrongInputName(){
    if(bookmarkName.value.length < 3){
        bookmarkName.classList.remove("normal-input");
        bookmarkName.classList.add("wrongInput");
        bookmarkName.classList.remove("rightInput");
    }else{
        bookmarkName.classList.remove("normal-input");
        bookmarkName.classList.add("rightInput");
    }
}

function wrongInputUrl(){
    if(!(websirteUrl.value.startsWith("https://")) && !(websirteUrl.value.startsWith("https://"))){
        websirteUrl.classList.remove("normal-input");
        websirteUrl.classList.add("wrongInput");
        websirteUrl.classList.remove("rightInput");
    }else{
        websirteUrl.classList.remove("normal-input");
        websirteUrl.classList.add("rightInput");
    }
}





var exhibit = {};
var exhibitID;  // stores the exhibitID after saving

window.onload = function() {
    createNavBar();
    var data = {"backgroundColour": "#e02d00", "noPages": 1, "title": "F1", "divs": [{"id": "title", "top": "43px", "left": "91.6px", "width": "1228.8px", "height": "100px", "borderWidth": "5px", "paddingT": "0px", "paddingL": "0px", "textAlign": "center", "shadow": "none", "z": "auto", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgb(255, 255, 255)"}, {"id": "image1", "top": "173px", "left": "204px", "width": "200px", "height": "200px", "borderWidth": "10px", "textAlign": "center", "shadow": "rgb(128, 128, 128) 10px 10px 10px 0px", "z": "2", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgb(255, 255, 255)"}, {"id": "textbox1", "top": "344px", "left": "308px", "width": "500px", "height": "141px", "borderWidth": "10px", "paddingT": "0px", "paddingL": "0px", "textAlign": "left", "shadow": "none", "z": "1", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgb(255, 255, 255)"}, {"id": "textbox2", "top": "447px", "left": "862px", "width": "500px", "height": "141px", "borderWidth": "10px", "paddingT": "0px", "paddingL": "0px", "textAlign": "left", "shadow": "none", "z": "1", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgb(255, 255, 255)"}, {"id": "image2", "top": "268px", "left": "1214px", "width": "200px", "height": "200px", "borderWidth": "10px", "textAlign": "center", "shadow": "rgb(128, 128, 128) 10px 10px 10px 0px", "z": "2", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgb(255, 255, 255)"}], "noImages": 2, "noTextboxes": 2}
    createModals();
    exhibitData = data;
    createHdrFtr();
    editThumbs();
    editTray();
    generateTemplate(data);
    createTitle();
    createTextEditors();
    createImages();
}

function createNavBar() {
    console.log("Creating NavBar");
    var nav = document.createElement("div");
    nav.id = "navbar-holder";
    nav.innerHTML = addNavBar();
    document.body.appendChild(nav);
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

    // Get the navbar
    var navbar = document.getElementById("navbar");

    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }
}
function prev(input) {
    console.log("Loaded prev method");
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            var i = document.getElementById("preview-this");
            i.src = e.target.result;
            i.style.display = "block";
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

function addNavBar() {
    return `
    <style>
        .nav-btn {
            margin: 5px;
        }
    </style>
    <button id="open-nav" class="btn btn-sm btn-basic" onclick=toggleNav() style="z-index: 9990; display:none; margin:15px" type="button">menu</button>
    <nav id=navbar class="navbar navbar-expand-md navbar-dark" id="control-panel" style="background-color: rgb(214, 214, 212)">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <div class="mr-2">
			    <a id="exhibit-logo" class="navbar-brand dropdown-toggle" role="button" data-toggle="dropdown">EXHIBIT</a>
			    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          			<a class="dropdown-item btn" role="button" data-toggle="modal" data-target="#login-modal">Log in / sign up</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Browse archival content</a>
                    <div class="dropdown-divider"></div>
				    <a class="dropdown-item" id="logout" href="">Logout</a>
                </div>
            </div>
            <p style="margin-top: 15px; font-size:smaller" id="user">logged in: no one logged in.</p>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav ml-auto">
                <li><button id="help-modal-bttn" class="nav-btn btn btn-sm btn-outline-secondary" type="button" data-target="#helpModal" data-toggle="modal">help</button></li>
                <li><button id="save-modal-bttn" class="nav-btn btn btn-sm btn-outline-secondary" type="button" data-target="#saveModal" data-toggle="modal">save exhibit</button></li>
                <li><button id="view" class="nav-btn btn btn-sm btn-outline-secondary" onclick=view() type="button">view exhibit</button></li>
                <li><button id="browse" class="nav-btn btn btn-sm btn-outline-secondary" onclick=browse() type="button">browse</button></li>
                <li><button id="download" class="nav-btn btn btn-sm btn-outline-secondary dropdown-toggle" data-toggle="dropdown" type="button">download exhibit</button>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-style" style="margin-right:57px;" aria-labelledby="dropdownMenuButton" >
                        <a download class="dropdown-item dropdown-item-style" href="${pdfName('exhibit',exhibitID)}" >download PDF</a>
                        <a download class="dropdown-item dropdown-item-style" href="${htmlName('exhibit',exhibitID)}" >download HTML</a>
                    </div>
                </li>
                <li><button id="close-nav" class="nav-btn btn btn-sm btn-danger" onclick=toggleNav() type="button">close</button></li>
            </ul>
        </div>
    </nav>
    `
}

function pdfName(title, key){
    var pdf = title.replace(/[^a-zA-Z0-9]/ig, "");	
    var cleanPDF = pdf+"_"+key+".pdf";
    return "./"+cleanPDF;
}

function htmlName(title, key){
    var html = title.replace(/[^a-zA-Z0-9]/ig, "");
    var cleanHTML = html+"_"+key+".html";
    return "./"+cleanHTML;
}

function toggleNav() {
    var nav = document.getElementById("navbar");
    if(nav.style.display == "none") {   // currently hiding
        // display the navigation bar
        nav.style.display = "block";
        document.getElementById("open-nav").style.display = "none";
    } else {    // currently displaying
        // hide the navigation bar
        nav.style.display = "none";
        document.getElementById("open-nav").style.display = "block";
    }
}

function view() {
    console.log("Opening view");
    window.open("http://3.134.107.128/~ubuntu/cgi-bin/viewExhibit.py?exhibitID=" + exhibitID);
}

function browse() {
    console.log("Opening browse");
    window.open("http://3.134.107.128/~ubuntu/cgi-bin/browse.py","_self");
}

function createModals() {
    console.log("Creating modals...");
    var modalHolder = document.createElement("div");
    modalHolder.id = "modal-holder";
    modalHolder.innerHTML = addModals();
    document.body.appendChild(modalHolder);

    $("#customUpload").on("change", function(e){
        console.log("Changing image");
        document.getElementById("noimage-svg").style.display = "none";
        document.getElementById("customUploadLabel").textContent = e.target.files[0].name;
        prev(this);
    });

    $("#closeUploadModal").on("click", function(e){
        console.log("Closing modal");
        e.preventDefault();
        document.getElementById("preview-this").style.display = "none";
        document.getElementById("noimage-svg").style.display = "block";
        document.getElementById("customUploadLabel").textContent = "Choose an image";
    });

    $("#save-btn").on("click", function(e){
        e.preventDefault();
        console.log("Saving the exhibit");
        saveExhibit();
    });

    if($("#uploadModal").hasClass('in')){
        console.log("Upload modal is shown");
    } else {
        console.log("Upload modal is hidden");
    }
}

function addModals() {
    return `
    <!-- HELP MODAL -->
    
    <div class="my-modal modal fade" id="helpModal" tabindex="-1" role="dialog" aria-labelledby="helpModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="helpModalLabel">Help</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h6>Viewing Exhibits</h6>
                <p>To view an exhibit it must first be saved. After saving the exhibit click on the view button.</p>
                <h6>Uploading Images</h6>
                <p>Hover your mouse pointer over the image box to bring up the upload option.</p>
                <div style="position:relative; margin:auto; display:block; width:90%; height:200px;">
                    <img id="help-image" style="border-radius:5px; border:1px solid #cfd3d9; position:relative; margin:auto; display:block; width:90%; height:200px;" src="./help_image.gif">
                </div>
                <p></p>
                <h6>Editing Text</h6>
                <p>Click once on the textbox to bring up the text editor. Double click on the text editor menu bar to close the text editor.</p>
                <div style="position:relative; margin:auto; display:block; width:90%; height:200px;">
                    <img id="help-textbox" style="border-radius:5px; border:1px solid #cfd3d9; position:relative; margin:auto; display:block; width:90%; height:200px;" src="./help_textbox.gif">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
    
    <!-- IMAGE UPLOAD MODAL -->

    <div class="my-modal modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="uploadModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="uploadModalLabel">Image Upload</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="localForm" action="./ajax.py" method="post" enctype="multipart/form-data">
                    <div class="row" style="margin-bottom: 20px;">
                        <div class="col">
                            <input type="text" id="fileName" name="fileName" class="form-control" placeholder="(Optional) Enter a filename">
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 20px; margin-left: 1px; margin-right: 1px">
                        <div class="col custom-file">
                            <input type="file" class="custom-file-input" style="margin: 20px" id="customUpload" name="currentForm">
                            <label id=customUploadLabel class="custom-file-label" style="color: #6f757c;" for="customUpload">Choose an image</label>
                        </div>
                    </div>
                </form>
                <div id="preview-area" style="width:200px; height:200px; position:relative; margin:auto; border-radius:5px; border:1px solid #cfd3d9;">
                    <img id="preview-this" style="border-radius:4px; display:none; width:100%; height:100%; position:relative; margin:auto">
                    <svg id="noimage-svg" style="display:flex; position:relative; opacity: 0.9; margin-top: 60px; margin-left: 77px;" width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-card-image" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9c0 .013 0 .027.002.04V12l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15 9.499V3.5a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm4.502 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                </div>
            </div>
            <div class="modal-footer">
                <button id="closeUploadModal" type="button" class="btn btn-secondary" data-dismiss="modal">close</button>
                <button type="submit" class="btn btn-primary">upload</button>
            </div>
            </div>
        </div>
    </div>

    <!-- SAVE MODAL -->

    <div class="my-modal modal fade" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="saveModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="saveModalLabel">Save Exhibit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form style="padding:10px" id='save-form' action='./ajaxTest.py' method='post' enctype='multipart/form-data'>
                    <div class="row" style="margin-bottom: 20px;">
                        <div class="col">
                            <input id="exhibitName" type="text" class="form-control" placeholder="Enter exhibit name" name="exhibitName">
                        </div>
                        <div class="col">
                            <input id="creatorName" type="text" class="form-control" placeholder="Enter your name" name="creatorName">
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 20px;">
                        <div class="col">
                            <input id="descText" type="text" class="form-control" placeholder="Enter a description" name="descText">
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 20px; margin-left: 1px; margin-right: 1px">
                        <div class="col custom-file">
                            <input type="file" class="custom-file-input" style="margin: 20px" id="customFile">
                            <label id=customFileLabel class="custom-file-label" style="color: #6f757c;" for="customFile">Upload a cover image</label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">close</button>
                <button id="save-btn" type="button" class="btn btn-primary">save changes</button>
            </div>
            </div>
        </div>
    </div>
    `
}

function createTextbox(textbox, i) {
    var textboxDiv = document.getElementById("textbox-div");
    console.log("Creating textbox holder for text editor");

    var d = document.createElement("div");
    var e = document.createElement("textarea");
    d.id = "textbox-holder" + i;
    e.id = "texteditor-test" + i;

    d.appendChild(e);

    d.style.zIndex = textbox.parentElement.style.zIndex;
    console.log("ZIndex = " + d.style.zIndex);
    d.style.width = textbox.parentElement.style.width;
    console.log("Width = " + d.style.width);
    d.style.height = textbox.parentElement.style.height;
    console.log("Height = " + d.style.height);
    d.style.position = textbox.parentElement.style.position;
    console.log("Position = " + d.style.position);
    d.style.top = textbox.parentElement.style.top;
    console.log("Top = " + d.style.top);
    d.style.left = textbox.parentElement.style.left;
    console.log("Left = " + d.style.left);
    d.style.border = "none";

    e.style.width = "100%";
    e.style.height = "100%";

    d.style.display = "none";
    addTextboxClick(textbox, i);
    textboxDiv.appendChild(d);
}

function addTextboxClick(textbox, i) {
    textbox.addEventListener("click", function(e){
        console.log("Opening textbox");
        e.preventDefault();
        addCkeditor(textbox, i);
    });
}

function addCkeditor(textbox, i) {
    //get the textbox from the textbox div
    var holder = document.getElementById("textbox-holder"+i);
    var ws = document.getElementById("workspace");
    ws.style.opacity = "0.3";

    holder.style.display = "block";

    /*
    holder.addEventListener("dblclick", function(e){
        e.preventDefault();
        hideCkeditor(textbox, i);
    })
    ;*/
    $(document).click(function(){
        hideCkeditor(textbox, i);
    });

    var editor = "texteditor-test" + i;
    CKEDITOR.replace(editor, {
        width: "100%",
        height: "100%",
        toolbarGroups: [
            { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
            { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
            { name: 'forms', groups: [ 'forms' ] },
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'insert', groups: [ 'insert' ] },
            '/',
            { name: 'paragraph', groups: [ 'align', 'indent', 'list', 'blocks', 'bidi', 'paragraph' ] },
            { name: 'links', groups: [ 'links' ] },
            '/',
            { name: 'styles', groups: [ 'styles' ] },
            { name: 'colors', groups: [ 'colors' ] },
            { name: 'tools', groups: [ 'tools' ] },
            { name: 'others', groups: [ 'others' ] },
            { name: 'about', groups: [ 'about' ] }
	    ],
        removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Anchor,Image,Flash,Smiley,Iframe,ShowBlocks,Maximize'
    });
}

function createHdrFtr() {

    /* ========== HEADER AND IMAGE TRAY CODE ========== */
    /* ========== HEADER DIV CODE ========== */

    // creating the header element to store save button
    var header = document.createElement("div");
    header.id = "header";
    header.className = "header";

    var textboxDiv = document.createElement("div");
    textboxDiv.id = "textbox-div";
    document.body.appendChild(textboxDiv);
    // add the save button to the header div
    //header.appendChild(saveBtn);
    //header.appendChild(trayBtn);

    // add the header to the body tag
    document.body.appendChild(header);

    /* ========== IMAGE TRAY CODE ========== */

    // creating the image tray element to store archive images
    var tray = document.createElement("div");
    tray.id = "tray";

    // styling the tray for testing
    tray.style.backgroundColor = "ghostwhite";
    tray.style.position = "absolute";
    tray.style.border = "2px solid black";
    tray.style.top = "500px";
    tray.style.left = "0px";
    tray.style.zIndex = "9000";
    tray.style.display = "none";

    // close button for tray
    var trayCloseBtn = document.createElement("button");
    trayCloseBtn.id = "tray-close-btn";
    trayCloseBtn.textContent = "X";
    trayCloseBtn.style.backgroundColor = "rgb(173, 24, 24)";
    trayCloseBtn.style.color = "white";
    trayCloseBtn.style.padding = "5px";
    trayCloseBtn.style.border = "none";
    trayCloseBtn.style.margin = "10px";2
    trayCloseBtn.style.position = "absolute";
    trayCloseBtn.style.top = "0";
    trayCloseBtn.style.right = "0";
    trayCloseBtn.onclick = showTray;

    tray.appendChild(trayCloseBtn);

    tray.style.width = "100%";
    tray.style.height = "500px";

    var thumbnail = "thumbnail";
    var preview = "archive-preview";
    createThumbs(thumbnail, preview, tray);

    // add the tray to the document body
    document.body.appendChild(tray);

}

function createThumbs(thumbnail, preview, tray) {

    for(var i = 1; i <= 11; i++) {
        console.log("Creating thumbnail " + i);
        var t = document.createElement("div");
        t.id = thumbnail+i;
        t.className = "thumbs";
        t.style.textAlign = "center";
        t.style.border = "1px solid black";
        t.style.padding = "10px";
        t.style.margin = "10px";
        t.style.minWidth = "11%";
        t.style.flex = "1 1 auto";

        // create image preview
        var p = document.createElement("img");
        p.id = preview + i;
        p.className = "preview";
        p.src = "http://3.134.107.128/~ubuntu/images/"+i+".jpeg";
        p.style.width = "110px";
        p.style.height = "110px";
        p.style.position = "relative";
        p.style.top = "50%";
        p.style.transform = "translateY(-75%)";

        t.appendChild(p);   // image must go first!
        tray.appendChild(t);
        console.log("thumb added");
    }
}

function editThumbs() {
    console.log("editing tray to accommodate thumbs");

    console.log("Editing the thumbnails");
    var t = document.getElementsByClassName("thumbs");
    for (var i = 0; i < t.length; i++) {
        t[i].style.backgroundColor = "white";
        t[i].style.minWidth = t.length + "%";
        t[i].style.flex = "1 1 auto";
    }
}

function generateTemplate(data) {
    console.log("Loading the page...");
    document.body.style.backgroundColor = data.backgroundColour;

    document.getElementById("workspace").innerHTML=`${data.divs.map(makeDiv).join("")}`
    // create the template elements
    function makeDiv(div) {
        var t = "textbox";
        var i = "image";
        if((div.id).includes(t)) {
            console.log("Adding class textbox...");
            return `
                <div class="textbox clickable" id="${div.id}" style="position:absolute;border-style:solid;border-width:${div.borderWidth};padding:${div.padding};text-align:${div.textAlign};box-shadow:${div.shadow};z-index:${div.z};border-color:${div.borderColor};position:absolute;height:${div.height};width:${div.width};top:${div.top};left:${div.left};background-color:${div.backgroundColor}">
                <p>PlaceHolder</p>
                </div>
            `
        } else if((div.id).includes(i)) {
            console.log("Adding class image...");
            return `
                <div class="image clickable" id="${div.id}" style="position:absolute;border-style:solid;border-width:${div.borderWidth};padding:${div.padding};text-align:${div.textAlign};box-shadow:${div.shadow};z-index:${div.z};border-color:${div.borderColor};position:absolute;height:${div.height};width:${div.width};top:${div.top};left:${div.left};background-color:${div.backgroundColor}">
                <p>PlaceHolder</p>
                </div>
            `
        }
        return `
            <div class="clickable" id="${div.id}" style="position:absolute;border-style:solid;border-width:${div.borderWidth};padding:${div.padding};text-align:${div.textAlign};box-shadow:${div.shadow};z-index:${div.z};border-color:${div.borderColor};position:absolute;height:${div.height};width:${div.width};top:${div.top};left:${div.left};background-color:${div.backgroundColor}">
            <p>PlaceHolder</p>
            </div>
        `
    }
    console.log("Item added to page");
}

//  =================== EDIT TEMPLATE ELEMENTS TO MAKE EXHIBIT ===================

function createTitle() {
    // ========== TITLE AREA CODE ==========
    // change the title div to a textarea
    var title = document.getElementById("title");
    title.innerHTML = addTitle();
    var titleArea = document.getElementById("titleArea");
    titleArea.style.backgroundColor = title.style.backgroundColor;

    // set the style of the title textarea (must match template specifications)
    titleArea.style.width = "100%";
    titleArea.style.height = "100%";
    titleArea.style.borderWidth = 0;
    titleArea.style.resize = "none";
    titleArea.style.padding = "inherit";

    document.getElementById("title-editor").style.display = "none";

    createTextbox(titleArea, 0);
}

// function to create new textarea for title specifically
function addTitle() {
    console.log("Creating the title");
    return `
        <div id=titleArea><textarea id=title-editor></textarea></div>
    `
}

/* ========== TEXTBOX CODE ========== */
function createTextEditors() {
    // changing all textbox divs to textareas
    var textboxes = document.getElementsByClassName("textbox");
    var noTextboxes = textboxes.length;
    for(var i = 1; i <= textboxes.length; i++) {
        console.log("Number of remaining textbox items is " + (noTextboxes - i));
        var id_num = (i-1);
        //var textboxId = "textbox" + id_num; // id for textarea
        
        var textbox = textboxes[id_num]; // storing the textbox (parent div of textarea)
        // set clean IDs
        console.log("Scrubbing textbox IDs");
        textbox.id = "textbox"+i;

        console.log("We are able to fetch element " + textbox.id);

        textbox.innerHTML = addTextArea(); // changing inner HTML of parent div
                
        var textArea = document.getElementById("textId"); // storing the textarea (inside div textbox)   
        textArea.id = "textarea-div"+i; // change textarea attrs to match template
        //textArea.style.marginBottom = textbox.style.borderWidth;
        //textArea.style.marginRight = textbox.style.borderWidth;

        // set the style of the title textarea
        textArea.style.width = "100%";
        textArea.style.height = "100%";
        textArea.style.top = textbox.style.top;
        textArea.style.left = textbox.style.left;
        textArea.style.borderWidth = 0;
        textArea.style.resize = "none";
        textArea.style.backgroundColor = textbox.style.backgroundColor;
        textArea.style.border = textbox.style.padding;
        textArea.style.textAlign = textbox.style.textAlign;

        createTextbox(textArea, i);

        console.log("Textbox styled successfully");

        var textEditor = document.getElementById("texteditor");
        textEditor.id = "texteditor"+i;     // make the id unique
        textEditor.className = "te";
        textEditor.style.display = "none";
    }
}

// function to create new textarea for textboxes specifically
function addTextArea() {
    return `<div id=textId class=editor-data><textarea id=texteditor></textarea></div>`
    console.log("TextArea added");
}

/* ========== IMAGE BOX CODE ========== */

function createImages() {
    // changing all image divs to allow image upload and display
    var images = document.getElementsByClassName("image");
    var noImages = images.length;
    for(var i = 1; i <= images.length; i++) {
        console.log("Number of remaining image items is " + (noImages - i));
        var imageId = (i-1); // id for the image
        var mainImageDiv = images[imageId]; // id for the image box (div)
        // set clean IDs
        console.log("Scrubbing image IDs");
        mainImageDiv.id = "image"+i;
        mainImageDiv.innerHTML = addImage(); // add the image to the image box

        // access all necessary elements
        // the image div - holds form and preview
        var imageDiv = document.getElementById("img-div");
        imageDiv.id = "img-div"+i;
        imageDiv.style.width = "100%";
        imageDiv.style.height = "100%";
        imageDiv.style.display = "none";
   
        // the upload area
        var uploadDiv = document.getElementById("upload-area");
        uploadDiv.id = "upload-area"+i;
        
        // the actual image preview
        var previewDiv = document.getElementById("preview");    
        previewDiv.id = "preview"+i;
        previewDiv.style.display = "block";

        // the image tag
        // make image preview take up whole div
        var imageSrc = document.getElementById("img");
        imageSrc.id = "img"+i;

        imageSrc.style.width = "100%";
        imageSrc.style.display = "block";

        // get menu button and edit style 
        var menuBtn = document.getElementById("menu-btn");
        menuBtn.id = "menu-btn" + i;  // create unique id
        menuBtn.style.border = "none";
        //menuBtn.onclick = createMenu(i);

        addImageHover(mainImageDiv, imageDiv, uploadDiv);
    }
}

function addImageHover(mainImageDiv, imgHolder, uploadDiv) {
    mainImageDiv.addEventListener("mouseover", function(e){
        imgHolder.style.display = "flex";
        uploadDiv.style.display = "none";
    });

    mainImageDiv.addEventListener("mouseout", function(e){
        imgHolder.style.display = "none";
        uploadDiv.style.display = "block";
    });
}

// function to add the forms and preview areas to image box
function addImage() {
    return `
    <div class="img-divs" id="img-div" style="display:none; text-align:center; align-items:center; padding-bottom:25px;">
        <button id="menu-btn" class="menu-btns btn btn-sm btn-primary" style="position:relative; vertical-align: middle; margin: auto" type="button" data-target="#uploadModal" data-toggle="modal">upload</button>
        <button id="archive-btn" class="btn btn-sm btn-primary" style="position:relative; vertical-align: middle; margin: auto" type="button">archive</button>
    </div>
    <div id="upload-area">
        <div id="preview">
            <img class="view" alt="Image preview" src="https://arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/ELE2VGM36FEQXEZVWW5MVKM52A.png" id=img>
        </div>
    </div>
    `
}

function submitForm() {
    console.log("submitting form data");
}

// showTray function to display tray onclick event
function showTray() {
    var t = document.getElementById("tray");
    if(t.style.display == "none") {
        console.log("editing the tray!");
        t.style.display = "block";
        // edit tray to size thumbs
        t.style.display = "flex";
        t.style.flexWrap = "wrap";

        // edit thumbs
        var ts = document.getElementsByClassName("thumbs");
        for (var i = 0; i < ts.length; i++) {
            ts[i].style.backgroundColor = "white";
            ts[i].style.minWidth = ts.length + "%";
            ts[i].style.flex = "1 1 auto";
        }
        console.log("displaying tray");
    } else {
        t.style.display = "none";
        console.log("hiding tray");
    }
}

// function to hide the form element after button click
function hideForm(elem) {
    document.getElementById(elem.parentNode.id).style.display = "none";
}

var currentBtn; // stores the current button that opened the menu t


function makeUniqueForms(btn_id) {
    // make local-form unique
    var localForm = document.getElementById("local-form");
    localForm.id = "local-form" + btn_id;

    // make upload-file unique
    var uploadFile = document.getElementById("upload-file");
    uploadFile.id = "upload-file" + btn_id;

    // make fileName unique
    var fileName = document.getElementById("fileName");
    fileName.id = "fileName" + btn_id;
}

// call function when openLocal is called
function editForms(btn_id) {
    var f_id = "local-form" + btn_id;
    var u_id = "upload-file" + btn_id;
    var n_id = "fileName" + btn_id;

    if (document.getElementById(f_id)) {    // check if unique versions exist
        // edit unique numbered forms to general
        var form = document.getElementById(f_id);
        form.id = "local-form";
        var file = document.getElementById(u_id);
        file.id = "upload-file";
        var name = document.getElementById(n_id);
        name.id = "fileName";
    } else {
        // edit general forms to unique numbered version
        var form = document.getElementById("local-form");
        form.id = f_id;
        var file = document.getElementById("upload-file");
        file.id = u_id;
        var name = document.getElementById("fileName");
        name.id = n_id;
    }
}

function openLocal(btn_id) {
    var l_id = "local-upload"+btn_id;
    var localUploadForm = document.getElementById(l_id);
    console.log("This is working, yay 1");
    localUploadForm.innerHTML = createForm();
    // display the form

    if (localUploadForm.style.display == "none") {
        var mt_id = "menu-title" + btn_id;
        var menuTitle = document.getElementById(mt_id);
        menuTitle.textContent = "";
        var mh_id = "menu-header" + btn_id;
        var menuHead = document.getElementById(mh_id);
        menuHead.textContent = "";
        localUploadForm.style.display = "block";
    } else {    // hide the form
        var mt_id = "menu-title" + btn_id;
        var menuTitle = document.getElementById(mt_id);
        menuTitle.textContent = "Insert image from archive or local.";
        menuTitle.style.display == "block";
        var mh_id = "menu-header" + btn_id;
        var menuHead = document.getElementById(mh_id);
        var msg = "Menu " + btn_id;
        menuHead.innerHTML = msg.bold();
        localUploadForm.style.display = "none";
    }
    // currently form elements are general (need to be unique)
    editForms(btn_id);
    ajax(btn_id);
    editForms(btn_id);
}

function createForm() {
    return `
        <form id='local-form' action='./ajax.py' method='post' enctype='multipart/form-data'>
            <label for="fileName"><b>Enter a filename:</b></label>
            <input id='fileName' type='text' name='fileName'>
            <input id='upload-file' type='file' name='currentForm'>
            <input id='submit-btn' type='submit' value='Upload'>
        </form>
    `
}

function openArchive(btn_id) {
    showMenu(btn_id);
    var tray = document.getElementById("tray");
    if(tray.style.display == "none") {
        showTray();
    }
}

function showMenu(menu_id) {
    console.log("Called by button " + menu_id);
    var id = "img-menu" + menu_id;
    var menu = document.getElementById(id);
    
    if(menu.style.display == "none") {
        menu.style.display = "block";
        console.log("Opening menu");
    } else {
        menu.style.display = "none";
        console.log("Closing menu");
    }
}

function editTray() {
    console.log("Editing tray to accommodate thumbs");
    var tray = document.getElementById("tray");
    //tray.style.display = "flex";
    //tray.style.flexWrap = "wrap";

    console.log("Editing the thumbnails");
    var t = document.getElementsByClassName("thumbs");
    for (var i = 0; i < t.length; i++) {
        t[i].style.backgroundColor = "white";
        t[i].style.minWidth = t.length + "%";
        t[i].style.flex = "1 1 auto";
        addArchiveClick(t[i]);   // change the preview to archive img
    }
}

function addArchiveClick(thumb) {
    thumb.addEventListener('click', function(e) {
        e.preventDefault();
        var a = thumb.lastElementChild.src;
        console.log("Archive image source is "+a);
        insertImage(a);
    });
}

function insertImage(archive_src) {
    // I need the button that clicked to open the tray
    // I need the corresponding div for that button
    // I need the src of the image clicked

    var tray = document.getElementById("tray");
    tray.style.display = "none";

    var imgDiv = document.getElementById(currentBtn).parentElement;
    console.log("imgDiv is " + imgDiv.id);

    var imgParent = imgDiv.parentElement;
    console.log("imgParent is " + imgParent.id);

    var uploadArea = imgParent.lastElementChild;
    console.log("uploadArea is " + uploadArea.id);

    var preview = uploadArea.lastElementChild;
    var img = preview.lastElementChild;

    console.log("preview is " + preview.id);
    console.log("The archive_src value is " + archive_src);
    img.src = archive_src;
    console.log("img is " + img.id);
    console.log("The new img src is " + img.src);

    console.log("Current button is " + currentBtn);
    console.log("Pls work");
    // hopefully this work
}
var storePath;
function ajax(btn_id) {
    // change relevant fields 
    var f_id = "local-form"+btn_id;
    var form = document.getElementById(f_id);
    form.id = "local-form";
    var u_id = "upload-file"+btn_id;
    var upload = document.getElementById(u_id);
    upload.id = "upload-file";

    // this method is called when submit is clicked
    console.log("Figuring out ajax");
    // send image to server
    $('#local-form').on('submit',(function(e) {
        e.preventDefault();

        var i_id = "img" + btn_id;
        var i = document.getElementById(i_id);
        //i.style.display = "none";
        
        var formData = new FormData(this);
        console.log("Retrieved form data");
        $.ajax({
            type:'POST',
            url:'./ajax.py',
            data:formData,
            cache:false,
            contentType:false,
            processData:false,
            success: function(data) {
                alert("Successfully uploaded image.");
                console.log("success");
                console.log(data);
                submitImage(btn_id);
            },
            error: function(data) {
                alert("Error! Could not upload image.");
                console.log("error");
                console.log(data);
            }
        });
    }));

    $("#upload-file").on('change', function(e) {
        storePath = e.target.files[0].name;
        previewImage(this, btn_id);
    });
}

function submitImage(btn_id) {
    // the file path on the server is...
    var path = "/~ubuntu/uploads/";

    // hide the preview img
    var ip_id = "img-preview" + btn_id;
    var ip = document.getElementById(ip_id);
    console.log("Hiding the img preview");

    // check if a new filename was given
    var f_id = "fileName"+btn_id;
    var f = document.getElementById(f_id);
    console.log("The new filename is " + f.value);

    // get the actual image source
    var u_id = "upload-file" + btn_id;
    var u = document.getElementById(u_id);
    
    // set the new file path
    if(f.value) {
        path = path + f.value;
        console.log("The new file path is " + path);
    } else {
        path = path + storePath;
        console.log("The new file path is " + path);
    }

    var i_id = "img" + btn_id;
    var i = document.getElementById(i_id);
    i.src = path;
    alert("Uploading image to preview...");
    console.log("Setting img source to " + i.src);
}

function previewImage(input, btn_id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            var i_id = 'img-preview' + btn_id;
            var i = document.getElementById(i_id);
            i.src = e.target.result;
            i.style.display = "block";
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

var coverPath;
function saveExhibit() {
    // sending image to server

    // retrieve form data
    exhibit.filename = document.getElementById("exhibitName").value;
    exhibit.creator = document.getElementById("creatorName").value;
    exhibit.description = document.getElementById("descText").value;
    alert("Saving exhibit " + exhibit.filename);

    console.log("Exhibit file is " + exhibit.filename);
    console.log("Creator is " + exhibit.creator);
    console.log("Cover image is " + coverPath);
    console.log("Description is " + exhibit.description);

    var exhibitContent = fetchAllData(exhibit.filename, exhibit.creator, coverPath, exhibit.description);
    console.log("Exhibit content is " + exhibitContent);
    $.ajax({
        type:'POST',
        url:'./ajaxTest.py',
        data:{"exhibitContent":exhibitContent},
        datatype: "json",
        success: function(data) {
            alert("Successfully uploaded exhibit.");
            exhibitID = data.exhibitID;
            console.log("success");
            alert("Uploaded " + data.message);
        },
        error: function(data) {
            alert("Error! Could not upload exhibit.");
            console.log("error");
            console.log("Error = " + data.message);
        }
    });

    $("#coverImage").on('change', function(e) {
        coverPath = e.target.files[0].name; // store the coverImage path
        console.log("Cover image path filename = " + coverPath);
        previewCover(this);
    });
}

var exhibitCover;

function previewCover(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            exhibitCover = e.target.result;
            console.log("Cover = " + exhibitCover);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

// need function to make exhibit var
// this function will set the variables for the JSON

// if exhibit already exists, populate with specified content
function exisiting() {
    console.log("Exhibit already exists, repopulating...");
}



function fetchAllData(filename, creator, coverImage, description) {
    var noImages = exhibitData.noImages;
    var noTextboxes = exhibitData.noTextboxes;

    console.log("Exhibit noImgs " + noImages);
    console.log("Exhibit noTextboxes " + noTextboxes);

    var dict = {};

    dict.filename = filename;
    dict.creator = [];
    dict.creator.push(creator);
    dict.exhibitCover = exhibitCover;
    dict.description = description;
    dict.template = exhibitData.title;

    // can also try path w/o the server address
    // "https://3.134.107.128/~ubuntu/exhibitCovers/"+
    dict.coverImage = coverImage;   // currently without server path

    var contents = {};
    contents.title = filename;
    contents.noImages = noImages;
    contents.noTextboxes = noTextboxes;
    contents.images = [];
    contents.titleStyles = [];
    contents.textStyles = [];

    // add image information
    for(var i = 1; i <= noImages; i++) {
        var i_id = "img"+i;
        var img = document.getElementById(i_id);
        console.log(img.src);
        contents.images.push(img.src);
        console.log("Adding image data to json...");
        console.log("Checking contents.imgs["+(i-1)+"]: " + contents.images[i-1]);
    }

    console.log("Adding title data to json...");
    var titleData = document.getElementById("titleArea").innerHTML;
    contents.titleStyles.push(titleData);
    console.log("Checking contents.title[0]: " + contents.titleStyles[0]);

    // add textbox information
    contents.noTextboxes = noTextboxes;
    var editors = document.getElementsByClassName("editor-data");
    for(var i = 0; i < editors.length; i++) {
        // get the editor
        // fetch the editor data
        console.log("Adding editor data to json...");
        var editorData = editors[i].innerHTML;
        contents.textStyles.push(editorData);
        console.log("Checking contents.editor["+(i-1)+"]: " + contents.textStyles[i]);
       
    }
    var exContents = JSON.stringify(contents);
    dict.contents = exContents;

    console.log(dict);
    return JSON.stringify(dict);
}

function hideCkeditor(textbox, i) {
    var editor = "texteditor-test"+i;
    var ws = document.getElementById("workspace");
    ws.style.opacity = "1";
    var data = CKEDITOR.instances[editor].getData();
    console.log(data);
    console.log(textbox.id);
    var editorBox = document.getElementById("textbox-holder"+i);
    editorBox.style.display = "none";
    textbox.innerHTML = data;
    console.log("Innerhtml is " + textbox.innerHTML);
    CKEDITOR.instances[editor].destroy();
}

/*
module.exports = {
    
}
*/

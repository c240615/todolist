
let todolist = []; //存放待辦事項
let id = 1; //  待辦事項id

function addList(){
    let _title = $('#title').val();//取得title的值
    let _message = $('#message').val(); //取得message的值
    
    if(_title == "" ||  _message == ""){
        alert('請輸入標題和內容!')
    }else{
        // 建立物件存入新加入的待辦項目
        let newtodo ={
            '_id':id,
            'title':_title,
            'content': _message,
            'state':false
        };
        // 將newtodo加入todolist[]
        todolist.push(newtodo);
        newList(newtodo);// 呼叫newList傳入newtodo
        id++;
        // 清空 title跟message輸入框
        $('#title').val('');
        $('#message').val('');
    }
}

// 顯示待辦清單頁面
function newList(data){
    // 判斷是否已完成
    
    /* 標題樣式名稱 */
    let titleClass = (data.status)?"title2":"title";
    /* 內容樣式名稱 */
    let messageClass = (data.status)?"message2":"message";
    /* 勾選狀態 */
    let state = (data.status)?"checked":"";
    /* 修改按鈕是否顯示 */
    let editClass = (data.status)?"none":"inline";

    // 建立新增項目的html
    let content = 
    `
    <div class="content" id="${data._id}">
        <div class="${titleClass}">
            <input type="checkbox" onclick="changeStatus('${data._id}',this)">
            <text id="title${data._id}">${data.title}</text>
            <button class="i_btn" onclick="removeList('${data._id}')">刪除</button>
            <button class="i_btn" id="edit${data._id}" style="display:${editClass}" onclick="editList('${data._id}')">修改</button>
            <button class="i_btn" id="update${data._id}" style="display:none" onclick="updateList('${data._id}')">確認</button>
        </div>
        <div class="${messageClass}">
            <text id="message${data._id}">${data.content}</text>
        </div>
    </div>`;
$('body').append(content);// 是()不是{}
}

// 修改待辦事項
// 按下修改按鈕，將標題及內容的文字改成輸入框
function editList(id){
    // 
    $('#edit' + id).css("display","none");
    $('#update' + id).css("display","inline");

    let input = document.createElement("input");
    input.type = "text";
    input.id = "edit_title" + id;
    input.value = $('#title' + id).text();
    input.size = Math.max(20 / 4 * 3 , 4 );

    $('#title' + id).css("display","none");
    $('#title' + id).parent().append(input);

    let message_input = document.createElement("input");
    message_input.type = "text";
    message_input.id = "edit_message" + id;
    message_input.value = $('#message' + id).text();
    message_input.size = Math.max(50 / 4 * 3 , 4 );

    $('#message' + id).css("display","none");
    $('#message' + id).parent().append(message_input);
}
// 3-61
function updateList(id){
    let title = $('#edit_title' + id).val();
    let message = $('#edit_message' + id).val();
 
    $('#title' + id).text(title);
    $('#message' + id).text(message);
 
    $('#edit' + id).css("display","inline");
    $('#update' + id).css("display","none");
    
    $('#title' + id).css("display","inline");
    $('#message' + id).css("display","inline");
 
    $('#edit_title' + id).remove();
    $('#edit_message' + id).remove();
 }
 
 // 刪除待辦項目
 function removeList(id){ // id 是項目編號
     let index = todolist.findIndex(element => element._id == id );
     /*
         let index = todolist.findIndex(function (element){ return element._id == id;});
     */ 
     todolist.splice(index,1);// 回傳被刪除值 從index開始刪1個值
     $('#' + id).remove();
 }
 
 // 改變待辦事項狀態
 function changeStatus(id,btnstatus){
     let title = btnstatus.parentNode;
     let message = title.nextElementSibling;
     if (btnstatus.checked){
         title.className = "title2";
         message.className = "message2";
         $('#edit' + id).css("display","none");
         $('#update' + id).css("display","none");
 
         if(document.getElementById("edit_title" + id)){
             $('#title' + id).css("display","inline");
             $('#message' + id).css("display","inline");
             $('#edit_title' + id).remove();
             $('#edit_message' + id).remove();
         }
     }
     else{
         title.className = "title";
         message.className = "message";
         $('#edit' + id).css("display","inline");
     }
 }
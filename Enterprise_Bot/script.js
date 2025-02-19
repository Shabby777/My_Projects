function createUserList({ avatar, name, time }, index) {
  const newuser = document.createElement("div");
  if (index === 0) {
    newuser.classList.add("user-list");
    newuser.classList.add("active");
  } else {
    newuser.classList.add("user-list");
  }
  newuser.innerHTML = `
  <div class="user-list-sub" onclick="checkScreen(this,${index})">
    
    <div class="avatar">
      <img
        src=${avatar}
        alt=${name}
        loading="lazy"
      />
    </div>
    <div class="profile-highlight">
      <div class="user-name">
        <p class="title">${name}</p>
        <p class="time">${time}</p>
      </div>
      <p class="highlights">
        Lorem, ipsum dolor sit amet consectetur...
      </p>
    </div>
  </div>`;
  document.querySelector(".userList").appendChild(newuser);
}
function setList(arr) {
  arr.map((item, index) => createUserList(item, index));
}
setList(usersData);

function checkScreen(element, index) {
  if (window.innerWidth <= 750) {
    document.querySelector(".left").style.display = "none";
    document.querySelector(".right").style.display = "block";
    document.querySelector(".right").style.width = "100%";
  }
  currentUser(element, index);
}

function currentUser(element, index) {
  const userList = document.querySelectorAll(".user-list");
  userList.forEach((element) => element.classList.remove("active"));
  element.parentElement.classList.add("active");
  const name = element.children[1].children[0].children[0].innerHTML;
  const currentUserData = usersData.filter((item) => item.name === name);
  let selectedChat=undefined;
  Object.keys(JsonData).forEach((element,i) => {
    if(+element.charAt(element.length-1)==index+1){
      selectedChat=Object.values(JsonData)[i]
    }
  });
  UpdateChat(currentUserData, selectedChat);
}

function UpdateChat([{ avatar, name, status }], chat) {
  const current_user = document.createElement("div");
  current_user.classList.add("current-user");
  current_user.innerHTML = `
      <div class="current-user-sub">
      <div class="current_avatar">
       <span>
       <img
        src=${avatar}
        alt=${name}
      />
      <div class="online"></div>
       </span>
    </div>
      <div class="current_status">
        <p class="current-title">${name}</p>
        <p class="current-highlights">${status}</p>
      </div>
    </div>`;
    document.querySelector(".chat-box").innerHTML = "";
    document.querySelector(".chat-box").appendChild(current_user);
    AddChat(chat)
}

function AddChat(chat) {
  if (chat !== undefined) {
    const chatData = document.createElement("div");
    chatData.classList.add("chat");
    chat.forEach((element) => {
      const user_container = document.createElement("div");
      const user_mssg = document.createElement("p");
      user_mssg.innerText = element.msg.message;
      user_container.appendChild(user_mssg);
      if (element.from.type === "user1") {
        user_container.classList.add("user1-container");
        user_mssg.classList.add("user1-mssg");
      } else {
        user_container.classList.add("user2-container");
        user_mssg.classList.add("user2-mssg");
      }
      chatData.appendChild(user_container);
    });
    document.querySelector(".chat-box").appendChild(chatData);
  } else {
    const chatData=document.createElement("div")
    chatData.classList.add("chat")

    document.querySelector(".chat-box").appendChild(chatData);
  }
}

function goBack() {
  document.querySelector(".right").style.display = "none";
  document.querySelector(".left").style.display = "block";
  document.querySelector(".left").style.width = "100%";
}

window.addEventListener("resize", function () {
  if (window.innerWidth <= 750) {
    document.querySelector(".left").style.display = "block";
    document.querySelector(".left").style.width = "100%";
    document.querySelector(".right").style.display = "none";
  } else if (window.innerWidth > 750) {
    document.querySelector(".left").style.width = "32%";
    document.querySelector(".left").style.display = "block";
    document.querySelector(".right").style.width = "68%";
    document.querySelector(".right").style.display = "block";
  }
});

function serachUser(event) {
  document.querySelector(".userList").innerHTML = "";
  input = event.target.value;
  if (input === "") {
    setList(usersData);
  } else {
    const newList = usersData.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    if (newList.length === 0) {
      document.querySelector(".userList").innerHTML = "No Data Found";
      document.querySelector(".userList").style.fontWeight = "bolder";
    } else {
      setList(newList);
    }
  }
}

function selectTheme(event) {
  let r = document.querySelector(":root");
  let color = event.target.value;
  if (color === "Change theme") {
    r.style.setProperty("--my-mssg", "#00A0AE");
  } else {
    r.style.setProperty("--my-mssg", color);
  }
}

function changeBg(event) {
  let r = document.querySelector(":root");
  let bg = event.target.value;
  switch (bg) {
    case "Change background":
      r.style.setProperty("--background-img", 'url("https://i.pinimg.com/originals/f5/05/24/f50524ee5f161f437400aaf215c9e12f.jpg")');
    
      break;
    case "image1":
      r.style.setProperty("--background-img", 'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg")');
     
      break;
    case "image2":
      r.style.setProperty("--background-img", 'url("https://wallpaperaccess.com/full/1288076.jpg")');
    break;
    case "image3":
      r.style.setProperty("--background-img", 'url("https://i.pinimg.com/736x/78/1e/21/781e212cb0a891c6d8a3738c525e235d.jpg")');
    break;
  }
}

function calc(event) {
  const str=event.value
  if(str===""){
    document.querySelector('.count-char').innerText=`Current characters:${0} and current words:${0}`
  }
  else{
    const length=str.length
  const arrlength=str.split(" ").length
  document.querySelector('.count-char').innerText=`Current characters:${length} and current words:${arrlength}`
  }
}

function sendMssg() {
  const inpMssg=document.querySelector(".inpMssg")
  if(inpMssg.value===""){
    alert("Please Enter Ssome Text")
  }
  else{
  const arr=document.querySelectorAll(".user-list")
  let index=0;
  for(let i=0;i<arr.length;i++){
    if(arr[i].className==="user-list active"){
      index=i+1
      break
    }
  }
  let name=`chat${index}` 
  const newMssg=[{
    from: {
      type: "user2",
    },
    msg: {
      message:inpMssg.value
    },
  },]
  if(JsonData[name]){
    JsonData[name]=[...JsonData[name],...newMssg]
  }
  else{
    JsonData[name]=newMssg
  }
  document.querySelector('.chat').remove()
  AddChat(JsonData[name])
  inpMssg.value=""
  calc(document.querySelector('.inpMssg'))
  }
}
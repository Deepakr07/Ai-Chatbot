const chatInput = document.querySelector(".chat-input textarea");
const sendChatButton = document.querySelector(".chat-input span");

let userMessage;

const handleChat = ()=>{
    userMessage = chatInput.value.trim();
    console.log(userMessage);
}
sendChatButton.addEventListener("click",handleChat);
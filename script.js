//basic declarations
const chatInput = document.querySelector(".chat-input textarea");
const sendChatButton = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox")

let userMessage;
const API_KEY = "";

const createChatLi = (message,className)=>{
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing"? `<p>${message}</p>`:` <span class="material-symbols-outlined">
    smart_toy
</span>
<p>${message}</p>`;
chatLi.innerHTML = chatContent;
return chatLi;
}


const generateResponse = ()=>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const requestOptions = {
        method : "POST",
        headers : {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: userMessage
              }
            ]
        })
    }
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage)return;
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    setTimeout(() =>{
        chatbox.appendChild(createChatLi("Thinking...","incoming"));
    },600);
    generateResponse();
}
sendChatButton.addEventListener("click",handleChat);


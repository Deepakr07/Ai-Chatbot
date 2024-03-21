const chatInput = document.querySelector(".chat-input textarea");
const sendChatButton = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn")

let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message,className)=>{
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing"? `<p></p>`:` <span class="material-symbols-outlined">
    smart_toy
    </span>
    <p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi)=>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
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
                    role: "system",
                    content: "You are a helpful assistant."
                  },
              {
                role: "user",
                content: userMessage
              }
            ]
        })
    }

    
    //sending post request to api to get response
    fetch(API_URL,requestOptions)
        .then(res => res.json())
        .then(data =>{
            messageElement.textContent = data.choices[0].message.content;
        })
        .catch((error) => {
            messageElement.classList.add("error")
            messageElement.textContent = "Oops Something went wrong.Please try again"
        }).finally(()=>chatbox.scrollTo(0,chatbox.scrollHeight));
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage)return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    setTimeout(() =>{
        const incomingChatLi = createChatLi("Thinking...","incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    },600);
    
}

chatInput.addEventListener("input",() =>{
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
})

chatInput.addEventListener("keyup",(e) =>{
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
    
});


sendChatButton.addEventListener("click",handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot")); 
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot")); 
 
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton= document.querySelector("#theme-btn")


let userText = "beg";
const API_KEY = "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";



const createElement = (html, className) => {
  //!! yeni div olusturma ve belirtilen chat sınıfına ekleme
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

const getChatResponse = async (incomingChatDiv) => {
  const API_URL = "https://api.openai.com/v1/completions";
  const pElement = document.createElement("p");

  //! api talebi için özellik ve verileri tanımlama için
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: userText,
      max_tokens: 2048,
      temperature: 0.2,
      n: 1,
      stop: null,
    }),
  };
  try {
    const response = await (await fetch(API_URL, requestOptions)).json();
    pElement.textContent = response.choices[0].text.trim();
  } catch (error) {
    console.log(error);
    (pElement.textContent = "opppss"), (pElement.style.color = "red");
  }
  incomingChatDiv.querySelector(".typing-animation").remove();
  incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const showTypingAnimation = () => {
  const html = `<div class="chat-content">
            
    <img src="img/Chat-GPT-1.jpg" alt="chat-images">
    <div class="typing-animations">
        <div class="typing-dot" style="--delay: 0.2s"></div>
        <div class="typing-dot" style="--delay: 0.3s"></div>
        <div class="typing-dot" style="--delay: 0.5s"></div>
    </div>
    <span class="material-symbols-outlined">
        content_copy
        </span>


</div>`;

  const incomingChatDiv = createElement(html, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  getChatResponse(incomingChatDiv);
};

const handleOutGoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) return; //MCHATINPUTUN İÇİ BOŞSA ÇALIŞMASIN
  const html = `<div class="chat-content">
    <div class="chat-details">
        <img src="img/icon-256x256.png" alt="user-images">
        <p>
        ${userText}
        </p>

    </div>
</div>`;
  const outgoingChatDiv = createElement(html, "outgoing");
  outgoingChatDiv.querySelector("p").textContent = userText;
  document.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  setTimeout(showTypingAnimation, 500);
};

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    // themeButton.innerText = document.body.classList.contains("light-mode")
})
sendButton.addEventListener("click", handleOutGoingChat);

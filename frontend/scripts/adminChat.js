const chatContainer = document.getElementById("chat-container");

const generateRequestcard = (element) => {
  const { id, name, text } = element;
  return `<div class="coin-card flex column" id=${id}>
        <div class="coin-details flex row"><p>Name:</p><P>${name}</P></div>
        <div class="coin-details flex row"><p>Text:</p><P>${text}</P></div>
        <div class="coin-details flex row"><p>Reply:</p><input type="text"></div>
        <div class="flex center" ><button class="adminBtn">Reply</button>  
    </div>
</div> `;
};


const GetChat = () => {
    fetch(
      "http://localhost/flights-system-website/backend/adminGetChat.php",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const chats = data["chats"];
        chatContainer.innerHTML="";
        chats.forEach(element => {
            chatContainer.innerHTML+=generateRequestcard(element);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };


  GetChat();
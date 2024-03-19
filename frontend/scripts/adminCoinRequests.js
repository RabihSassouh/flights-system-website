const coinRequestContainer=document.getElementById("coin-requests-container");

const generateRequestcard = (element) => {
    const {id, name, email, amount}=element
    return      `<div class="coin-card flex column" id=${id}>
                <div class="coin-details flex row"><p>Name:</p><P>${name}</P></div>
                <div class="coin-details flex row"><p>Email:</p><P>${email}</P></div>
                <div class="coin-details flex row"><p>Amount requested:</p><P>${amount}</P></div>
                <div class="card-details flex row"><button class="acceptBtn">Accept</button>  <button class="declineBtn">Decline</button>  </div>
                </div> `
  };
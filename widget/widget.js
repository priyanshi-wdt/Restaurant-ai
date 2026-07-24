// window.VoiceAI = {
//   init(config = {}) {
//     console.log("RestaurantAI Started", config);

//     const div=document.createElement("div")
//     div.id="box"

//     const button = document.createElement("button");
//     button.id = "ai-button";
//     button.innerHTML = "🎙️";

//     // Add button to container
//     div.appendChild(button);

//     // Add container to page
//     document.body.appendChild(div);

//     let started = false;

//     button.onclick = () => {
//       if (started) return;

//       started = true;

//       const iframe = document.createElement("iframe");
//       iframe.style.display = "none";
//       iframe.allow = "microphone";

//       iframe.src = `https://restaurant-ai-qp3u.vercel.app/?companyId=${config.companyId}`;

//       document.body.appendChild(iframe);
//     };
//   },
// };



window.VoiceAI = {
  init(config = {}) {
    console.log("RestaurantAI Started", config);

    const box = document.createElement("div");
    box.id = "box";

    const button = document.createElement("button");
    button.id = "ai-button";

    const icon = document.createElement("div");
    icon.id = "voice-icon";
    icon.innerHTML = "🎙️";

    button.appendChild(icon);
    box.appendChild(button);
    document.body.appendChild(box);

    let started = false;

    function showIdle() {
      icon.innerHTML = "🎙️";
    }

    function showListening() {
      icon.innerHTML = `
        <div class="listening-ring"></div>
      `;
    }

    function showAISpeaking() {
      icon.innerHTML = `
        <div class="speaker">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
    }

    function showUserSpeaking() {
      icon.innerHTML = `
        <div class="equalizer">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
    }

    window.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
      if (event.data?.type !== "VOICE_AI_STATE") return;

      

      switch (event.data.state) {
        case "idle":
          showIdle();
          break;

        case "listening":
          showListening();
          break;

        case "ai-speaking":
          showAISpeaking();
          break;

        case "user-speaking":
          showUserSpeaking();
          break;
      }
    });

    button.onclick = () => {
      if (started) return;

      started = true;

      const iframe = document.createElement("iframe");

      iframe.style.display = "none";
      iframe.allow = "microphone";

      iframe.src = `https://restaurant-ai-qp3u.vercel.app/?companyId=${config.companyId}`;

      document.body.appendChild(iframe);
    };
  },
};
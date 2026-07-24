window.VoiceAI = {
  init(config = {}) {
    console.log("RestaurantAI Started", config);
    const container = config.container || document.body;

    const box = document.createElement("div");
    box.id = "box";

    const button = document.createElement("button");
    button.id = "ai-button";

    const p=document.createElement("p")
    p.id="ai-name"
    p.innerHTML="Talk with Emily";

    const icon = document.createElement("div");
    icon.id = "voice-icon";
    icon.innerHTML = `<svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
  <path d="M19 10a7 7 0 0 1-14 0"/>
  <path d="M12 19v4"/>
  <path d="M8 23h8"/>
</svg>`;

    button.appendChild(icon);
    box.appendChild(button);
    box.appendChild(p)
    container.appendChild(box);

    let iframe = null;
let started = false;

    function showIdle() {
      icon.innerHTML = `<svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
  <path d="M19 10a7 7 0 0 1-14 0"/>
  <path d="M12 19v4"/>
  <path d="M8 23h8"/>
</svg>`;
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

  if (!started) {

    started = true;

    iframe = document.createElement("iframe");

    iframe.style.display = "none";
    iframe.allow = "microphone";

    iframe.src =
      `https://restaurant-ai-qp3u.vercel.app/?companyId=${config.companyId}`;

    document.body.appendChild(iframe);

  } else {

    started = false;

    iframe.contentWindow.postMessage(
      {
        type: "VOICE_AI_END",
      },
      "*"
    );

  }

};
  },
};

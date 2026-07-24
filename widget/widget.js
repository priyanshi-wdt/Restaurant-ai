window.VoiceAI = {
  init(config = {}) {
    console.log("RestaurantAI Started", config);

    const button = document.createElement("button");
    button.id = "ai-button";
    button.innerHTML = "🎤";

    document.body.appendChild(button);

    let started = false;

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
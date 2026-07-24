window.SolarAI = {
    init(config = {}) {
        console.log("SolarAI Started", config);

        const button = document.createElement("button");

        button.id = "solar-ai-button";

        button.innerHTML = "🎤";

        document.body.appendChild(button);

        // function updateWidgetStatus(status) {
        //   if (status === "listening") {
        //     button.innerHTML = "🔴";
        //   } else if (status === "speaking") {
        //     button.innerHTML = "🔊";
        //   } else {
        //     button.innerHTML = "🎤";
        //   }
        // }

        let started = false;

        button.onclick = () => {
            if (started) return;

            started = true;

            const iframe = document.createElement("iframe");

            iframe.style.display = "none";

            iframe.allow = "microphone";

            iframe.src =
                "http://restaurant-ai-qp3u.vercel.app/?companyId="
                +
                config.companyId;

            document.body.appendChild(iframe);
        };


    },
};

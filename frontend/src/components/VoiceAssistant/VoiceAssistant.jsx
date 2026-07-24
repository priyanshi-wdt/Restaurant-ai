import { useEffect } from "react";
import useConversation from "../../hooks/useConversation";

export default function VoiceAssistant() {
  const {
    started,
    connected,
    listening,
    speaking,
    messages,
    startConversation,
    endConversation
  } = useConversation();

  console.log('started',started,connected,speaking,listening,messages);
  

  // function getStatus() {
  //   if (!connected) return "🔴 Disconnected";
  //   if (speaking) return "🔊 AI Speaking...";
  //   if (listening) return "🎤 Listening...";
  //   return "😴 Waiting...";
  // }

  useEffect(() => {
    startConversation();
  }, []);

  
useEffect(() => {
  function handleMessage(event) {
    if (event.data?.type === "VOICE_AI_END") {
      endConversation();
    }
  }

  window.addEventListener("message", handleMessage);

  return () =>
    window.removeEventListener("message", handleMessage);
}, []);


  useEffect(() => {
  let state = "idle";

  if (speaking) {
    state = "ai-speaking";
  } else if (listening) {
    state = "user-speaking";
  }

  console.log("Sending to parent:", state);

  window.parent.postMessage(
    {
      type: "VOICE_AI_STATE",
      state,
    },
    "*"
  );
}, [speaking, listening]);


  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>Restaurant Voice AI</h1>

      {/* <h3>{getStatus()}</h3> */}

      {/* {!started && (
        <button
          onClick={startConversation}
          style={{
            padding: "12px 25px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          🎤 Start Conversation
        </button>
      )} */}
    </div>
  );
}

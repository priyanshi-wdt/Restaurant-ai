import { useEffect, useState } from "react";

import conversationManager from "../conversation/conversationManager";
import { stopAudio } from "../audio/audioPlayer";

import {
  connectWebSocket,
  startSession,
  disconnectWebSocket
} from "../services/websocket";

import { startWorklet, stopWorklet } from "../audio/worklet";

export default function useConversation() {

  const [state, setState] = useState(
    conversationManager.getState()
  );

  useEffect(() => {

    const unsubscribe =
      conversationManager.subscribe(setState);

    return () => {
      unsubscribe();
    };

  }, []);

  async function startConversation() {

    if (state.started) return;

    try {

      // 1. Connect Backend
      await connectWebSocket();

      // 2. Open Microphone
      await startWorklet();

      // 3. Update State
      conversationManager.startConversation();

      conversationManager.setListening(true);

      // 4. Create Gemini Session
      startSession();

    } catch (err) {

      console.error(err);

    }

  }

  function endConversation() {
    stopAudio();                  // Stop AI voice immediately
    stopWorklet();                // Stop microphone
    disconnectWebSocket();        // Disconnect backend

    conversationManager.clearMessages();
    conversationManager.stopConversation();
}

  return {
    ...state,
    startConversation,
    endConversation,
  };

}
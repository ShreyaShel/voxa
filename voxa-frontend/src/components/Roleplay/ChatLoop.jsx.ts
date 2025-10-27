import { useState } from "react";
import axios from "axios";
import MicRecorder from "mic-recorder-to-mp3";
import FeedbackPanel from "./FeedbackPanel";

const recorder = new MicRecorder({ bitRate: 128 });

export default function ChatLoop({ scenarioId }) {
  const [conversation, setConversation] = useState([]);
  const [aiReplies, setAiReplies] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    await recorder.start();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    const [buffer, blob] = await recorder.stop().getMp3();
    setIsRecording(false);

    const formData = new FormData();
    formData.append("audio", blob);

    const { data: transcriptData } = await axios.post("http://localhost:8000/transcribe", formData);
    const transcript = transcriptData.transcript;
    setConversation((prev) => [...prev, transcript]);

    const { data: responseData } = await axios.post("http://localhost:8000/respond_to_user", {
      transcript,
      scenario_id: scenarioId,
      conversation_history: [...conversation, transcript],
    });

    setAiReplies((prev) => [...prev, responseData.reply]);
    setFeedback(responseData.feedback);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="chat-window">
        {conversation.map((userMsg, i) => (
          <div key={`user-${i}`} className="chat-bubble user">{userMsg}</div>
        ))}
        {aiReplies.map((aiMsg, i) => (
          <div key={`ai-${i}`} className="chat-bubble ai">{aiMsg}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={startRecording} disabled={isRecording}>🎙️ Start</button>
        <button onClick={stopRecording} disabled={!isRecording}>⏹️ Stop</button>
      </div>

      {feedback && <FeedbackPanel feedback={feedback} />}
    </div>
  );
}
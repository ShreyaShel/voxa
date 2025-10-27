// components/ChatLoop.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import MicRecorder from "mic-recorder-to-mp3";
import FeedbackPanel from "./FeedbackPanel";

const recorder = new MicRecorder({ bitRate: 128 });

export default function ChatLoop() {
  const [chatHistory, setChatHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [voice, setVoice] = useState("en-US-JennyNeural");
  const [scenarioId, setScenarioId] = useState("interview_coach");

  const startRecording = async () => {
    await recorder.start();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    const [, blob] = await recorder.stop().getMp3();
    setIsRecording(false);

    const formData = new FormData();
    formData.append("file", blob);

    try {
      const { data: transcriptData } = await axios.post("http://localhost:8000/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const transcript = transcriptData.transcript;
      const conversation_history = chatHistory.map(m => m.text).concat(transcript);

      const { data: responseData } = await axios.post("http://localhost:8000/respond_to_user", {
        transcript,
        scenario_id: scenarioId,
        conversation_history,
        voice,
      });

      setChatHistory(prev => [
        ...prev,
        { sender: "user", text: transcript },
        { sender: "voxa", text: responseData.reply }
      ]);

      setAudioUrl("http://localhost:8000" + responseData.audio_file);
      setFeedback(responseData.feedback);
      setMetrics(responseData.metrics);

      console.log("Metrics received:", responseData.metrics);
      console.log("Feedback received:", responseData.feedback);
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to connect to backend. Make sure it's running.");
    }
  };

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }, [audioUrl]);

  return (
    <div className="flex flex-col gap-4">
      {/* Scenario Selector */}
      <div className="flex gap-2 items-center">
        <label>Scenario:</label>
        <select value={scenarioId} onChange={e => setScenarioId(e.target.value)}>
          <option value="interview_coach">Interview Coach</option>
          <option value="restaurant">Restaurant Roleplay</option>
          <option value="doctor_visit">Doctor Visit</option>
          <option value="travel_booking">Travel Booking</option>
        </select>

        {/* Voice Selector */}
        <label>Voice:</label>
        <select value={voice} onChange={e => setVoice(e.target.value)}>
          <option value="en-US-JennyNeural">Jenny (US)</option>
          <option value="en-US-GuyNeural">Guy (US)</option>
          <option value="en-GB-RyanNeural">Ryan (UK)</option>
          <option value="en-IN-NeerjaNeural">Neerja (India)</option>
        </select>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Recorder Controls */}
      <div className="flex gap-2">
        <button onClick={startRecording} disabled={isRecording}>🎙️ Start</button>
        <button onClick={stopRecording} disabled={!isRecording}>⏹️ Stop</button>
      </div>

      {/* Feedback Panel */}
      {feedback && metrics && <FeedbackPanel feedback={feedback} metrics={metrics} />}
    </div>
  );
}
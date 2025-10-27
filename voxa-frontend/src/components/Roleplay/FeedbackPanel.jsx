// components/FeedbackPanel.jsx

export default function FeedbackPanel({ feedback, metrics }) {
  if (!feedback || !metrics) return null;

  return (
    <div className="feedback-panel p-4 border rounded bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-2">🧠 Coaching Feedback</h2>

      {/* Full feedback message */}
      {feedback.message && (
        <p className="mb-4 whitespace-pre-line">{feedback.message}</p>
      )}

      {/* Strengths */}
      {feedback.strengths?.length > 0 && (
        <>
          <h3 className="text-md font-semibold mt-2">✅ Strengths</h3>
          <ul className="list-disc list-inside mb-2">
            {feedback.strengths.map((item, index) => (
              <li key={`strength-${index}`}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {/* Improvements */}
      {feedback.improvements?.length > 0 && (
        <>
          <h3 className="text-md font-semibold mt-2">🛠️ Improvements</h3>
          <ul className="list-disc list-inside mb-2">
            {feedback.improvements.map((item, index) => (
              <li key={`improvement-${index}`}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {/* Metrics */}
      <h3 className="text-md font-semibold mt-4">📊 Metrics</h3>
      <ul className="list-disc list-inside">
        <li><strong>Tone:</strong> {metrics.tone ?? "—"}</li>
        <li><strong>Empathy:</strong> {metrics.empathy ?? "—"}</li>
        <li><strong>Pacing:</strong> {metrics.pacing ?? "—"}</li>
        <li><strong>Clarity:</strong> {metrics.clarity ?? "—"}</li>
        <li><strong>Grammar:</strong> {metrics.grammar ?? "—"}</li>
        <li><strong>Fluency Score:</strong> {metrics.fluency_score ?? "—"}</li>
        <li><strong>XP:</strong> {metrics.xp ?? "—"}</li>
      </ul>
    </div>
  );
}
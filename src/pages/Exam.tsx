import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { MeshGradient } from "@/components/waitlist";

const questions = [
  "Что такое USSS согласно закону?",
  "Кто относится к «первым лицам штата» по закону?",
  "На чём основывается деятельность USSS?",
  "Какие основные цели деятельности USSS?",
  "Какие права имеют сотрудники USSS при исполнении обязанностей?",
  "В каких случаях USSS может применять огнестрельное оружие?",
  "Кто осуществляет руководство деятельностью USSS?",
  "Какие объекты относятся к объектам государственной охраны?",
  "Какая ответственность предусмотрена для сотрудников USSS?",
  "Могут ли граждане обжаловать действия сотрудников USSS?",
];

const Exam = () => {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnswer = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Пожалуйста, введите имя и фамилию.");
      return;
    }
    const unanswered = answers.findIndex((a) => !a.trim());
    if (unanswered !== -1) {
      setError(`Пожалуйста, ответьте на вопрос ${unanswered + 1}.`);
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="antialiased min-h-svh bg-slate-1 text-slate-12">
        <MeshGradient
          colors={["#001c80", "#1ac7ff", "#04ffb1", "#ff1ff1"]}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 0, width: "100%", height: "100%" }}
        />
        <div className="relative z-[1] max-w-2xl mx-auto px-5 py-12">
          {submitted ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-10 flex flex-col items-center gap-4">
                <div className="text-4xl">✅</div>
                <h2 className="text-2xl font-medium text-slate-12">Ответы отправлены</h2>
                <p className="text-slate-10">Ожидайте результат проверки.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col gap-2">
                <h1 className="text-2xl font-medium text-slate-12">Экзамен по уставу USSS</h1>
                <p className="text-slate-10 text-sm">Отдел FLETC · Government</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-12">Имя и Фамилия</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите имя и фамилию"
                  className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/20 text-slate-12 placeholder:text-slate-10 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              {questions.map((q, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col gap-3">
                  <p className="text-sm font-medium text-slate-12">
                    <span className="text-slate-10 mr-2">{i + 1}.</span>
                    {q}
                  </p>
                  <textarea
                    value={answers[i]}
                    onChange={(e) => handleAnswer(i, e.target.value)}
                    placeholder="Введите ответ..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-slate-12 placeholder:text-slate-10 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                  />
                </div>
              ))}

              {error && (
                <p className="text-red-400 text-sm px-1">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-12 bg-gray-12 text-gray-1 text-sm rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Отправка..." : "Отправить ответы"}
              </button>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Exam;

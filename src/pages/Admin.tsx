import { useEffect, useState } from "react";
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

interface Submission {
  id: number;
  full_name: string;
  answers: string[];
  submitted_at: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://functions.poehali.dev/4561d092-eeb3-47e7-b1bc-5e5703844746");
        const raw = await res.text();
        const parsed = JSON.parse(raw);
        const data = typeof parsed === "string" ? JSON.parse(parsed) : parsed;
        setSubmissions(data.submissions || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="antialiased min-h-svh bg-slate-1 text-slate-12">
        <MeshGradient
          colors={["#001c80", "#1ac7ff", "#04ffb1", "#ff1ff1"]}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 0, width: "100%", height: "100%" }}
        />
        <div className="relative z-[1] max-w-3xl mx-auto px-5 py-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6">
            <h1 className="text-2xl font-medium text-slate-12">Панель проверки</h1>
            <p className="text-slate-10 text-sm mt-1">Отдел FLETC · Government · Экзамен по уставу USSS</p>
          </div>

          {loading ? (
            <div className="text-center text-slate-10 py-20">Загрузка...</div>
          ) : submissions.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-10 text-center text-slate-10">
              Пока нет сданных экзаменов
            </div>
          ) : selected ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setSelected(null)}
                className="self-start text-sm text-slate-10 hover:text-slate-12 transition-colors flex items-center gap-1"
              >
                ← Назад к списку
              </button>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col gap-1">
                <h2 className="text-xl font-medium text-slate-12">{selected.full_name}</h2>
                <p className="text-slate-10 text-sm">{formatDate(selected.submitted_at)}</p>
              </div>
              {questions.map((q, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col gap-2">
                  <p className="text-sm font-medium text-slate-12">
                    <span className="text-slate-10 mr-2">{i + 1}.</span>{q}
                  </p>
                  <p className="text-sm text-slate-11 bg-white/5 rounded-xl px-4 py-3 whitespace-pre-wrap">
                    {selected.answers[i] || <span className="text-slate-10 italic">Нет ответа</span>}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-slate-10 text-sm px-1">Всего сдано: {submissions.length}</p>
              {submissions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-left hover:bg-white/20 transition-colors flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-medium text-slate-12">{s.full_name}</p>
                    <p className="text-slate-10 text-sm mt-0.5">{formatDate(s.submitted_at)}</p>
                  </div>
                  <span className="text-slate-10 text-sm">Просмотреть →</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Admin;

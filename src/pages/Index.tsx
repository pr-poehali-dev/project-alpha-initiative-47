import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import {
  WaitlistWrapper,
  MeshGradient,
} from "@/components/waitlist";

const Index = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="antialiased max-w-screen min-h-svh bg-slate-1 text-slate-12">
        <MeshGradient
          colors={["#001c80", "#1ac7ff", "#04ffb1", "#ff1ff1"]}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <div className="max-w-screen-sm mx-auto w-full relative z-[1] flex flex-col min-h-screen items-center justify-center">
          <div className="px-5 gap-8 flex flex-col">
            <main className="flex justify-center">
              <WaitlistWrapper
                logo={{
                  src: "/logo.svg",
                  alt: "Launchpad",
                }}
                copyright="При поддержке"
                copyrightLink={{ text: "отдел FLETC", href: "#" }}
                showThemeSwitcher={true}
              >
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-medium text-slate-12 whitespace-pre-wrap text-pretty">
                    Лист ожидания
                  </h1>
                  <p className="text-slate-10 tracking-tight text-pretty">
                    Узнайте первыми о запуске. Получите ранний доступ и
                    эксклюзивные обновления.
                  </p>
                </div>
                <div className="px-1 flex flex-col w-full self-stretch">
                  <button
                    className="w-full h-11 bg-gray-12 text-gray-1 text-sm rounded-full font-medium hover:opacity-90 transition-opacity"
                    onClick={() => navigate("/exam")}
                  >
                    Сдача экзамена
                  </button>
                </div>
              </WaitlistWrapper>
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
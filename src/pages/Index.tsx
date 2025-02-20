
import { GitaChatbot } from "@/components/GitaChatbot";
import { ScriptureDisplay } from "@/components/ScriptureDisplay";
import { Card } from "@/components/ui/card";
import { Video } from "lucide-react";
import { useState, useEffect } from "react";
import gitaData from "../data/gita.json";

const Index = () => {
  const [currentVerse, setCurrentVerse] = useState({
    sanskrit: "",
    english: "",
    videoId: "",
    startPage: "",
  });

  useEffect(() => {
    const initialChapter = gitaData[0];
    if (initialChapter?.Shloka?.["47"]) {
      const [sanskrit, english, startPage, videoId] = initialChapter.Shloka["47"];
      setCurrentVerse({ sanskrit, english, videoId, startPage });
    }
  }, []);

  const handleVerseChange = (chapter: string, verse: string) => {
    const selectedChapter = gitaData.find((c) => c.chapter.toString() === chapter);
    if (selectedChapter?.Shloka?.[verse]) {
      const [sanskrit, english, startPage, videoId] = selectedChapter.Shloka[verse];
      setCurrentVerse({ sanskrit, english, videoId, startPage });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gita-light to-white p-2 sm:p-3 md:p-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gita-primary text-center mb-3 sm:mb-4 md:mb-6">
        Bhagavad Gita Dashboard
      </h1>

      <div className="max-w-[1200px] mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Scripture Display */}
            <div className="flex-grow min-h-[45vh] lg:min-h-0">
              <Card className="h-full w-full overflow-hidden border-2 border-[#9b87f5] shadow-lg">
                <ScriptureDisplay onVerseChange={handleVerseChange} />
              </Card>
            </div>

            {/* Chatbot */}
            <div className="flex-grow min-h-[35vh] lg:min-h-0">
              <Card className="h-full w-full overflow-hidden border-2 border-[#9b87f5] shadow-lg">
                <GitaChatbot />
              </Card>
            </div>
          </div>

          {/* Right Column - Video Commentary */}
          <div className="min-h-[50vh] lg:min-h-0">
            <Card className="h-full w-full bg-gradient-to-br from-[#F1F0FB] to-white border-2 border-[#9b87f5] shadow-lg rounded-xl overflow-hidden">
              <div className="h-full w-full relative flex items-center justify-center bg-black aspect-[16/9] lg:aspect-auto">
                {/* Video title */}
                <h3 className="absolute top-3 left-3 z-10 font-semibold flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm sm:text-base">
                  <Video className="h-4 w-4" />
                  Chanting
                </h3>
                
                {/* Video container with YouTube Shorts aspect ratio */}
                <div className="relative w-full h-full max-w-[300px] mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full aspect-[9/16]">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${currentVerse.videoId}?rel=0&showinfo=0&controls=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

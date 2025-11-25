import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { X, ExternalLink, RotateCw } from "lucide-react";
import { useUser } from "../context/UserContext";
import { SERVICE_API_BASE_URL } from "../../env";

interface Flashcard {
  id: number;
  title: string;
  frontText: string;
  backText: string;
  referenceLink: string;
  availableOn: string;
}

export default function FlashCardPopup({ flashcard }: { flashcard: Flashcard }) {
  const { user } = useUser();
  const [show, setShow] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    if (flashcard.availableOn === today) setShow(true);
  }, [user, flashcard]);

  const markViewed = async () => {
    if (viewed) return;
    try {
      await axios.post(
        `${SERVICE_API_BASE_URL}/flashcard-views/view`,
        { flashcardId: flashcard.id },
        { withCredentials: true }
      );
      setViewed(true);
    } catch (err) {
      console.error("Error marking viewed:", err);
    }
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
    if (!flipped) markViewed();
  };

  const handleClose = () => {
    setShow(false);
    markViewed();
  };

  if (!show || !user) return null;

  const formattedDate = new Date(flashcard.availableOn).toLocaleDateString();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          className="relative w-full max-w-sm sm:max-w-md"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-10 right-0 text-white/90 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Card Container with Flip Animation */}
          <div
            className="relative h-[260px] sm:h-[300px]"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative w-full h-full"
              initial={false}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 90 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* FRONT SIDE */}
              <div
                className="absolute inset-0 rounded-xl bg-white border border-gray-200 shadow-lg overflow-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="h-full flex flex-col p-4 sm:p-5">
                  {/* Top meta */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wide font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      Flashcard of the day
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {formattedDate}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 mb-2">
                    {flashcard.title}
                  </h3>

                  {/* Question / Front text */}
                  <div className="flex-1 flex items-center justify-center text-center px-1">
                    <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed line-clamp-4">
                      {flashcard.frontText}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-3 flex justify-center">
                    <button
                      onClick={handleFlip}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm"
                    >
                      <span>Reveal answer</span>
                      <RotateCw size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                className="absolute inset-0 rounded-xl bg-white border border-gray-200 shadow-lg overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="h-full flex flex-col p-4 sm:p-5">
                  {/* Top meta */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wide font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                      Answer
                    </span>
                  </div>

                  {/* Answer text */}
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed mb-3">
                      {flashcard.backText}
                    </p>

                    {flashcard.referenceLink && (
                      <a
                        href={flashcard.referenceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <ExternalLink size={14} />
                        <span>Learn more</span>
                      </a>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-3 flex justify-center">
                    <button
                      onClick={handleFlip}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
                    >
                      <RotateCw size={16} />
                      <span>Back to question</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

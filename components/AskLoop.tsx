"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaCat, FaHeart } from "react-icons/fa";

const escalationLines = [
  "Are you sure?",
  "I practiced asking this.",
  "I skipped a nap for this.",
  "That didn't feel correct.",
  "The No button seems... nervous.",
  "I already told my cat friends.",
  "Okay. Last chance.",
];

const maxNo = escalationLines.length;

export default function AskLoop() {
  const [phase, setPhase] = useState<"intro" | "asking" | "yes">("intro");
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const areaRef = useRef<HTMLDivElement>(null);

  const helperText = useMemo(() => {
    if (noCount === 0) return "";
    return escalationLines[Math.min(noCount, maxNo) - 1];
  }, [noCount]);

  const yesScale = 1 + Math.min(noCount, 7) * 0.06;
  const swapButtons = noCount >= 4;
  const shrinkNo = noCount >= 3;
  const moveNo = noCount >= 5;
  const changeNoLabel = noCount >= 6;
  const hideNo = noCount >= 7;

  const moveNoButton = () => {
    if (!moveNo || !areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    const padding = 12;
    const btnWidth = 120;
    const btnHeight = 52;
    const maxX = Math.max(padding, rect.width - btnWidth - padding);
    const maxY = Math.max(padding, rect.height - btnHeight - padding);
    const x = Math.min(maxX, Math.random() * maxX + padding);
    const y = Math.min(maxY, Math.random() * maxY + padding);
    setNoPos({ x, y });
  };

  const handleReset = () => {
    setPhase("intro");
    setNoCount(0);
    setNoPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (moveNo) moveNoButton();
  }, [moveNo]);

  const floatingItems = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        left: `${8 + index * 7}%`,
        delay: `${(index % 6) * 0.6}s`,
        duration: `${5 + (index % 5)}s`,
        type: index % 3 === 0 ? "cat" : "heart",
      })),
    []
  );

  return (
    <div className="page">
      <main className="card">
        {phase === "intro" && (
          <section className="text-center">
            <div className="icon-hero">
              <FaCat />
            </div>
            <h1 className="title">Hi, Dawn!</h1>
            <p className="subtext">I have a very impawrtant question...</p>
            <button className="btn btn-yes" onClick={() => setPhase("asking")}>
              Begin
            </button>
          </section>
        )}

        {phase === "asking" && (
          <section className="text-center">
            <div className="icon-hero">
              <FaCat />
            </div>
            <h2 className="question">Will you be my Valentine?</h2>
            <p className="helper">{helperText}</p>
            <div className="button-area" ref={areaRef}>
              <div
                className="buttons"
                style={{ justifyContent: hideNo ? "center" : "center" }}
              >
                <button
                  className="btn btn-yes"
                  style={{ transform: `scale(${yesScale})`, order: swapButtons ? 2 : 1 }}
                  onClick={() => setPhase("yes")}
                >
                  Yes
                </button>
                {!hideNo && (
                  <button
                    className={`btn btn-no ${shrinkNo ? "shrink" : ""} ${
                      moveNo ? "mover" : ""
                    }`}
                    style={{
                      order: swapButtons ? 1 : 2,
                      left: moveNo ? noPos.x : undefined,
                      top: moveNo ? noPos.y : undefined,
                    }}
                    onClick={() => setNoCount((count) => Math.min(count + 1, maxNo))}
                    onPointerEnter={moveNoButton}
                    onPointerDown={moveNoButton}
                  >
                    {changeNoLabel ? "Not No" : "No"}
                  </button>
                )}
              </div>
            </div>
            <p className="note">You can say no, but the cats are persistent.</p>
          </section>
        )}

        {phase === "yes" && (
          <section className="text-center">
            <div className="celebration">
              {floatingItems.map((item) => (
                <div
                  key={item.id}
                  className={`float-item ${
                    item.type === "cat" ? "float-cat" : "float-heart"
                  }`}
                  style={{
                    left: item.left,
                    animationDelay: item.delay,
                    animationDuration: item.duration,
                  }}
                >
                  {item.type === "cat" ? <FaCat /> : <FaHeart />}
                </div>
              ))}
            </div>
            <div className="icon-hero">
              <FaHeart />
            </div>
            <h2 className="yes-title">Best decision you've made all day.</h2>
            <p className="subtext">I'm so excited to celebrate with you.</p>
            <div className="plan">Dinner @ Soju - February 14 at 5:30 PM</div>
            <button className="btn btn-outline" onClick={handleReset}>
              Replay
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

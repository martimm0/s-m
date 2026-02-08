"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaCat, FaHeart } from "react-icons/fa";

const escalationLines = [
  "Are you sure?",
  "I practiced asking this.",
  "I skipped a nap for this.",
  "That didn't feel correct.",
  "The No button seems... nervous.",
  "I already told Athena & Ellie.",
  "Okay. Last chance.",
];

const maxNo = escalationLines.length;
const maxNoTotal = maxNo + 1;

export default function AskLoop() {
  const [phase, setPhase] = useState<"intro" | "asking" | "yes">("intro");
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [dodgeRemaining, setDodgeRemaining] = useState(0);
  const [mounted, setMounted] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  const helperText = useMemo(() => {
    if (noCount === 0) return "";
    return escalationLines[Math.min(noCount, maxNo) - 1];
  }, [noCount]);

  const yesScale = Math.pow(1.24, Math.min(noCount, 6));
  const swapButtons = noCount >= 4;
  const shrinkNo = false;
  const moveNo = dodgeRemaining > 0;
  const changeNoLabel = noCount >= 6;
  const hideNo = noCount > maxNo;
  const showNo = phase === "asking" && !hideNo;
  const stackButtons = noCount === 0;
  const noScale = Math.max(0.6, 1 - noCount * 0.08);
  const renderNoInPortal = showNo && noCount > 0;

  const moveNoButton = () => {
    if (!moveNo || !areaRef.current) return;
    const padding = 12;
    const btnWidth = 140;
    const btnHeight = 56;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const maxX = Math.max(padding, viewportWidth - btnWidth - padding);
    const maxY = Math.max(padding, viewportHeight - btnHeight - padding);
    const edge = Math.floor(Math.random() * 4);
    let x = padding;
    let y = padding;

    if (edge === 0) {
      // top edge
      x = Math.min(maxX, Math.random() * maxX + padding);
      y = padding;
    } else if (edge === 1) {
      // right edge
      x = maxX;
      y = Math.min(maxY, Math.random() * maxY + padding);
    } else if (edge === 2) {
      // bottom edge
      x = Math.min(maxX, Math.random() * maxX + padding);
      y = maxY;
    } else {
      // left edge
      x = padding;
      y = Math.min(maxY, Math.random() * maxY + padding);
    }

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

  useEffect(() => {
    setDodgeRemaining(noCount);
  }, [noCount]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNoPress = () => {
    if (dodgeRemaining > 0) {
      setDodgeRemaining((value) => Math.max(0, value - 1));
      moveNoButton();
      return;
    }
    setNoCount((count) => Math.min(count + 1, maxNoTotal));
  };

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
                style={{
                  justifyContent: hideNo ? "center" : "center",
                  flexDirection: stackButtons ? "row" : "column",
                  gap: stackButtons ? 14 : 18,
                }}
              >
                <button
                  className="btn btn-yes"
                  style={{ transform: `scale(${yesScale})`, order: swapButtons ? 2 : 1 }}
                  onClick={() => setPhase("yes")}
                >
                  Yes
                </button>
                {showNo && !renderNoInPortal && (
                  <button
                    className={`btn btn-no ${shrinkNo ? "shrink" : ""} ${
                      moveNo ? "mover" : ""
                    }`}
                    style={{
                      order: swapButtons ? 1 : 2,
                      left: moveNo ? noPos.x : undefined,
                      top: moveNo ? noPos.y : undefined,
                      fontSize: `${1.05 * noScale}rem`,
                      padding: `${14 * noScale}px ${28 * noScale}px`,
                      minWidth: 120,
                      minHeight: 48,
                      pointerEvents: "auto",
                    }}
                    onClick={handleNoPress}
                    onPointerEnter={() => {
                      if (dodgeRemaining > 0) {
                        setDodgeRemaining((value) => Math.max(0, value - 1));
                        moveNoButton();
                      }
                    }}
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
            <h2 className="yes-title">Best decision you've made all day!</h2>
            <p className="subtext">Ready to eat some good food???? 🤤 (Heads up, they don't do reservations) </p>
            <div className="plan">Dinner @ Soju - February 14, today, at 5:30 PM</div>
            <button className="btn btn-outline" onClick={handleReset}>
              Replay
            </button>
          </section>
        )}
      </main>
      {mounted &&
        renderNoInPortal &&
        createPortal(
          <div className="no-layer">
            <button
              className={`btn btn-no ${shrinkNo ? "shrink" : ""} ${
                moveNo ? "mover" : ""
              }`}
              style={{
                left: noPos.x,
                top: noPos.y,
                fontSize: `${1.05 * noScale}rem`,
                padding: `${14 * noScale}px ${28 * noScale}px`,
                minWidth: 120,
                minHeight: 48,
              }}
              onClick={handleNoPress}
              onPointerEnter={() => {
                if (dodgeRemaining > 0) {
                  setDodgeRemaining((value) => Math.max(0, value - 1));
                  moveNoButton();
                }
              }}
            >
              {changeNoLabel ? "Not No" : "No"}
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

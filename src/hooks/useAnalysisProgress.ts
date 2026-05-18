"use client";

import { useState, useEffect, useRef } from "react";

interface AnalysisStage {
  at: number;
  label: string;
}

const DEFAULT_STAGES: AnalysisStage[] = [
  { at: 0, label: "Connecting to Spotify..." },
  { at: 15, label: "Reading listening history..." },
  { at: 35, label: "Mapping genre DNA..." },
  { at: 55, label: "Analyzing mood spectrum..." },
  { at: 75, label: "Identifying archetype..." },
  { at: 90, label: "Synthesizing profile..." },
  { at: 100, label: "Analysis complete" },
];

export const useAnalysisProgress = (isDataReady: boolean) => {
  const [progress, setProgress] = useState(0);
  const [stageLabel, setStageLabel] = useState("Initializing...");
  const [isComplete, setIsComplete] = useState(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      let next = progressRef.current + 1;
      if (next > 100) next = 100;

      // Hold at 89% until data actually arrives from the API
      if (next >= 90 && !isDataReady) {
        next = 89;
      }

      progressRef.current = next;
      setProgress(next);

      const stage = [...DEFAULT_STAGES].reverse().find(s => next >= s.at);
      if (stage) setStageLabel(stage.label);

      if (next >= 100 && isDataReady) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsComplete(true);
      }
    }, 60);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isDataReady]);

  return { progress, stageLabel, isComplete };
};

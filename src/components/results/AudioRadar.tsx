"use client";

import React from "react";
import { motion } from "framer-motion";
import { getRadarPoint } from "@/utils/radar";
import { MoodSpectrum } from "@/types/personality";

interface AudioRadarProps {
  mood: MoodSpectrum;
  size?: number;
}

export const AudioRadar: React.FC<AudioRadarProps> = ({ mood, size = 200 }) => {
  const points = [
    { label: 'Energy', value: mood.energy },
    { label: 'Valence', value: mood.valence },
    { label: 'Dance', value: mood.danceability },
    { label: 'Acoustic', value: mood.acousticness },
  ];

  const center = size / 2;
  const radius = size * 0.4;

  const pathData = points
    .map((p, i) => {
      const { x, y } = getRadarPoint(p.value, i, points.length, center, center, radius);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ') + ' Z';

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Circles */}
        {[0.25, 0.5, 0.75, 1].map((r) => (
          <circle
            key={r}
            cx={center}
            cy={center}
            r={radius * r}
            fill="none"
            stroke="white"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
        ))}
        {/* Axis Lines */}
        {points.map((p, i) => {
          const { x, y } = getRadarPoint(100, i, points.length, center, center, radius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="white"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          );
        })}
        {/* Radar Path */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={pathData}
          fill="url(#radarGradient)"
          fillOpacity="0.3"
          stroke="#4cd7f6"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4cd7f6" />
            <stop offset="100%" stopColor="#fbabff" />
          </linearGradient>
        </defs>
        {/* Labels */}
        {points.map((p, i) => {
          const { x, y } = getRadarPoint(120, i, points.length, center, center, radius);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              className="text-[10px] fill-[#869397] uppercase tracking-tighter data-mono"
            >
              {p.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

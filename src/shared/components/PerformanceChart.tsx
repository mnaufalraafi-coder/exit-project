// src/shared/components/PerformanceChart.tsx
import React from "react";

interface PerformanceChartProps {
  months: string[];
  values: number[];
  unit?: string;
}

/**
 * Responsive SVG area & line chart using EXIT design tokens.
 */
export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  months,
  values,
  unit = "",
}) => {
  if (!months.length || !values.length) {
    return null;
  }

  const width = 520;
  const height = 220;
  const paddingLeft = 56;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 32;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const rawMax = Math.max(...values);
  const rawMin = Math.min(...values);
  const spread = rawMax - rawMin || 10;
  const maxVal = Math.ceil(rawMax + spread * 0.15);
  const minVal = Math.max(0, Math.floor(rawMin - spread * 0.25));

  const xStep = months.length > 1 ? chartWidth / (months.length - 1) : 0;
  const yScale = chartHeight / (maxVal - minVal || 1);

  const coords = values.map((v, i) => ({
    x: paddingLeft + i * xStep,
    y: paddingTop + chartHeight - (v - minVal) * yScale,
    value: v,
    label: months[i] ?? "",
  }));

  const polylinePoints = coords.map((p) => `${p.x},${p.y}`).join(" ");
  const baselineY = paddingTop + chartHeight;
  const areaPath =
    coords.length > 0
      ? `M ${coords[0].x},${baselineY} ` +
        coords.map((p) => `L ${p.x},${p.y}`).join(" ") +
        ` L ${coords[coords.length - 1].x},${baselineY} Z`
      : "";

  const ticks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto overflow-visible"
      role="img"
      aria-label="Grafik Performa Portofolio"
    >
      <defs>
        <linearGradient id="exitChartGoldFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Horizontal Grid Lines & Y Labels */}
      {ticks.map((t, idx) => {
        const y = paddingTop + t * chartHeight;
        const val = Math.round(maxVal - t * (maxVal - minVal));
        return (
          <g key={idx}>
            <line
              x1={paddingLeft}
              y1={y}
              x2={width - paddingRight}
              y2={y}
              stroke="var(--border)"
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <text
              x={paddingLeft - 10}
              y={y + 4}
              textAnchor="end"
              fill="var(--text-secondary)"
              fontSize="11"
              fontWeight="500"
            >
              {val}
            </text>
          </g>
        );
      })}

      {/* Unit caption */}
      {unit && (
        <text
          x={paddingLeft}
          y={11}
          fill="var(--text-secondary)"
          fontSize="11"
          fontWeight="500"
        >
          ({unit})
        </text>
      )}

      {/* Area fill */}
      {areaPath && <path d={areaPath} fill="url(#exitChartGoldFill)" />}

      {/* Line */}
      <polyline
        fill="none"
        stroke="var(--gold)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={polylinePoints}
      />

      {/* Data Points */}
      {coords.map((p, i) => (
        <g key={`${p.label}-${i}`}>
          <circle
            cx={p.x}
            cy={p.y}
            r={4}
            fill="var(--white)"
            stroke="var(--gold-dark)"
            strokeWidth={2}
          />
          <text
            x={p.x}
            y={height - 8}
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="11"
            fontWeight="500"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

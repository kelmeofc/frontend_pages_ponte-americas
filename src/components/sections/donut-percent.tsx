"use client"

import { memo } from 'react';
import { PieChart, Pie, Label, Cell } from 'recharts';

interface DonutPercentProps {
  percent: number;
}

export const DonutPercent = memo(({ percent }: DonutPercentProps) => {
  const clamped = Math.max(0, Math.min(100, percent));
  const data = [
    { name: 'value', value: clamped },
    { name: 'rest', value: 100 - clamped },
  ];
  const GREEN = '#bbf7d0'; // Tailwind green-200
  const TRACK = '#e5e7eb';

  return (
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
      <PieChart width={64} height={64}>
        <Pie
          data={data}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          innerRadius={20}
          outerRadius={30}
          strokeWidth={0}
          isAnimationActive
          animationDuration={600}
          cornerRadius={9999}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={index === 0 ? GREEN : TRACK} />
          ))}
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan className="fill-neutral-800 text-xs font-medium">{clamped}</tspan>
                    <tspan className="fill-neutral-800 text-[9.6px] font-medium">%</tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </Pie>
      </PieChart>
    </div>
  );
});

DonutPercent.displayName = 'DonutPercent';
import { useEffect, useRef } from "preact/hooks";
import Chart from "chart.js/auto";
import type { Chart as ChartType } from "chart.js";
import "./CostChart.css";

interface ChartData {
  carName: string;
  cost: number;
}

interface Props {
  selectedYear: number;
  data: ChartData[];
}

/**
 * Oszlopdiagram, amely az autók éves szervizköltségeit jeleníti meg.
 *
 * A komponens:
 * - inicializál egy Chart.js grafikont,
 * - újrarajzolja azt, ha változik az év vagy az adatlista,
 * - törli a régi grafikont új példány létrehozása előtt (memory leak elkerülése).
 */
export default function CostChart({ selectedYear, data }: Readonly<Props>) {
  // Canvas elem referenciája
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // A Chart.js példány referenciája
  const chartRef = useRef<ChartType | null>(null);

  // Van-e bármilyen költség az adott évben
  const hasData = data.some((d) => d.cost > 0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Ha már létezik grafikon, töröljük, mielőtt újat hozunk létre
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Új grafikon létrehozása
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((d) => d.carName),
        datasets: [
          {
            label: `${selectedYear} összköltség (Ft)`,
            data: data.map((d) => d.cost),
            backgroundColor: "rgba(11, 132, 255, 0.5)",
            borderColor: "rgba(11, 132, 255, 1)",
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
        scales: {
          x: { ticks: { color: "#646464ff" } },
          y: { beginAtZero: true, ticks: { color: "#747474ff" } },
        },
      },
    });

    // Cleanup: grafikon törlése unmount előtt
    return () => {
      chartRef.current?.destroy();
    };
  }, [selectedYear, data]);

  // Ha nincs adat az adott évben
  if (!hasData) {
    return <p class="no-data">Ebben az évben nincs adat.</p>;
  }

  return (
    <div class="chart-wrapper">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

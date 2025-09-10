// resources/js/Components/Dashboard/JobStatusBarChart.tsx
import { useEffect, useRef, useState } from 'react';

interface JobStats {
  pending: number;
  in_progress: number;
  completed: number;
  on_hold: number;
}

interface Props {
  stats: JobStats;
}

export default function JobStatusBarChart({ stats }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animationProgress, setAnimationProgress] = useState(0);

  const data = [
    { 
      label: 'Pending', 
      value: stats.pending, 
      color: '#F59E0B', 
      hoverColor: '#F97316',
      gradient: ['#FCD34D', '#F59E0B', '#D97706'],
      icon: 'fas fa-clock'
    },
    { 
      label: 'In Progress', 
      value: stats.in_progress, 
      color: '#3B82F6', 
      hoverColor: '#2563EB',
      gradient: ['#93C5FD', '#3B82F6', '#1D4ED8'],
      icon: 'fas fa-spinner'
    },
    { 
      label: 'Completed', 
      value: stats.completed, 
      color: '#10B981', 
      hoverColor: '#059669',
      gradient: ['#6EE7B7', '#10B981', '#047857'],
      icon: 'fas fa-check-circle'
    },
    { 
      label: 'On Hold', 
      value: stats.on_hold, 
      color: '#EF4444', 
      hoverColor: '#DC2626',
      gradient: ['#FCA5A5', '#EF4444', '#B91C1C'],
      icon: 'fas fa-pause-circle'
    },
  ];

  const maxValue = Math.max(...data.map(item => item.value), 1);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Animation effect
  useEffect(() => {
    let animationFrame: number;
    let start: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 1000, 1); // 1 second animation
      setAnimationProgress(progress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [stats]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePos({ x: event.clientX, y: event.clientY });

    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const barWidth = chartWidth / data.length;

    let foundBar = null;
    for (let i = 0; i < data.length; i++) {
      const barX = padding + (i * barWidth) + barWidth * 0.15;
      const barWidthActual = barWidth * 0.7;
      
      if (x >= barX && x <= barX + barWidthActual) {
        foundBar = i;
        break;
      }
    }

    setHoveredBar(foundBar);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const barWidth = chartWidth / data.length;
    const maxBarHeight = chartHeight - 60;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#fafbfc');
    bgGradient.addColorStop(1, '#f8fafc');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines with improved styling
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (maxBarHeight * i) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
      
      // Y-axis labels with better styling
      const value = Math.round(maxValue - (maxValue * i) / 5);
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(value.toString(), padding - 15, y + 4);
    }

    ctx.setLineDash([]);

    // Draw bars with animations and gradients
    data.forEach((item, index) => {
      const x = padding + (index * barWidth) + barWidth * 0.15;
      const width = barWidth * 0.7;
      const animatedValue = item.value * animationProgress;
      const height = maxValue > 0 ? (animatedValue / maxValue) * maxBarHeight : 0;
      const y = padding + maxBarHeight - height;
      const isHovered = hoveredBar === index;

      // Create gradient for bar
      const gradient = ctx.createLinearGradient(x, y, x, y + height);
      gradient.addColorStop(0, item.gradient[0]);
      gradient.addColorStop(0.5, item.gradient[1]);
      gradient.addColorStop(1, item.gradient[2]);

      // Draw bar shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = isHovered ? 15 : 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = isHovered ? 8 : 4;

      // Draw bar with rounded corners
      const radius = 8;
      const barHeight = Math.max(height, 0);
      
      ctx.beginPath();
      ctx.moveTo(x + radius, y + barHeight);
      ctx.lineTo(x + width - radius, y + barHeight);
      ctx.quadraticCurveTo(x + width, y + barHeight, x + width, y + barHeight - radius);
      ctx.lineTo(x + width, y + radius);
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
      ctx.lineTo(x + radius, y);
      ctx.quadraticCurveTo(x, y, x, y + radius);
      ctx.lineTo(x, y + barHeight - radius);
      ctx.quadraticCurveTo(x, y + barHeight, x + radius, y + barHeight);
      ctx.closePath();

      ctx.fillStyle = isHovered ? item.hoverColor : gradient;
      ctx.fill();

      // Add glossy effect
      const glossGradient = ctx.createLinearGradient(x, y, x, y + height * 0.3);
      glossGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      glossGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glossGradient;
      ctx.fill();

      // Reset shadow
      ctx.shadowColor = 'transparent';

      // Add value on top of bar with background
      if (animatedValue > 0) {
        const displayValue = Math.round(animatedValue);
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        
        // Draw value background
        const textWidth = ctx.measureText(displayValue.toString()).width;
        const bgX = x + width / 2 - textWidth / 2 - 6;
        const bgY = y - 25;
        
        ctx.fillStyle = isHovered ? item.hoverColor : item.color;
        ctx.beginPath();
        ctx.roundRect(bgX, bgY, textWidth + 12, 20, 10);
        ctx.fill();
        
        // Draw value text
        ctx.fillStyle = '#ffffff';
        ctx.fillText(displayValue.toString(), x + width / 2, y - 10);
      }

      // Draw x-axis labels with icons
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + width / 2, canvas.height - padding + 25);

      // Draw percentage below label
      if (total > 0) {
        const percentage = Math.round((item.value / total) * 100);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText(`${percentage}%`, x + width / 2, canvas.height - padding + 40);
      }
    });

    // Draw axes with improved styling
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    
    // Y-axis title
    ctx.save();
    ctx.translate(20, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Number of Jobs', 0, 0);
    ctx.restore();

  }, [stats, maxValue, hoveredBar, animationProgress, total]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-chart-bar text-white text-lg"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Job Status Overview</h3>
            <p className="text-sm text-gray-500">Detailed numerical breakdown</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
          Real-time
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={450}
          height={350}
          className="max-w-full cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        
        {/* Tooltip */}
        {hoveredBar !== null && (
          <div 
            className="fixed z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{ left: mousePos.x, top: mousePos.y - 10 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <i className={`${data[hoveredBar].icon} text-sm`}></i>
              <div className="text-sm font-bold">{data[hoveredBar].label}</div>
            </div>
            <div className="text-xs text-gray-300">
              {data[hoveredBar].value} jobs 
              {total > 0 && ` • ${Math.round((data[hoveredBar].value / total) * 100)}% of total`}
            </div>
          </div>
        )}
        
        <div className="mt-6 grid grid-cols-2 gap-4 w-full">
          {data.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                hoveredBar === index 
                  ? 'bg-gradient-to-r from-gray-50 to-blue-50 border-blue-200 scale-105 shadow-md' 
                  : 'hover:bg-gray-50 border-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <i className={`${item.icon} text-lg`} style={{ color: item.color }}></i>
                <div 
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ 
                    background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})` 
                  }}
                ></div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">{item.label}</div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-gray-900">{item.value}</span>
                  {total > 0 && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {Math.round((item.value / total) * 100)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

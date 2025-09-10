// resources/js/Components/Dashboard/JobStatusChart.tsx
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

export default function JobStatusChart({ stats }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animationProgress, setAnimationProgress] = useState(0);
  const [rotation, setRotation] = useState(0);

  const data = [
    { 
      label: 'Pending', 
      value: stats.pending, 
      color: '#F59E0B', 
      hoverColor: '#F97316',
      gradient: ['#FEF3C7', '#FCD34D', '#F59E0B', '#D97706'],
      icon: '⏳',
      description: 'Jobs waiting to start'
    },
    { 
      label: 'In Progress', 
      value: stats.in_progress, 
      color: '#3B82F6', 
      hoverColor: '#2563EB',
      gradient: ['#DBEAFE', '#93C5FD', '#3B82F6', '#1D4ED8'],
      icon: '🔄',
      description: 'Currently active jobs'
    },
    { 
      label: 'Completed', 
      value: stats.completed, 
      color: '#10B981', 
      hoverColor: '#059669',
      gradient: ['#D1FAE5', '#6EE7B7', '#10B981', '#047857'],
      icon: '✅',
      description: 'Successfully finished jobs'
    },
    { 
      label: 'On Hold', 
      value: stats.on_hold, 
      color: '#EF4444', 
      hoverColor: '#DC2626',
      gradient: ['#FEE2E2', '#FCA5A5', '#EF4444', '#B91C1C'],
      icon: '⏸️',
      description: 'Temporarily paused jobs'
    },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Smooth rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Entry animation
  useEffect(() => {
    let animationFrame: number;
    let start: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 1500, 1); // 1.5 second animation
      
      // Easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      setAnimationProgress(easeOutCubic(progress));

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

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    const angle = Math.atan2(y - centerY, x - centerX);
    const normalizedAngle = angle < -Math.PI / 2 ? angle + 2 * Math.PI : angle;
    const adjustedAngle = normalizedAngle + Math.PI / 2;

    let currentAngle = 0;
    let foundSegment = null;

    for (let i = 0; i < data.length; i++) {
      if (data[i].value > 0) {
        const sliceAngle = (data[i].value / total) * 2 * Math.PI * animationProgress;
        if (adjustedAngle >= currentAngle && adjustedAngle <= currentAngle + sliceAngle) {
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          if (distance <= radius && distance >= radius * 0.45) {
            foundSegment = i;
          }
          break;
        }
        currentAngle += sliceAngle;
      }
    }

    setHoveredSegment(foundSegment);
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = Math.min(centerX, centerY) - 40;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background with subtle pattern
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius + 50);
    bgGradient.addColorStop(0, '#ffffff');
    bgGradient.addColorStop(0.7, '#f8fafc');
    bgGradient.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add outer glow effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8;

    if (total === 0) {
      // Enhanced empty state
      const emptyGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius);
      emptyGradient.addColorStop(0, '#f8fafc');
      emptyGradient.addColorStop(0.6, '#e2e8f0');
      emptyGradient.addColorStop(1, '#cbd5e1');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, 2 * Math.PI);
      ctx.fillStyle = emptyGradient;
      ctx.fill();
      
      // Draw empty state pattern
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No Jobs Available', centerX, centerY - 10);
      
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText('Add some jobs to see statistics', centerX, centerY + 15);
      return;
    }

    let currentAngle = -Math.PI / 2 + (rotation * Math.PI / 180) * 0.1; // Slow rotation

    data.forEach((item, index) => {
      if (item.value > 0) {
        const sliceAngle = (item.value / total) * 2 * Math.PI * animationProgress;
        const isHovered = hoveredSegment === index;
        const radius = isHovered ? baseRadius + 12 : baseRadius;
        const pulseRadius = isHovered ? radius + Math.sin(Date.now() / 200) * 3 : radius;

        // Create complex gradient for 3D effect
        const gradient = ctx.createRadialGradient(
          centerX - radius * 0.3, 
          centerY - radius * 0.3, 
          0,
          centerX, 
          centerY, 
          pulseRadius
        );
        gradient.addColorStop(0, item.gradient[0]);
        gradient.addColorStop(0.3, item.gradient[1]);
        gradient.addColorStop(0.7, item.gradient[2]);
        gradient.addColorStop(1, item.gradient[3]);

        // Draw slice with 3D effect
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, pulseRadius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add inner shadow for depth
        ctx.save();
        ctx.clip();
        const innerShadowGradient = ctx.createRadialGradient(centerX, centerY, pulseRadius * 0.3, centerX, centerY, pulseRadius);
        innerShadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        innerShadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
        ctx.fillStyle = innerShadowGradient;
        ctx.fill();
        ctx.restore();

        // Add bright edge highlight
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius - 2, currentAngle, currentAngle + sliceAngle);
        ctx.strokeStyle = `rgba(255, 255, 255, ${isHovered ? 0.8 : 0.4})`;
        ctx.lineWidth = isHovered ? 4 : 2;
        ctx.stroke();

        // Add segment separator
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(currentAngle) * pulseRadius,
          centerY + Math.sin(currentAngle) * pulseRadius
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw percentage and icon on slice (for larger slices)
        if (sliceAngle > 0.4 && animationProgress > 0.8) {
          const textAngle = currentAngle + sliceAngle / 2;
          const textRadius = pulseRadius * 0.7;
          const textX = centerX + Math.cos(textAngle) * textRadius;
          const textY = centerY + Math.sin(textAngle) * textRadius;

          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 3;
          
          // Draw icon
          ctx.font = '20px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(item.icon, textX, textY - 8);
          
          // Draw percentage
          ctx.font = 'bold 14px sans-serif';
          const percentage = Math.round((item.value / total) * 100);
          ctx.fillText(`${percentage}%`, textX, textY + 12);
          
          ctx.shadowColor = 'transparent';
        }

        currentAngle += sliceAngle;
      }
    });

    // Reset shadow for center elements
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;

    // Draw center circle with advanced styling
    const centerGradient = ctx.createRadialGradient(
      centerX - 20, centerY - 20, 0,
      centerX, centerY, baseRadius * 0.45
    );
    centerGradient.addColorStop(0, '#ffffff');
    centerGradient.addColorStop(0.3, '#fefefe');
    centerGradient.addColorStop(0.7, '#f8fafc');
    centerGradient.addColorStop(1, '#f1f5f9');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius * 0.45, 0, 2 * Math.PI);
    ctx.fillStyle = centerGradient;
    ctx.fill();

    // Add center circle border with gradient
    const borderGradient = ctx.createLinearGradient(
      centerX - baseRadius * 0.45, centerY - baseRadius * 0.45,
      centerX + baseRadius * 0.45, centerY + baseRadius * 0.45
    );
    borderGradient.addColorStop(0, '#e2e8f0');
    borderGradient.addColorStop(0.5, '#cbd5e1');
    borderGradient.addColorStop(1, '#94a3b8');
    
    ctx.strokeStyle = borderGradient;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Reset shadow for text
    ctx.shadowColor = 'transparent';

    // Draw center content with better typography
    const centerTextGradient = ctx.createLinearGradient(centerX, centerY - 30, centerX, centerY + 30);
    centerTextGradient.addColorStop(0, '#1e293b');
    centerTextGradient.addColorStop(1, '#475569');
    
    ctx.fillStyle = centerTextGradient;
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(total.toString(), centerX, centerY - 8);
    
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('TOTAL JOBS', centerX, centerY + 12);
    
    // Add pulse effect around total number
    if (animationProgress > 0.9) {
      const pulseAlpha = (Math.sin(Date.now() / 300) + 1) / 4 + 0.1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 0.35, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(59, 130, 246, ${pulseAlpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

  }, [stats, total, hoveredSegment, animationProgress, rotation]);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-chart-pie text-white text-xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Job Distribution
            </h3>
            <p className="text-sm text-gray-500 font-medium">Real-time status overview</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-sm font-semibold border border-green-200">
            Live Data
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-10">
        {/* Enhanced Chart */}
        <div className="flex-shrink-0 relative">
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="max-w-full cursor-pointer drop-shadow-lg"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          
          {/* Enhanced Tooltip */}
          {hoveredSegment !== null && (
            <div 
              className="fixed z-50 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-3 rounded-xl shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-full border border-gray-700"
              style={{ left: mousePos.x, top: mousePos.y - 15 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{data[hoveredSegment].icon}</span>
                <div className="text-sm font-bold text-white">{data[hoveredSegment].label}</div>
              </div>
              <div className="text-xs text-gray-300 mb-1">
                {data[hoveredSegment].description}
              </div>
              <div className="text-xs text-gray-200">
                <span className="font-semibold text-white">{data[hoveredSegment].value}</span> jobs • 
                <span className="font-semibold text-white"> {Math.round((data[hoveredSegment].value / total) * 100)}%</span> of total
              </div>
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          )}
        </div>
        
        {/* Enhanced Legend */}
        <div className="flex-1 space-y-4">
          {data.map((item, index) => (
            <div 
              key={index} 
              className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                hoveredSegment === index 
                  ? 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-300 shadow-lg scale-105 transform' 
                  : 'hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div 
                    className="w-5 h-5 rounded-full shadow-lg border-2 border-white"
                    style={{ 
                      background: `linear-gradient(135deg, ${item.gradient[1]}, ${item.gradient[2]})` 
                    }}
                  ></div>
                  {hoveredSegment === index && (
                    <div className="absolute inset-0 w-5 h-5 rounded-full animate-ping opacity-30"
                         style={{ backgroundColor: item.color }}></div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <div>
                    <div className="font-bold text-gray-800 group-hover:text-gray-900">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-600">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-2xl text-gray-900 group-hover:scale-110 transition-transform duration-200">
                  {item.value}
                </div>
                {total > 0 && (
                  <div className="text-sm text-gray-500 bg-gray-100 group-hover:bg-gray-200 px-3 py-1 rounded-full transition-colors duration-200">
                    {Math.round((item.value / total) * 100)}%
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Summary Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="font-medium">Total Projects</span>
              <span className="font-bold text-lg text-gray-900">{total}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
              <span>Last updated</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

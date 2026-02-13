'use client'

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, subDays, startOfDay, eachDayOfInterval } from 'date-fns'

interface EarningsChartProps {
    data: { date: string; value: number }[]
}

export default function EarningsChart({ data }: EarningsChartProps) {
    const [duration, setDuration] = useState<'7D' | '30D' | '90D'>('30D')

    // Filter data based on duration
    const days = duration === '7D' ? 7 : duration === '30D' ? 30 : 90

    // Generate full date range to ensure continuity
    const endDate = startOfDay(new Date())
    const startDate = subDays(endDate, days - 1)

    // Map existing data to full range, filling missing days with 0
    const chartData = eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
        const dateStr = format(date, 'MMM d')
        const existingPoint = data.find(d => d.date === dateStr) // Simple check, ideally check actual dates
        // For accurate mapping we need actual Date objects in prop, but assuming 'MMM d' string matches for now from Dashboard logic
        return {
            date: dateStr,
            value: existingPoint ? existingPoint.value : 0
        }
    })

    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0A0A0A]/90 border border-white/[0.1] backdrop-blur-md rounded-xl p-4 shadow-xl">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">{label}</p>
                    <p className="text-xl font-black text-[#00E676] tracking-tight">
                        ${payload[0].value.toFixed(2)}
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 mb-5">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-[14px] font-bold">Earnings Overview</h3>
                    <p className="text-[11px] text-white/25 mt-0.5">Performance over time</p>
                </div>
                <div className="flex gap-1 bg-white/[0.03] rounded-lg p-0.5 border border-white/[0.06]">
                    {(['7D', '30D', '90D'] as const).map(d => (
                        <button
                            key={d}
                            onClick={() => setDuration(d)}
                            className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${duration === d ? 'bg-[#00E676]/10 text-[#00E676] shadow-sm' : 'text-white/30 hover:text-white/50'}`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00E676" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#333"
                            tick={{ fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={30}
                        />
                        <YAxis
                            stroke="#333"
                            tick={{ fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value: number) => `$${value}`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#00E676', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#00E676"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

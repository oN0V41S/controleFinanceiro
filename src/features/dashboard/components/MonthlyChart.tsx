'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartWrapper, CHART_COLORS, ChartTooltipStyle, ChartLabelStyle, ChartItemStyle } from './ChartWrapper';
import { cn } from '@/lib/utils';

interface MonthlyPoint {
  month: string;
  monthLabel: string;
  income: number;
  expense: number;
}

type Semester = 's1' | 's2';

interface MonthlyChartProps {
  data: MonthlyPoint[];
  semester: Semester;
  onSemesterChange: (s: Semester) => void;
}

function formatYAxis(value: number): string {
  if (value >= 1000) return `R$${(value / 1000).toFixed(0)}k`;
  return `R$${value}`;
}

function SemesterToggle({ value, onChange }: { value: Semester; onChange: (s: Semester) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      {(['s1', 's2'] as Semester[]).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={cn(
            'rounded-md px-3 py-1 text-xs font-medium transition-colors',
            value === s
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-muted-foreground hover:text-on-surface',
          )}
        >
          {s === 's1' ? '1º Sem.' : '2º Sem.'}
        </button>
      ))}
    </div>
  );
}

export function MonthlyChart({ data, semester, onSemesterChange }: MonthlyChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">Evolução Mensal</CardTitle>
          <SemesterToggle value={semester} onChange={onSemesterChange} />
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[280px]">
          <p className="text-on-surface-variant text-sm">Nenhum dado para o período selecionado.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">Evolução Mensal</CardTitle>
        <SemesterToggle value={semester} onChange={onSemesterChange} />
      </CardHeader>
      <CardContent>
        <ChartWrapper height={280}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e32" vertical={false} />
            <XAxis
              dataKey="monthLabel"
              tick={{ fill: '#787679', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: '#787679', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip
              contentStyle={ChartTooltipStyle}
              labelStyle={ChartLabelStyle}
              itemStyle={ChartItemStyle}
              formatter={(value: number) =>
                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
              }
            />
            <Legend
              formatter={(value: string) =>
                value === 'income' ? 'Entradas' : 'Saídas'
              }
              wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            />
            <Bar
              dataKey="income"
              name="income"
              fill={CHART_COLORS.income}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="expense"
              name="expense"
              fill={CHART_COLORS.expense}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MonthlyChart } from '../MonthlyChart';

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: ({ dataKey }: { dataKey: string }) => (
    <div data-testid={`bar-${dataKey}`} />
  ),
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => <div data-testid="legend" />,
}));

const mockData = [
  { month: '04', monthLabel: 'Abr', income: 4800, expense: 3200 },
  { month: '05', monthLabel: 'Mai', income: 5200, expense: 3800 },
];

describe('MonthlyChart', () => {
  it('renders without crash', () => {
    render(
      <MonthlyChart
        data={[]}
        semester="s1"
        onSemesterChange={() => {}}
      />
    );
    expect(screen.getByText('Evolução Mensal')).toBeInTheDocument();
  });

  it('renders chart with real data', () => {
    render(
      <MonthlyChart
        data={mockData}
        semester="s1"
        onSemesterChange={() => {}}
      />
    );
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar-income')).toBeInTheDocument();
    expect(screen.getByTestId('bar-expense')).toBeInTheDocument();
  });

  it('shows empty state text when data is empty', () => {
    render(
      <MonthlyChart
        data={[]}
        semester="s1"
        onSemesterChange={() => {}}
      />
    );
    expect(screen.getByText('Nenhum dado para o período selecionado.')).toBeInTheDocument();
    expect(screen.queryByTestId('bar-chart')).not.toBeInTheDocument();
  });

  it('renders semester toggle buttons', () => {
    render(
      <MonthlyChart
        data={mockData}
        semester="s1"
        onSemesterChange={() => {}}
      />
    );
    expect(screen.getByText('1º Sem.')).toBeInTheDocument();
    expect(screen.getByText('2º Sem.')).toBeInTheDocument();
  });
});

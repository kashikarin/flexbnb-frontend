import { BarChart } from '@mui/x-charts/BarChart'

export default function BasicBars() {
  return (
    <BarChart
      xAxis={[{ data: ['Total Income', 'Income Accepted', 'Income Rejected'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={400}
      height={200}
    />
  )
}

import { PieChart } from '@mui/x-charts/PieChart'
import { useSelector } from 'react-redux'
export default function BasicPie() {
  const orders = useSelector((state) => state.orderModule.orders)
  const approved = orders.filter((order) => order.status === 'approved').length
  const rejected = orders.filter((order) => order.status === 'rejected').length
  const pending = orders.filter((order) => order.status === 'pending').length
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: approved, label: 'Approved', color: '#A3DC9A' },
              { id: 1, value: rejected, label: 'Rejected', color: '#FFB4B4' },
              { id: 2, value: pending, label: 'Pending', color: '#E5E0D8' },
            ],
          },
        ]}
        width={200}
        height={200}
      />
    </div>
  )
}

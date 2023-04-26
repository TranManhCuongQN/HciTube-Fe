import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const chartOptions = {
  chart: {
    type: 'area' as const,
    height: 365,
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'straight' as const
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    type: 'datetime' as const,
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM',
        day: 'd'
      },
      formatter: (timestamp: string) => {
        const date = new Date(timestamp)
        const formattedDate = date.toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
        return formattedDate
      }
    }
  },

  yaxis: {
    opposite: true,
    show: true,
    labels: {
      formatter: (value: number) => (value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value) as string
    },
    min: 0,
    max: 5
  },
  grid: {
    show: false
  },
  legend: {
    horizontalAlign: 'left' as const
  }
}
const Chart = () => {
  const [options, setOptions] = useState<ApexCharts.ApexOptions>(chartOptions)

  const series = [
    {
      name: 'Views',
      data: [
        [new Date('2023-03-14').getTime(), 0],
        [new Date('2023-03-15').getTime(), 0],
        [new Date('2023-03-16').getTime(), 0],
        [new Date('2023-03-17').getTime(), 0],
        [new Date('2023-03-18').getTime(), 0],
        [new Date('2023-03-19').getTime(), 0],
        [new Date('2023-03-20').getTime(), 1]
      ]
    }
  ]

  return <ReactApexChart options={options} series={series} height={450} type='area' />
}

export default Chart

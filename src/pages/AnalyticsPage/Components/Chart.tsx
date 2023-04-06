import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const chartOptions = {
  chart: {
    height: 450,
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 2
  },
  grid: {
    strokeDashArray: 2
  }
}
const Chart = () => {
  const [options, setOptions] = useState<ApexCharts.ApexOptions>(chartOptions)

  const series = [
    {
      name: 'All Tasks',
      data: [31, 40, 28, 51, 42, 109, 100]
    }
  ]

  return <ReactApexChart options={options} series={series} height={450} type='line' />
}

export default Chart

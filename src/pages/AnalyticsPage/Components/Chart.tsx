import { useEffect, useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { get28DaysAgo, get365DaysAgo, get90DaysAgo, getSevenDaysAgo } from 'src/utils/utils'

const chartOptions = {
  chart: {
    height: 450,
    type: 'area' as const,
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth' as const,
    width: 2
  }
}

const Chart = ({ data, slot }: { slot: string; data: { date: string; count: number }[] }) => {
  const [options, setOptions] = useState<ApexCharts.ApexOptions>(chartOptions)
  const [series7Days, setSeries7Days] = useState<number[]>([])
  const [series28Days, setSeries28Days] = useState<number[]>([])
  const [series90Days, setSeries90Days] = useState<number[]>([])
  const [series365Days, setSeries365Days] = useState<number[]>([])
  const [sevenDaysKeys, setSevenDaysKeys] = useState<string[]>([])
  const [twentyEightDaysKeys, setTwentyEightDaysKeys] = useState<string[]>([])
  const [ninetyDaysKeys, setNinetyDaysKeys] = useState<string[]>([])
  const [threeSixtyFiveDaysKeys, setThreeSixtyFiveDaysKeys] = useState<string[]>([])
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([{ name: 'Views', data: [] }])

  const sevenDays = useMemo(() => {
    if (slot === '7days') {
      const days = getSevenDaysAgo()
      const sevenDaysObj: any = {}

      for (const day in days) {
        sevenDaysObj[days[day]] = 0
      }

      for (const key in data) {
        sevenDaysObj[data[key].date] = data[key].count
      }

      return sevenDaysObj
    }
  }, [data, slot])

  const twentyEightDays = useMemo(() => {
    if (slot === '28days') {
      const days = get28DaysAgo()
      const twentyEightDaysObj: any = {}

      for (const day in days) {
        twentyEightDaysObj[days[day]] = 0
      }

      for (const key in data) {
        twentyEightDaysObj[data[key].date] = data[key].count
      }

      return twentyEightDaysObj
    }
  }, [data, slot])

  const ninetyDays = useMemo(() => {
    if (slot === '90days') {
      const days = get90DaysAgo()
      const ninetyDaysObj: any = {}

      for (const day in days) {
        ninetyDaysObj[days[day]] = 0
      }

      for (const key in data) {
        ninetyDaysObj[data[key].date] = data[key].count
      }

      return ninetyDaysObj
    }
  }, [data, slot])

  const threeSixtyFiveDays = useMemo(() => {
    if (slot === '365days') {
      const days = get365DaysAgo()
      const threeSixtyFiveDaysObj: any = {}

      for (const day in days) {
        threeSixtyFiveDaysObj[days[day]] = 0
      }

      for (const key in data) {
        threeSixtyFiveDaysObj[data[key].date] = data[key].count
      }

      return threeSixtyFiveDaysObj
    }
  }, [data, slot])

  useEffect(() => {
    if (slot === '7days') {
      setSeries7Days(Object.values(sevenDays))
      setSevenDaysKeys(Object.keys(sevenDays))
    } else if (slot === '28days') {
      setSeries28Days(Object.values(twentyEightDays))
      setTwentyEightDaysKeys(Object.keys(twentyEightDays))
    } else if (slot === '90days') {
      setSeries90Days(Object.values(ninetyDays))
      setNinetyDaysKeys(Object.keys(ninetyDays))
    } else if (slot === '365days') {
      setSeries365Days(Object.values(threeSixtyFiveDays))
      setThreeSixtyFiveDaysKeys(Object.keys(threeSixtyFiveDays))
    }
  }, [slot, sevenDays, twentyEightDays, ninetyDays, threeSixtyFiveDays])

  useEffect(() => {
    if (slot === '7days')
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: sevenDaysKeys,
          axisBorder: {
            show: true
          },
          tickAmount: 7
        }
      }))
    else if (slot === '28days') {
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: twentyEightDaysKeys,
          axisBorder: {
            show: true
          },
          tickAmount: 7
        }
      }))
    } else if (slot === '90days') {
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: ninetyDaysKeys,
          axisBorder: {
            show: true
          },
          tickAmount: 7
        }
      }))
    } else if (slot === '365days') {
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: threeSixtyFiveDaysKeys,
          axisBorder: {
            show: true
          },
          tickAmount: 7
        }
      }))
    }
  }, [slot, sevenDaysKeys, twentyEightDaysKeys, ninetyDaysKeys, threeSixtyFiveDaysKeys])

  useEffect(() => {
    if (slot === '7days') {
      setSeries([{ name: 'Views', data: series7Days }])
    } else if (slot === '28days') {
      setSeries([{ name: 'Views', data: series28Days }])
    } else if (slot === '90days') {
      setSeries([{ name: 'Views', data: series90Days }])
    } else if (slot === '365days') {
      setSeries([{ name: 'Views', data: series365Days }])
    }
  }, [series7Days, slot, series28Days, series90Days, series365Days])

  return <ReactApexChart options={options} series={series} height={450} type='area' />
}

export default Chart

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Chart.defaults.global.defaultFontColor
ChartJS.defaults.color = '#9ca3af'
ChartJS.defaults.borderColor = '#6b7280'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      color: '#9ca3af',
      text: 'Correlation - More than meets the eye' as const,
    },
    legend: {
      position: 'bottom' as const,
      color: '#9ca3af',
    },
    annotation: {
      annotations: {
        line: {
          type: 'line',
          xMin: 0,
          xMax: 10,
          borderWidth: 2,
          borderColor: 'red',
        },
      },
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Value',
        color: '#9ca3af',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Time',
        color: '#9ca3af',
      },
    },
  },
}

const seriesGenerator = (len: number, sequence: number[]) => {
  return Array.from({ length: len }, (_, i) => sequence[i % sequence.length])
}

const cumulativeSum = (arr: number[], initValue?: number) => {
  let sum = 0
  let retArr = Array.from(arr)
  initValue && retArr.unshift(initValue)

  return retArr.map((e) => (sum = sum + e))
}

const labels = Array.from(Array(11).keys())
const dataSeries = {
  s1: cumulativeSum(seriesGenerator(11, [+1, +4]), 100),
  s2: cumulativeSum(seriesGenerator(11, [+4, +1]), 100),
  s3: cumulativeSum(seriesGenerator(11, [-2, +1]), 100),
}

const data = {
  labels,
  datasets: [
    {
      label: 'Series 1',
      borderWidth: 6,
      borderColor: 'rgba(75,192,192,1)',
      data: dataSeries['s1'],
    },
    {
      label: 'Series 2',
      borderWidth: 3,
      borderColor: 'rgb(75,176,36)',
      data: dataSeries['s2'],
    },
    {
      label: 'Series 3',
      borderWidth: 3,
      borderColor: 'rgb(220,102,46)',
      data: dataSeries['s3'],
    },
  ],
}

const CorrChart = () => {
  return <Line options={options} data={data} />
}

export default CorrChart

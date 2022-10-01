
// 引入 echarts 核心模块
import * as echarts from 'echarts/core'
// 引入取消
import { LineChart, BarChart } from 'echarts/charts'

import { GridComponent } from 'echarts/components'

import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, BarChart])

export default echarts

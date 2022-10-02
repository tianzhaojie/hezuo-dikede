
// 引入 echarts 核心模块
import * as echarts from 'echarts/core'
// 引入取消
import { LineChart, BarChart, PieChart } from 'echarts/charts'

import { GridComponent, ToolboxComponent, LegendComponent } from 'echarts/components'

import { UniversalTransition, LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, BarChart, ToolboxComponent,
  LegendComponent,
  PieChart, LabelLayout])

export default echarts

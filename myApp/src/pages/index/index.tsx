import { useState } from 'react' // 导入 useState
import Taro from '@tarojs/taro' // 导入 Taro
import { View, Text, Input, Button } from '@tarojs/components' // 导入 View、Text、Input 和 Button 组件

function SalaryPage() {
  // 使用 useState 创建五个状态变量 maleSalary、femaleSalary、totalExpense、maleExpense 和 femaleExpense
  const [maleSalary, setMaleSalary] = useState('') // 男工资
  const [femaleSalary, setFemaleSalary] = useState('') // 女工资
  const [totalExpense, setTotalExpense] = useState('') // 支出总额
  const [maleExpense, setMaleExpense] = useState('') // 男支出
  const [femaleExpense, setFemaleExpense] = useState('') // 女支出

  // 发送请求并更新男女支出状态
  const calculateExpense = () => {
    Taro.request({
      url: 'http://localhost:5000/calculate_expense', // 后端接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json' // 设置请求头
      },
      data: {
        male_salary: parseFloat(maleSalary), // 发送男工资，使用 parseFloat 将字符串转换为浮点数
        female_salary: parseFloat(femaleSalary), // 发送女工资，使用 parseFloat 将字符串转换为浮点数
        fixed_expense: parseFloat(totalExpense) // 发送支出总额，使用 parseFloat 将字符串转换为浮点数
      },
      success: res => {
        setMaleExpense(res.data.male_expense) // 更新男支出状态
        setFemaleExpense(res.data.female_expense) // 更新女支出状态
      },
      fail: err => {
        console.log(err) // 打印错误信息
      }
    })
  }
  // 发送请求并更新男女支出状态

  return (
    <View>
      <View>
        <Text>男工资</Text>
        <Input value={maleSalary} onInput={e => setMaleSalary(e.detail.value)} /> {/* 渲染男工资输入框 */}
      </View>
      <View>
        <Text>女工资</Text>
        <Input value={femaleSalary} onInput={e => setFemaleSalary(e.detail.value)} /> {/* 渲染女工资输入框 */}
      </View>
      <View>
        <Text>支出总额</Text>
        <Input value={totalExpense} onInput={e => setTotalExpense(e.detail.value)} /> {/* 渲染支出总额输入框 */}
      </View>
      <Button onClick={calculateExpense}>计算</Button> {/* 渲染计算按钮 */}
      {maleExpense && femaleExpense && ( // 如果男女支出都不为空，则渲染结果
        <View>
          <Text>男支出：{maleExpense}</Text>
          <Text>女支出：{femaleExpense}</Text>
        </View>
      )}
    </View>
  )
}

export default SalaryPage
from flask import Flask, request, jsonify # 导入 Flask、request 和 jsonify
from flask_cors import CORS # 导入 CORS 扩展

app = Flask(__name__) # 创建 Flask 应用
CORS(app) # 允许跨域请求

@app.route('/calculate_expense', methods=['POST']) # 定义计算支出的接口
def calculate_expense():
    data = request.get_json() # 获取 POST 请求中的数据
    male_salary = data['male_salary'] # 获取男工资
    female_salary = data['female_salary'] # 获取女工资
    fixed_expense = data['fixed_expense'] # 获取支出总额

    total_salary = male_salary + female_salary # 计算男女总工资
    male_ratio = male_salary / total_salary # 计算男性工资占比
    female_ratio = female_salary / total_salary # 计算女性工资占比
    male_expense = male_ratio * fixed_expense # 计算男性支出
    female_expense = female_ratio * fixed_expense # 计算女性支出

    return jsonify({ # 返回 JSON 格式数据
        'male_expense': male_expense,
        'female_expense': female_expense
    })

if __name__ == '__main__':
    app.run() # 启动应用
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/calculate_expense', methods=['POST'])
def calculate_expense():
    # 获取 POST 请求中的男工资、女工资和固定支出
    male_salary = float(request.form['male_salary']) # 男工资
    female_salary = float(request.form['female_salary']) # 女工资
    fixed_expense = float(request.form['fixed_expense']) # 支出总额

    # 计算男女支出
    total_salary = male_salary + female_salary # 总工资
    male_ratio = male_salary / total_salary # 男工资占总工资比例
    female_ratio = female_salary / total_salary # 女工资占总工资比例
    male_expense = male_ratio * fixed_expense # 男支出
    female_expense = female_ratio * fixed_expense # 女支出

    # 返回计算结果
    return jsonify({
        'male_expense': male_expense,
        'female_expense': female_expense
    })

if __name__ == '__main__':
    app.run()
#这是一个使用 Flask 框架编写的 Python 后端代码，它提供了一个 /calculate_expense 接口，
#用于接收前端发送的 POST 请求，并计算男女支出后返回结果。其中，request.form 可以获取 POST 请求中的表单数据，jsonify 可以将 Python 对象转换成 JSON 格式
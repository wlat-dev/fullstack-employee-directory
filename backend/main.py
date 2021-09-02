from flask import Flask, request
from flask_cors import CORS, logging
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employeedirectory.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)
api = Api(app)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    phone = db.Column(db.Integer, unique=True)
    position = db.Column(db.String(50))
    salary = db.Column(db.Integer)

    def __repr__(self):
        return '<Employee %s>' % self.name


class EmployeeSchema(ma.Schema):
    class Meta:
        fields = ("id", "first_name", "last_name", "email", "phone", "position", "salary")


employee_schema = EmployeeSchema()
employees_schema = EmployeeSchema(many=True)


class EmployeeListResource(Resource):
    def get(self):
        employees = Employee.query.all()
        return employees_schema.dump(employees)
    
    def post(self):
        new_employee = Employee(
            first_name=request.json['first_name'],
            last_name=request.json['last_name'],
            email=request.json['email'],
            phone=request.json['phone'],
            position=request.json['position'],
            salary=request.json['salary'],
        )
        db.session.add(new_employee)
        db.session.commit()
        return employee_schema.dump(new_employee)

class EmployeeResource(Resource):
    def get(self, employee_id):
        employee = Employee.query.get_or_404(employee_id)
        employee.headers.add("Access-Control-Allow-Origin", "*")
        return employee_schema.dump(employee)

    def patch(self, employee_id):
        employee = Employee.query.get_or_404(employee_id)

        if 'first_name' in request.json:
            employee.first_name = request.json['first_name']
        if 'last_name' in request.json:
            employee.last_name = request.json['last_name']
        if 'email' in request.json:
            employee.email = request.json['email']
        if 'phone' in request.json:
            employee.phone = request.json['phone']
        if 'position' in request.json:
            employee.position = request.json['position']
        if 'salary' in request.json:
            employee.salary = request.json['salary']

        db.session.commit()
        return employee_schema.dump(employee)

    def delete(self, employee_id):
        employee = Employee.query.get_or_404(employee_id)
        db.session.delete(employee)
        db.session.commit()
        return '', 204


api.add_resource(EmployeeListResource, '/employees')
api.add_resource(EmployeeResource, '/employees/<int:employee_id>')

if __name__ == '__main__':
    app.run(debug=True)

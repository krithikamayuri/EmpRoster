import requests
from pyomo.environ import *
from pyomo.opt import SolverFactory

# Create a ConcreteModel
model = ConcreteModel('Employee Scheduling')

# Define sets and parameters

# fetch dates from database
try:
    response = requests.get('http://localhost:5000/api/datesOnly')

    if response.status_code == 200:
        # If the request was successful, parse the response JSON to obtain the dates and staffRequired data
        dates = response.json()
    else:
        print(f"Failed to retrieve data from the API. Status code: {response.status_code}")
        dates = {}
except Exception as e:
    print(f"An error occurred while fetching data from the API: {e}")
    dates = {}

shifts = {'partTime', 'fullTime'}

# fetch emp id from database
try:
    response = requests.get('http://localhost:5000/api/employeeIds')

    if response.status_code == 200:
        # If the request was successful, parse the response JSON to obtain the employee IDs
        employee_ids = response.json()
    else:
        print(f"Failed to retrieve employee IDs from the API. Status code: {response.status_code}")
        employee_ids = {}
except Exception as e:
    print(f"An error occurred while fetching employee IDs from the API: {e}")
    employee_ids = {}

# fetch staff required from the database
try:
    # Make an HTTP GET request to the API endpoint
    response = requests.get('http://localhost:5000/api/staffRequired')

    if response.status_code == 200:
        # If the request was successful, parse the response JSON to obtain the staffRequired data
        staffRequired = response.json()
    else:
        print(f"Failed to retrieve data from the API. Status code: {response.status_code}")
        staffRequired = {}
except Exception as e:
    print(f"An error occurred while fetching data from the API: {e}")
    staffRequired = {}

salary = {'partTime': 10, 'fullTime': 12}

# fetch emp type from database
try:
    response = requests.get('http://localhost:5000/api/empType')

    if response.status_code == 200:
        # If the request was successful, parse the response JSON to obtain the shift timings
        employeeTypeData = response.json()
    else:
        print(f"Failed to retrieve employee type from the API. Status code: {response.status_code}")
        employeeTypeData = []
except Exception as e:
    print(f"An error occurred while fetching employee type from the API: {e}")
    employeeTypeData = []

employeeType = {(data['emp_name'], data['emp_type']): data['status'] for data in employeeTypeData}

# Fetch shift timings from the database
try:
    response = requests.get('http://localhost:5000/api/shiftTimings')

    if response.status_code == 200:
        # If the request was successful, parse the response JSON to obtain the shift timings
        shift_timings = response.json()
    else:
        print(f"Failed to retrieve shift timings from the API. Status code: {response.status_code}")
        shift_timings = {}
except Exception as e:
    print(f"An error occurred while fetching shift timings from the API: {e}")
    shift_timings = {}

# Send data to availability
try:
    # Create a payload using the 'dates' data
    payload = {'dates': dates}  # Modify this based on your API's requirements

    # Make a POST request to the '/api/availability' endpoint to send data
    response = requests.post('http://localhost:5000/api/availability', json=payload)

    if response.status_code == 200:
        print("Data sent to /api/availability successfully.")
    else:
        print(f"Failed to send data to /api/availability. Status code: {response.status_code}")
except Exception as e:
    print(f"An error occurred while sending data to /api/availability: {e}")

# Fetch employee availability from the database
try:
    response = requests.get('http://localhost:5000/api/availability')

    if response.status_code == 200:
        # If the request was successful, parse the response JSON to obtain the shift timings
        availabilityData = response.json()
    else:
        print(f"Failed to retrieve availability from the API. Status code: {response.status_code}")
        availabilityData = []
except Exception as e:
    print(f"An error occurred while fetching availability from the API: {e}")
    availabilityData = []

availability = {(data['date'], data['employeeName']): data['available'] for data in availabilityData}

# Fetch employee leave requests from the database
try:
    response = requests.get('http://localhost:5000/api/leave_requests')

    if response.status_code == 200:
        # If the request was successful, parse the response JSON to obtain the shift timings
        leave_requestsData = response.json()
    else:
        print(f"Failed to retrieve leave requests from the API. Status code: {response.status_code}")
        leave_requestsData = []
except Exception as e:
    print(f"An error occurred while fetching leave requests from the API: {e}")
    leave_requestsData = []

leave_requests = {(data['date'], data['employeeId']): data['available'] for data in leave_requestsData}

model.Shift = Set(initialize=shifts)
model.Days = Set(initialize=dates)
model.staffRequired = Param(model.Days, initialize=staffRequired, default=0)
model.employee = Set(initialize=employee_ids)
model.Salary = Param(model.Shift, initialize=salary)
model.employeeType = Param(model.employee, model.Shift, initialize=employeeType, default=0)
model.availability = Param(model.Days, model.employee, initialize=availability, default=0)
model.leave_requests = Param(model.Days, model.employee, initialize=leave_requests, default=0)

model.indicator = Var(model.Days, model.employee, within=Binary)

# Define the 'assign' variable with a single set of tuples as indices
model.assign = Var(model.Days * model.employee, within=NonNegativeIntegers)
'''
# Define the objective function
def objective_rule(model):
    return sum(model.Salary[s] * model.assign[d, e] for d in model.Days for e in model.employee for s in model.Shift) + \
           sum(0.5 * model.Salary['partTime'] * (1 - model.assign[d, e]) for d in model.Days for e in model.employee if model.employeeType[e, 'partTime'] == 1)
model.objective = Objective(rule=objective_rule, sense=minimize)
'''

# Modify the objective function to prioritize full-time employees
def objective_rule(model):
    return sum(model.Salary[s] * model.assign[d, e] for d in model.Days for e in model.employee for s in model.Shift) + \
           sum(0.5 * model.Salary['partTime'] * (1 - model.assign[d, e]) for d in model.Days for e in model.employee if model.employeeType[e, 'partTime'] == 1) + \
           sum(0.1 * model.Salary['fullTime'] * model.assign[d, e] for d in model.Days for e in model.employee if model.employeeType[e, 'fullTime'] == 1)

model.objective = Objective(rule=objective_rule, sense=minimize)

# Staff requirement constraint
def staff_requirement_constraint(model, d):
    total_assigned = sum(model.assign[d, e] for e in model.employee)
    min_required = model.staffRequired[d]
    # Return the constraint expression (equality or inequality)
    return total_assigned >= min_required
model.staff_constraints = Constraint(model.Days, rule=staff_requirement_constraint)
'''
# Define availability constraints
def availability_constraint(model, d, e):
    if (d, e) in model.availability:
        return model.assign[d, e] <= model.availability[d, e]
    else:
        return Constraint.Skip  # If the parameter is undefined, skip the constraint

model.availability_constraints = Constraint(model.Days, model.employee, rule=availability_constraint)

def full_time_work_or_leave_constraint(model, e):
    if model.employeeType[e, 'fullTime'] == 1:
        total_assigned = sum(model.assign[d, e] for d in model.Days)
        leave_days = sum(model.leave_requests[d, e] for d in model.Days)
        # Full-time employees should either work or take leave for 5 days a week
        return total_assigned + leave_days == 5
    else:
        # For other employees (part-time), no constraint is applied
        return Constraint.Skip

model.full_time_work_or_leave_constraints = Constraint(model.employee, rule=full_time_work_or_leave_constraint)

def avoid_scheduling_on_leave_days_constraint(model, d, e):
    if (e, d) in model.leave_requests:
        # If there's a leave request for this employee on this date, they should not be scheduled
        return model.assign[d, e] == 0
    else:
        # For other cases, no constraint is applied
        return Constraint.Skip

model.avoid_leave_constraints = Constraint(model.Days, model.employee, rule=avoid_scheduling_on_leave_days_constraint)

# Define binary decision variable for leave
model.leave = Var(model.Days * model.employee, within=Binary)
'''

# Adjust availability constraint to prioritize full-time employees
def availability_constraint(model, d, e):
    if (d, e) in model.availability:
        if model.employeeType[e, 'fullTime'] == 1:
            # Prioritize full-time employees
            return model.assign[d, e] == model.availability[d, e]
        else:
            return model.assign[d, e] <= model.availability[d, e]
    else:
        return Constraint.Skip

model.availability_constraints = Constraint(model.Days, model.employee, rule=availability_constraint)

solver = SolverFactory('glpk', executable=r'C:\Users\email\OneDrive\Desktop\EmpRoster\glpk-5.0\w64\glpsol.exe')

# Solve the model
result = solver.solve(model)

unsuccessfulMsg = ''
# Check if the solver was successful
if result.solver.status == SolverStatus.ok and result.solver.termination_condition == TerminationCondition.optimal:
    # Display the results
    for d in model.Days:
        for e in model.employee:
            print(f"assign[{d}, {e}] = {model.assign[d, e].value}")
else:
    print("Solver did not find an optimal solution.")
    unsuccessfulMsg = "Solver did not find an optimal solution."

staffShortage = ''
staffShortage1 = ''
person = ''
success = ''
noLeave = ''
employees_to_contact = ''

messages = []  # Create a list to store all messages

# Calculate and store the days with staff shortages
shortage = {}
for day, required_staff in staffRequired.items():
    available_staff_for_day = sum(availability.get((day, person), 0) for person in employee_ids)
    if available_staff_for_day < required_staff:
        shortage[day] = required_staff - available_staff_for_day

        # Create and append messages for staff shortages
        shortage_message = f"Not enough staff available on {day}. Shortfall: {shortage[day]}"
        messages.append(shortage_message)

        # Create and append messages for contacting employees
        employees_to_contact = []
        for person in employee_ids:
            if (day, person) not in availability:
                employees_to_contact.append(str(person))  # Convert to string

        if employees_to_contact:
            contact_message = f"On {day}, contact the following employees:\n" + "\n".join(map(str, employees_to_contact))
            messages.append(contact_message)

# Print all the messages together
for message in messages:
    print(message)
'''
noLeave_messages = []

# Calculate the total days full-time employees have either submitted their availability or submitted leave
total_days_with_availability_or_leave = {}
for e in model.employee:
    if model.employeeType[e, 'fullTime'] == 1:
        total_days = sum(model.leave_requests[d, e] + model.availability[d, e] for d in model.Days)
        total_days_with_availability_or_leave[e] = total_days

# Display a message for employees who have not submitted their availability or leave
for e in model.employee:
    if model.employeeType[e, 'fullTime'] == 1:
        if total_days_with_availability_or_leave[e] < 5:
            noLeave_message = f"{e} has not submitted availability or leave for {5 - total_days_with_availability_or_leave[e]} days."
            noLeave_messages.append(noLeave_message)
            print(noLeave_message)

# Print all the messages for employees with no availability or leave together
for message in noLeave_messages:
    print(message)
'''
# Check if the solver was successful
if result.solver.status == SolverStatus.ok and result.solver.termination_condition == TerminationCondition.optimal:
    # Retrieve the optimized shift data from the model
    optimized_shift_data = {}
    for d in model.Days:
        for e in model.employee:
            shift_value = model.assign[d, e].value
            if shift_value > 0:
                # Include only assigned shifts
                shift_key = f"{d},{e}"
                optimized_shift_data[shift_key] = shift_value
                
                 # Include the single timing for the assigned shift (for the specific day)
                if d in shift_timings:
                    start_time, end_time, customerName, customerAddress = shift_timings[d]
                    optimized_shift_data[f"{shift_key}_start_time"] = start_time
                    optimized_shift_data[f"{shift_key}_end_time"] = end_time
                    optimized_shift_data[f"{shift_key}_customerName"] = customerName
                    optimized_shift_data[f"{shift_key}_customerAddress"] = customerAddress
    # Send the optimized_shift_data to the API
    response = requests.post('http://localhost:5000/api/inputShift', json=optimized_shift_data)

    # Check the response
    if response.status_code == 200:
        print('Shift data added successfully.')
        success = 'Shift data added successfully.'
    else:
        print('Error:', response.status_code)
        success = 'Error adding shift data'

#formatted_message = f"{unsuccessfulMsg}\n{staffShortage}\n{staffShortage1}\n{employees_to_contact}\n{noLeave}\n{success}"
formatted_message = "\n".join([
    unsuccessfulMsg,
    *messages,
    "\n",
    success
])

messages_data = {"message": formatted_message}

# Send the messages to your API endpoint
try:
        response = requests.post('http://localhost:5000/api/send-messages', json=messages_data)
        if response.status_code == 200:
            print("Messages sent successfully.")
        else:
            print("Failed to send messages. Status code:", response.status_code)
except Exception as e:
        print("An error occurred while sending messages:", e)

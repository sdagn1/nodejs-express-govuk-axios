import { EmployeeRequest } from "../models/EmployeeRequest"

export const validateEmployeeRequest = function (employeeRequest: EmployeeRequest): void {
    if (employeeRequest.fname.length > 50) {
        throw new Error("First name greater than 50 characters!");
    }
    if (employeeRequest.lname.length > 50) {
        throw new Error("Last name greater than 50 characters!");
    }
    
    if (employeeRequest.salary < 20000) {
        throw new Error("Salary must be at least £20,000");
    }

    if (employeeRequest.bankNo.length != 8) {
        throw new Error("Invalid bank number");
    }

    if (employeeRequest.nin.length != 8) {
        throw new Error("Nin Invalid!");
    }
}
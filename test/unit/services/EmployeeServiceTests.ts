import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getAllEmployees, getSingleEmployee, createEmployee,  URL } from '../../../src/services/EmployeeService';
import { EmployeeResponse } from "../../../src/models/EmployeeResponse";
import { EmployeeRequest } from "../../../src/models/EmployeeRequest";

const employeeResponse: EmployeeResponse = {
    employeeId: 1,
    salary: 30000,
    fname: "Mocha",
    lname: "Chai",
    email: "test@email.com",
    address: "address",
    address2: "address2",
    city: "city",
    county: "county",
    postalCode: "postalCode",
    country: "country",
    phoneNo: "01234567890",
    bankNo: "12345678",
    nin: "nin"
}

const employeeRequest: EmployeeRequest = {
  salary: 30000,
  fname: "Mocha",
  lname: "Chai",
  email: "test@email.com",
  address: "address",
  address2: "address2",
  city: "city",
  county: "county",
  postalCode: "postalCode",
  country: "country",
  phoneNo: "01234567890",
  bankNo: "12345678",
  nin: "ninnnnnn"
}


const mock = new MockAdapter(axios);

describe('EmployeeService', function () {
    describe('getAllEmployees', function () {
      it('should return employees from response', async () => {
        const data = [employeeResponse];

        mock.onGet(URL).reply(200, data);

        const results = await getAllEmployees();

        expect(results[0]).to.deep.equal(employeeResponse);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(URL).reply(500);

        try {
          await getAllEmployees();
        } catch (e) {
          expect(e.message).to.equal('Could not get employees');
          return;
        }
      })
    })
    /*
    Mocking Exercise 1

    Write a unit test for the getSingleEmployee method

    When axios returns with a 500 error

    Expect a "Failed to get employee" error to be returned

    This should fail, make code changes to make this test pass
     */
    describe('getSingleEmployee', function () {
    it('should throw exception when 500 returned from axios', async () => {
      mock.onGet(URL).reply(500);
      try {
        await getSingleEmployee("1");
      } catch (e) {
        expect(e.message).to.equal('Could not get employee');
      }
    })

    /*
    Mocking Exercise 2

    Write a unit test for the getSingleEmployee method

    When axios returns an employee

    Expect the employee to be returned

    This should pass without code changes
     */
    it('should return employee when axios returns employee', async () => {
        mock.onGet(URL+"1").reply(200, employeeResponse);
        const result = await getSingleEmployee("1");

        expect(result).to.deep.equal(employeeResponse);
    })

    /*
    Mocking Exercise 3

    Write a unit test for the getSingleEmployee method

    When axios returns with a 400 error

    Expect a "Employee does not exist" error to be returned

    This should fail, make code changes to make this test pass
     */

    it('should throw DoesNotExist exception when axios returns 400', async () => {
      mock.onGet(URL+"1").reply(400);
      try {
        await getSingleEmployee("1");
      } catch (e) {
        expect(e.message).to.equal("Employee does not exist");
      }
    })

    })

    /*
    Mocking Exercise 4

    Write a unit test for the createEmployee method

    When the axios returns an id

    Expect the id to be returned

    This should pass without code changes
     */

    describe('createEmployee', function () {
      it('should return id when axios returns id', async () => {
        mock.onPost(URL,employeeRequest).reply(200, 1);

        const result = await createEmployee(employeeRequest);

        expect(result).equal(1);
      })

    /*
    Mocking Exercise 5

    Write a unit test for the createEmployee method

    When axios returns with a 400 error

    Expect a "Invalid data" error to be returned

    This should fail, make code changes to make this test pass
     */
    it('should throw Invalid data error when axios returns 400 error', async () => {
      mock.onPost(URL, employeeRequest).reply(400);

      try {
        await createEmployee(employeeRequest);
      } catch (e) {
        expect(e.message).to.equal("Invalid data");
      }

    })

     /*
    Mocking Exercise 6

    Write a unit test for the createEmployee method

    When axios returns with a 500 error

    Expect a "Could not create employee" error to be returned

    This should fail, make code changes to make this test pass
     */

    it('should throw could not create employee error when axios returns with 500', async () => {
      mock.onPost(URL, employeeRequest).reply(500);

      try {
        await createEmployee(employeeRequest);
      } catch (e) {
        expect(e.message).to.equal("Could not create employee");
      }
    })

  })

  })

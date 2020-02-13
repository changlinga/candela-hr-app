import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import * as employeesActions from "../../actions/employeesActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const aStore = {
  user: {
    user: {
      accesstoken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDQwZjA2MmJkMTc4NDMwYjY4YjM2NiIsInRva2VuVHlwZSI6ImF1dGgiLCJpYXQiOjE1ODE1MjQzMDB9.tV138RlYCIbRu-WodqF2lrywXdXVqE5jqZ_BMcslfEs"
    }
  }
};
const EMPLOYEE = {
  staffId: "0005",
  name: "Demo 5",
  startDate: "2020-01-01"
};

describe("Employees Actions", () => {
  it("Creates EMPLOYEES_LIST_SUCCESS when retrieve employees is successful", () => {
    const store = mockStore(aStore);

    return store.dispatch(employeesActions.employeesListAction()).then(() => {
      expect(store.getActions()[0]).toEqual(
        employeesActions.employeesListRequest()
      );
      expect(store.getActions()[1].error).toBe(undefined);
      expect(store.getActions()[1].employees).toBeTruthy();
      store.getActions()[1].employees.forEach(employee => {
        verifyEmployee(employee);
      });
    });
  });

  it("Creates EMPLOYEE_ADD_SUCCESS when add employee is successful", () => {
    const store = mockStore(aStore);

    return store
      .dispatch(employeesActions.employeeAddAction(EMPLOYEE))
      .then(() => {
        expect(store.getActions()[0]).toEqual(
          employeesActions.employeeAddRequest()
        );
        expect(store.getActions()[1].error).toBe(undefined);
        expect(store.getActions()[1].employee).toBeTruthy();
        verifyEmployee(store.getActions()[1].employee);
      });
  });
});

function verifyEmployee(employee) {
  expect(employee.name).toBeTruthy();
  expect(employee.startDate).toBeTruthy();
  expect(employee.staffId).toBeTruthy();
}

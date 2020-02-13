import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import * as employeesActions from "../../actions/employeesActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Employees Actions", () => {
  it("Creates EMPLOYEES_LIST_SUCCESS when retrieve employees is successful", () => {
    const store = mockStore({
      user: {
        user: {
          accesstoken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDQwZjA2MmJkMTc4NDMwYjY4YjM2NiIsInRva2VuVHlwZSI6ImF1dGgiLCJpYXQiOjE1ODE1MjQzMDB9.tV138RlYCIbRu-WodqF2lrywXdXVqE5jqZ_BMcslfEs"
        }
      }
    });

    return store.dispatch(employeesActions.employeesListActions()).then(() => {
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
});

function verifyEmployee(employee) {
  expect(employee.name).toBeTruthy();
  expect(employee.birthDate).toBeTruthy();
  expect(employee.gender).toBeTruthy();
  expect(employee.departmentId).toBeTruthy();
  expect(employee.designation).toBeTruthy();
  expect(employee.startDate).toBeTruthy();
  expect(employee.staffId).toBeTruthy();
}

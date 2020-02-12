import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import * as publicKeyActions from "../../actions/publicKeyActions";
import * as userActions from "../../actions/userActions";
import Secure from "../../utility/Secure";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const STAFF_ID = "0001";
const PASSWORD = "Password1";

describe("User Actions", () => {
  it("Creates LOGIN_SUCCESS when login is successful", () => {
    const store = mockStore();

    return store.dispatch(publicKeyActions.publicKeyGetAction()).then(() => {
      expect(store.getActions()[1].error).toBe(undefined);
      expect(store.getActions()[1].publicKey).toBeTruthy();

      let encryptedStaffId = Secure.encrypt(
        store.getActions()[1].publicKey,
        STAFF_ID
      );
      let encryptedPassword = Secure.encrypt(
        store.getActions()[1].publicKey,
        PASSWORD
      );

      return store
        .dispatch(userActions.loginAction(encryptedStaffId, encryptedPassword))
        .then(() => {
          expect(store.getActions()[2]).toEqual(userActions.loginRequest());
          expect(store.getActions()[3].error).toBe(undefined);
          expect(store.getActions()[3].user).toBeTruthy();
          verifyUser(store.getActions()[3].user);
        });
    });
  });
});

function verifyUser(user) {
  expect(user.staffId).toBeTruthy();
  expect(user.accesstoken).toBeTruthy();
}

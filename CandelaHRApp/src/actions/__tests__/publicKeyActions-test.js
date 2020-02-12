import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import * as publicKeyActions from "../../actions/publicKeyActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Public Key Actions", () => {
  it("Creates PUBLIC_KEY_GET_SUCCESS when retrieve public key is successful", () => {
    const store = mockStore();

    return store.dispatch(publicKeyActions.publicKeyGetAction()).then(() => {
      expect(store.getActions()[0]).toEqual(
        publicKeyActions.publicKeyGetRequest()
      );
      expect(store.getActions()[1].error).toBe(undefined);
      expect(store.getActions()[1].publicKey).toBeTruthy();
    });
  });
});

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from "../components/Login";
import { loginAction } from "../actions/userActions";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    publicKey: state.publicKey
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loginAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

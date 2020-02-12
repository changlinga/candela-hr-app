import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Launch from "../components/Launch";
import { publicKeyGetAction } from "../actions/publicKeyActions";
import { authenticateAction } from "../actions/userActions";

const mapStateToProps = (state, ownProps) => {
  return {
    publicKey: state.publicKey
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      publicKeyGetAction,
      authenticateAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Launch);

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "../components/Home";
import { employeesListAction } from "../actions/employeesActions";

const mapStateToProps = (state, ownProps) => {
  return {
    employees: state.employees
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      employeesListAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

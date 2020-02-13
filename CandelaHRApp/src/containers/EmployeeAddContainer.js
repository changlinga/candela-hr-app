import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EmployeeAdd from "../components/EmployeeAdd";
import { employeeAddAction } from "../actions/employeesActions";

const mapStateToProps = (state, ownProps) => {
  return {
    employees: state.employees
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      employeeAddAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAdd);

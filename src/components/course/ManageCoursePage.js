import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if(this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }
  
  //change handler
  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event){
    event.preventDefault();
    this.setState({saving:true});
    this.props.actions.saveCourse(this.state.course).then(() => this.redirect()).catch(error => {
      toastr.error(error);
      this.setState({saving:false});  
    }) ;
  }

  redirect() {
    this.setState({saving:false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm course={this.state.course}
        onSave={this.saveCourse}
        onChange={this.updateCourseState}
        errors={this.state.errors}
        allAuthors={this.props.authors}
        saving={this.state.saving} />
      
    );
  }
}


ManageCoursePage.propTypes = {
  course: React.PropTypes.object.isRequired,
  authors: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: function() { return React.PropTypes.func.isRequired; }
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course) return course[0];
  return null;
}
//return state/redux store that you want to expose to components, trigger component once store is updated
//Reselect library for memorize
//can also do data manipulation here for data from api
//ownProps get props from router/url
function mapStateToProps (state, ownProps) {
  const courseId = ownProps.params.id; // from the path `/course/:id`
  let course={id: '', watchHref:'', title:'', authorId:'', length:'', category:''};
  if(courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }
  const authorsFormattedForDropDown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropDown
  };
}
//return actions that you want to expose to component/props

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
import Course from "./course";

const CourseList = ({ courses }) => {
  return (
    <>
      <section className="row">
        {courses.map((course) => (
          <section className="col-3" key={course.id}>
            <Course {...course} />
          </section>
        ))}
      </section>
    </>
  );
};

export default CourseList;

import { httpInterceptedService } from "@core/http-service";
import CourseList from "./../features/courses/components/course-list";
import { Await, useLoaderData, defer } from "react-router-dom";
import { Suspense } from "react";

const Courses = () => {
  const data = useLoaderData();
  console.log(data, "data");
  return (
    <section className="row">
      <section className="col-12">
        <section className="d-flex aligh-items-center justify-content-between mb-5">
          <a className="btn btn-primary fw-bolder mt-n1">افزودن دوره جدید</a>
        </section>
        <Suspense
          fallback={<p className="text-info">در حال دریافت اطلاعات ...</p>}
        >
          <Await resolve={data.courses}>
            {(loadedCourses) => <CourseList courses={loadedCourses} />}
          </Await>
        </Suspense>
      </section>
    </section>
  );
};

const loadCourses = async () => {
  const response = await httpInterceptedService.get("/Course/list");
  return response.data;
};

export async function coursesLoader() {
  return defer({
    courses: loadCourses(),
  });
}

export default Courses;

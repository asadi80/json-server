export const Api = (() => {
    const baseUrl = "http://localhost:4232";
    const courseList = "courseList";
  
    const getCourses = () =>
      fetch([baseUrl, courseList].join("/")).then((response) => response.json());
  
    const deletedCourse = (id) =>
      fetch([baseUrl, courseList,id].join("/"), {
        method: "DELETE",
      });
  
    return {
      getCourses,
      deletedCourse,
    };
  })();
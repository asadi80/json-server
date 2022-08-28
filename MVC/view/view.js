export const View = (() => {
    const domstr = {
      allcourses: "#all-courses",
      select: "#btn",
      course: ".course",
      totalcredit: "#total-credit",
      selectedCourses: "#selected-courses",
    };
  
    const background = (ele, selected) => {
      ele.style.backgroundColor = selected ? "blue" : originalColor;
    };
    const render = (ele, templet) => {
      ele.innerHTML = templet;
    };
  
  
    const createTmp = (arr) => {
      let templet = '';
  // for all avalible courses
      arr.forEach((course) => {
        let courseType = course.required ? "Compulsory" : "Elective";
        templet += `
          <li>
            <button class="course" id="${course.courseId}">
                ${course.courseName}
                Course Type: ${courseType}
                Course Credit: ${course.credit}
            </button>
          </li>
        `;
      });
      return templet;
    };
// for all selected courses
    const createTmpSelected = (arr) => {
      let templet = '';
  
      arr.forEach((course) => {
        let courseType = course.required ? "Compulsory" : "Elective";
        templet += `
          <li>
            <p class="courses" id="${course.courseId}">
                ${course.courseName}
                Course Type: ${courseType}
                Course Credit: ${course.courseCredit}
            </p>
          </li>
        `;
      });
      return templet;
    };
  
    return {
      render,
      domstr,
      createTmp,
      background,
      createTmpSelected
    };
  })();
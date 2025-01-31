export const View = (() => {
    const domstr = {
      allcourses: "#all-courses",
      select: "#btn",
      course: ".course",
      totalcredit: "#total-credit",
      selectedCourses: "#selected-courses",
    };
  
    const background = (element, Selected, isOdd) => {
      const originalColor = isOdd ? "white" : "rgb(77, 201, 223)";
      element.style.backgroundColor = Selected ? "blue" : originalColor;
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
            <p value="${course.credit}" class="course" id="${course.courseId}">
            ${course.courseId}-
                ${course.courseName}
                Course Type: ${courseType}
                Course Credit: ${course.credit}
            </p>
          </li>
        `;
      });
      return templet;
    };
// for all selected courses
    const createTmpSelected = (arr) => {
      let templet = '';
  
      arr.forEach((course) => {
        
        templet += `
          <li>
            <p class="courses" id="${course.courseId}">
            ${course}
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
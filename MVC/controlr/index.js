import { View } from "../view/view.js";
import { Model } from "../model/model.js";

//---------------------------------------------------------------------------------------
const Controller = ((model, view) => {
  const state = new model.State();
 
  let list = [];
  let credits = 0;

  // geting all courses
  const init = () => {
    model.getCourses().then((courses) => {
      state.allcourses = courses;
      console.log(courses);
    });
  };
  // selecting courses
  const selectingCourse = () => {
    const allcourses = document.querySelector(view.domstr.allcourses);

    allcourses.addEventListener("click", (event) => {
      if (event.target.className === "course") {
        // console.log(event.target.innerHTML);

        if (list.includes(event.target.innerText) && state.selectedId.includes(+event.target.id)) {
          const id = event.target.id;
          const selected = false;
          const ele = document.getElementById(id);
          state.setElementBackground(ele, selected, +id%2);
          list = list.filter((id) => id !== event.target.innerText);
          state.selectedId = state.selectedId.filter((id) => id !== +event.target.id);
        } else {
          list.push(event.target.innerText);
          state.selectedId.push( +event.target.id)
          const id = event.target.id;
          const selected = true;
          const ele = document.getElementById(id);
          state.setElementBackground(ele, selected);
        }
      }

      console.log(state.selectedId);
      console.log(list);

      let newlist = list.map((ele) => +ele.split(":").splice(2, 2));
      credits = newlist.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });

      // console.log(newlist);
      console.log(credits);
      
      if (credits > 18) {
        alert("You can not exced 18 credits in one semester");
      }else{
        state.setTotalcredit(credits);
      }
      
    });
    
  };


  const addToSelected = () => {
    const selectButton = document.querySelector(view.domstr.select);
    
    selectButton.addEventListener("click", () => {
      let text =
        `You have chosen ${credits} credits for this semester. You cannot change once you submit. Do you want to confirm?`;
        if (confirm(text) == true) {
        state.setSelectedCourses(list);
        $(".course").click(false);
        $(".btn").prop("disabled", true);
        }
        deleteCourse();

    })
  };

  //set default credit to zero
  const defaultCredit = () => {
    state.setTotalcredit(0);
  };

  const deleteCourse = () => {

state.allcourses= state.allcourses.filter(item => !state.selectedId.includes(item.courseId));
};
  const start = () => {
    init();
    selectingCourse();
    addToSelected();
    defaultCredit();
   
  };

  return {
    start,
  };
})(Model, View);

Controller.start();

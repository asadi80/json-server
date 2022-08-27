import { View } from "../view/view.js";
import { Model } from "../model/model.js";


  
  
  //---------------------------------------------------------------------------------------
const Controller = ((model, view) => {
    const state = new model.State();

// geting all courses
const init = () => {
  model.getCourses().then((courses) => {
    state.allcourses = courses;
  });
};
// selecting courses
const selectingCourse = () => {
  const allcourses = document.querySelector(
    view.domstr.allcourses
      );
      allcourses.addEventListener("click", (event) => {
        if (event.target.className === "course") {
          // ------- INITIALIZE HELPER AND DATA --------
          const sum = state.allcourses.reduce((x, y) => {
            x[y.courseId] = y;
            return x;
          }, {});
          const chosenId = parseInt(event.target.id);
          const { courseId, courseName, required, credit } = sum[chosenId];
          
          // ------- CALCULATE THE COURSE CREDIT --------
          const credits = state.emptCourses.reduce((x, y) => {
            x += sum[y.courseId].credit;
            return x;
          }, 0);
          
          if (credits + credit > 18) {
            alert("You can not exced 18 credits in one semester");
            return;
          }
          
          // ------- GET THE COURSE --------
          const course = new model.Course(courseId, courseName, required, credit);
          
          // ------- PUT THE COURSE IN THE STATE & STYLE BACKGROUND --------
          const isCourseIncluded =
            state.emptCourses.filter((course) => course.id === chosenId).length >
            0;
            
            const element = document.getElementById(chosenId);
            state.setElementBackground(element, !isCourseIncluded, chosenId % 2);
  
            if (isCourseIncluded) {
              const newCourses = state.emptCourses.filter(
                (course) => course.id !== chosenId
                
                );
                
                state.setemptCourses([...newCourses]);
                
              } else {
                state.setemptCourses([course, ...state.emptCourses]);
              }
              
              state.setTotalcredit(credits + credit);
            }
          });
        };
        
        
        const addToSelected = () => {
          const selectButton = document.querySelector(view.domstr.select);
          
          selectButton.addEventListener("click", () => {
            const sum = state.allcourses.reduce((x, y) => {
              x[y.courseId] = y;
          return x;
        }, {});
        const credits = state.emptCourses.reduce((x, y) => {
          x += sum[y.courseId].credit;
          return x;
        }, 0);
  
        let text =
        `You have chosen ${credits} credits for this semester. You cannot change once you submit. Do you want to confirm?`;
        if (confirm(text) == true) {
          const newSelectesCourses = state.emptCourses;
          // console.log(newSelectesCourses)
        
          state.setSelectedCourses(newSelectesCourses);
          deleteCourse(newSelectesCourses)
          selectButton.disabled = true;
          // used jqury to disable all generated button in avalible courses so you can not add more cridet
          $(".course").prop("disabled", true);
        } 
      });
    };
    //set default credit to zero
    const defaultCredit = () => {
      state.setTotalcredit(0);
    };
    
    const deleteCourse = (newlist) => {
      let arr = []
      
      newlist.map((ele) => arr.push(ele.courseId))
      console.log(arr);
      setTimeout(()=>{
        arr.forEach(element => {
          model.deleteCourse(element)
        });
         
        },0)
      
    
     
    };
    const start = () => {
      init();
      selectingCourse();
      addToSelected();
      defaultCredit();
      
      
    };
  
    return {
      start 
    };
  })(Model, View);
  
  Controller.start();

  
  
  
  
